"""
FastAPI server for Doc2Skills converter
Provides REST API endpoint for converting documentation to skills
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from typing import List, Optional
import os
import tempfile
import shutil
from urllib.parse import urlparse

from backend import DocumentationConverter, ConverterConfig


app = FastAPI(
    title="Doc2Skills API",
    description="Convert HTML documentation to Bob AI compatible skill files",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    """Request model for documentation analysis"""
    url: HttpUrl
    
    class Config:
        json_schema_extra = {
            "example": {
                "url": "https://www.i18next.com/"
            }
        }


class SkillFile(BaseModel):
    """Response model for a single skill file"""
    fileName: str
    content: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "fileName": "Getting_Started.md",
                "content": "---\nname: Getting Started\ndescription: i18next is an internationalization-framework...\nlibrary: I18next\nsource: https://www.i18next.com/overview/getting-started\n---\n\n# Getting Started\n\n[Full documentation content...]"
            }
        }


class AnalyzeResponse(BaseModel):
    """Response model for documentation analysis"""
    files: List[SkillFile]
    total: int
    library: str
    source: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "files": [
                    {
                        "fileName": "Getting_Started.md",
                        "content": "---\nname: Getting Started\ndescription: i18next is an internationalization-framework...\nlibrary: I18next\nsource: https://www.i18next.com/overview/getting-started\n---\n\n# Getting Started\n\n[Full content...]"
                    },
                    {
                        "fileName": "Translation_Function.md",
                        "content": "---\nname: Translation Function\ndescription: The t function is the main function...\nlibrary: I18next\nsource: https://www.i18next.com/overview/api\n---\n\n# Translation Function\n\n[Full content...]"
                    }
                ],
                "total": 2,
                "library": "I18next",
                "source": "https://www.i18next.com/"
            }
        }


def is_github_url(url: str) -> bool:
    """Check if URL is from GitHub"""
    parsed = urlparse(url)
    return 'github.com' in parsed.netloc.lower()


def should_use_full_conversion(url: str) -> bool:
    """
    Determine if URL should use full documentation conversion
    
    Logic:
    - GitHub URLs: Always single page
    - Domain only (e.g., https://domain.com/): Single page
    - Ends with doc keywords (e.g., /docs, /learn, /api, /guide): Full conversion
    - Has path after doc keyword (e.g., /docs/something): Single page
    
    Examples:
        https://domain.com/ -> False (single)
        https://domain.com/docs -> True (full)
        https://domain.com/learn -> True (full)
        https://domain.com/docs/getting-started -> False (single)
        https://github.com/org/repo -> False (single)
    """
    # GitHub URLs always use single page
    if is_github_url(url):
        return False
    
    parsed = urlparse(url)
    path = parsed.path.rstrip('/')
    
    # Domain only (no path or just /)
    if not path or path == '/':
        return False
    
    # Documentation keywords that indicate full conversion
    doc_keywords = ['docs', 'doc', 'learn', 'api', 'guide', 'documentation', 'reference', 'tutorial']
    
    # Split path into segments
    path_segments = [seg for seg in path.split('/') if seg]
    
    # If path has only one segment and it's a doc keyword -> Full conversion
    if len(path_segments) == 1 and path_segments[0].lower() in doc_keywords:
        return True
    
    # If path has multiple segments -> Single page
    return False


def read_generated_files(output_dir: str) -> List[SkillFile]:
    """
    Read all generated markdown files from output directory
    
    Args:
        output_dir: Directory containing generated files
        
    Returns:
        List of SkillFile objects with fileName and content
    """
    files = []
    
    # Walk through the output directory
    for root, dirs, filenames in os.walk(output_dir):
        for filename in filenames:
            if filename.endswith('.md'):
                filepath = os.path.join(root, filename)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    files.append(SkillFile(
                        fileName=filename,
                        content=content
                    ))
                except Exception as e:
                    print(f"Error reading {filepath}: {str(e)}")
    
    return files


@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "name": "Doc2Skills API",
        "version": "1.0.0",
        "description": "Convert HTML documentation to Bob AI compatible skill files",
        "endpoints": {
            "POST /api/analyze": "Analyze documentation URL and convert to skill files",
            "GET /health": "Health check endpoint"
        }
    }


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy"}


@app.post("/api/analyze", response_model=AnalyzeResponse)
async def analyze_documentation(request: AnalyzeRequest):
    """
    Analyze documentation URL and convert to skill files
    
    Strategy Selection:
    - GitHub URLs: Single page conversion
    - Domain only (e.g., https://domain.com/): Single page
    - Doc root (e.g., /docs, /learn): Full documentation conversion
    - Specific page (e.g., /docs/page): Single page conversion
    
    Returns list of generated skill files with their content
    """
    url = str(request.url)
    
    # Create temporary directory for output
    temp_dir = tempfile.mkdtemp()
    
    try:
        # Configure converter to use temp directory
        config = ConverterConfig(
            headless=True,
            output_base_dir=temp_dir
        )
        
        converter = DocumentationConverter(config)
        
        # Determine conversion strategy based on URL
        use_full = should_use_full_conversion(url)
        
        if use_full:
            print(f"[API] Documentation root detected, using full conversion: {url}")
            result = converter.convert_full_documentation(
                doc_url=url,
                output_dir=None  # Will use domain extraction
            )
            
            if not result['success']:
                raise HTTPException(
                    status_code=500,
                    detail=f"Conversion failed: {result.get('error', 'Unknown error')}"
                )
        else:
            print(f"[API] Specific page detected, using single page conversion: {url}")
            result = converter.convert_single_page(
                page_url=url,
                output_dir=None  # Will use domain extraction
            )
            
            if not result['success']:
                raise HTTPException(
                    status_code=500,
                    detail=f"Conversion failed: {result.get('error', 'Unknown error')}"
                )
        
        # Read all generated files
        files = read_generated_files(temp_dir)
        
        if not files:
            raise HTTPException(
                status_code=500,
                detail="No files were generated during conversion"
            )
        
        # Extract library name from URL
        from backend.utils import FileManager
        file_manager = FileManager(config)
        library_name = file_manager.extract_library_name(url)
        
        return AnalyzeResponse(
            files=files,
            total=len(files),
            library=library_name,
            source=url
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error: {str(e)}"
        )
    finally:
        # Cleanup temporary directory
        try:
            shutil.rmtree(temp_dir)
        except Exception as e:
            print(f"[API] Warning: Failed to cleanup temp directory: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    
    print("=" * 60)
    print("Doc2Skills API Server")
    print("=" * 60)
    print("Starting server on http://localhost:8000")
    print("API Documentation: http://localhost:8000/docs")
    print("=" * 60)
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_level="info"
    )

# Made with Bob
