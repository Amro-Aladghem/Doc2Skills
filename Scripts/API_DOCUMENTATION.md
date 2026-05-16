# Doc2Skills API Documentation

## Overview

FastAPI server that converts HTML documentation to Bob AI compatible skill files via REST API.

## Running the API

### Installation

```bash
cd Scripts
pip install -r requirements.txt
```

### Start Server

```bash
python api.py
```

Server will start on: `http://localhost:8000`

API Documentation (Swagger UI): `http://localhost:8000/docs`

## API Endpoints

### 1. Root Endpoint

**GET** `/`

Returns API information and available endpoints.

**Response:**

```json
{
  "name": "Doc2Skills API",
  "version": "1.0.0",
  "description": "Convert HTML documentation to Bob AI compatible skill files",
  "endpoints": {
    "POST /api/analyze": "Analyze documentation URL and convert to skill files",
    "GET /health": "Health check endpoint"
  }
}
```

### 2. Health Check

**GET** `/health`

Check if the API is running.

**Response:**

```json
{
  "status": "healthy"
}
```

### 3. Convert Documentation

**POST** `/convert`

Convert documentation URL to skill files and return them as JSON.

**Request Body:**

```json
{
  "url": "https://react.dev/learn/adding-interactivity"
}
```

**Response:**

```json
{
  "files": [
    {
      "fileName": "Adding_Interactivity.md",
      "content": "---\nname: Adding Interactivity\ndescription: Some things on the screen...\nlibrary: React\nsource: https://react.dev/learn/adding-interactivity\n---\n\n# Adding Interactivity\n\n[Full content...]"
    }
  ],
  "total": 1,
  "library": "React",
  "source": "https://react.dev/learn/adding-interactivity"
}
```

## Conversion Strategy

The API automatically determines the best conversion strategy based on the URL:

### Single Page Conversion

Used for:

- **GitHub URLs**: `https://github.com/org/repo`
- **Domain only**: `https://domain.com/` or `https://domain.com`
- **Specific pages**: `https://domain.com/docs/getting-started`

### Full Documentation Conversion

Used for:

- **Documentation roots**: `https://domain.com/docs`
- **Learning sections**: `https://domain.com/learn`
- **API references**: `https://domain.com/api`
- **Guide sections**: `https://domain.com/guide`

### Examples

| URL                                         | Strategy | Reason           |
| ------------------------------------------- | -------- | ---------------- |
| `https://github.com/facebook/react`         | Single   | GitHub URL       |
| `https://react.dev/`                        | Single   | Domain only      |
| `https://react.dev/learn`                   | **Full** | Doc root keyword |
| `https://react.dev/learn/thinking-in-react` | Single   | Specific page    |
| `https://www.i18next.com/docs`              | **Full** | Doc root keyword |
| `https://www.i18next.com/docs/api`          | Single   | Specific page    |

### Performance

**Batch Processing**: Full conversions process pages in batches of 10 for optimal performance.

## Request Examples

### Using cURL

**Single Page (GitHub):**

```bash
curl -X POST "http://localhost:8000/convert" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com/facebook/react"}'
```

**Full Documentation:**

```bash
curl -X POST "http://localhost:8000/convert" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://react.dev/learn/"}'
```

### Using Python

```python
import requests

# Analyze and convert documentation
response = requests.post(
    "http://localhost:8000/api/analyze",
    json={"url": "https://www.i18next.com/"}
)

data = response.json()
print(f"Generated {data['total']} files for {data['library']}")

for file in data['files']:
    print(f"- {file['fileName']}")
    # Save file locally if needed
    with open(file['fileName'], 'w', encoding='utf-8') as f:
        f.write(file['content'])
```

### Using JavaScript/Fetch

```javascript
fetch("http://localhost:8000/convert", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    url: "https://react.dev/learn/adding-interactivity",
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(`Generated ${data.total} files for ${data.library}`);

    data.files.forEach((file) => {
      console.log(`- ${file.fileName}`);
      // Process file content
    });
  })
  .catch((error) => console.error("Error:", error));
```

## Response Format

### Success Response

```json
{
  "files": [
    {
      "fileName": "Page_Title.md",
      "content": "---\nname: Page Title\n...\n---\n\n# Content"
    }
  ],
  "total": 1,
  "library": "LibraryName",
  "source": "https://example.com/docs/page"
}
```

**Fields:**

- `files`: Array of skill files with fileName and content
- `total`: Total number of files generated
- `library`: Extracted library/package name
- `source`: Original documentation URL

### Error Response

```json
{
  "detail": "Error message describing what went wrong"
}
```

**HTTP Status Codes:**

- `200`: Success
- `422`: Validation error (invalid URL format)
- `500`: Server error (conversion failed)

## File Format

Each file in the response follows Bob AI's SKILL.md format:

```markdown
---
name: Page Title
description: Auto-extracted or generated description
library: LibraryName
source: https://example.com/docs/page
---

# Page Title

[Documentation content as instructions...]
```

## Features

### Automatic Strategy Selection

- **GitHub URLs**: Single page conversion (faster)
- **Documentation Sites**: Full site conversion (comprehensive)

### Temporary Storage

- Files are generated in temporary directory
- Returned in API response
- Automatically cleaned up after response

### CORS Enabled

- API accepts requests from any origin
- Suitable for web applications

### Error Handling

- Validates URL format
- Handles conversion failures gracefully
- Provides detailed error messages

## Configuration

The API uses default converter configuration:

- Headless browser mode
- 4 levels of navigation expansion
- 2-second wait between expansions
- Temporary output directory

## Limitations

1. **Processing Time**: Full documentation conversion may take several minutes
2. **Memory Usage**: Large documentation sites require more memory
3. **Rate Limiting**: No built-in rate limiting (add if needed)
4. **File Size**: Response size depends on documentation size

## Production Deployment

### Using Uvicorn Directly

```bash
uvicorn api:app --host 0.0.0.0 --port 8000 --workers 4
```

### Using Docker

Create `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install Chrome for Selenium
RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:

```bash
docker build -t doc2skills-api .
docker run -p 8000:8000 doc2skills-api
```

### Environment Variables

```bash
# Optional: Configure host and port
export API_HOST=0.0.0.0
export API_PORT=8000

python api.py
```

## Testing

### Interactive API Documentation

Visit `http://localhost:8000/docs` for Swagger UI where you can:

- View all endpoints
- Test API calls interactively
- See request/response schemas
- Download OpenAPI specification

### Alternative Documentation

Visit `http://localhost:8000/redoc` for ReDoc documentation.

## Troubleshooting

### Chrome Driver Issues

If you get Chrome driver errors:

```bash
# The API will auto-download the correct driver
# Ensure Chrome/Chromium is installed on your system
```

### Port Already in Use

```bash
# Change port in api.py or use environment variable
uvicorn api:app --port 8001
```

### Memory Issues

For large documentation sites:

```bash
# Increase available memory or process in smaller batches
# Consider implementing pagination for large conversions
```

## Security Considerations

1. **Input Validation**: URLs are validated using Pydantic
2. **Temporary Files**: Cleaned up after each request
3. **CORS**: Currently allows all origins (restrict in production)
4. **Rate Limiting**: Consider adding for production use
5. **Authentication**: Add if needed for private deployments

## Future Enhancements

- [ ] Add rate limiting
- [ ] Implement authentication
- [ ] Add webhook support for long-running conversions
- [ ] Support batch URL processing
- [ ] Add caching for frequently converted URLs
- [ ] Implement progress tracking for large conversions
