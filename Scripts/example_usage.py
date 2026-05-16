"""
Example usage of the Doc2Skills backend
Demonstrates both full documentation and single page conversion
"""
from backend import (
    ConverterConfig,
    DocumentationConverter,
    convert_full_documentation,
    convert_single_page
)


def example_full_documentation():
    """Example: Convert entire documentation site"""
    print("\n" + "="*60)
    print("EXAMPLE 1: Full Documentation Conversion")
    print("="*60 + "\n")
    
    # Using the convenience function
    result = convert_full_documentation(
        doc_url="https://www.i18next.com/",
        output_dir="i18next_docs"
    )
    
    if result['success']:
        print(f"\n✓ Successfully converted {result['successful']} pages")
        print(f"✓ Output: {result['output_directory']}")
    else:
        print(f"\n✗ Conversion failed: {result.get('error')}")


def example_single_page():
    """Example: Convert a single page"""
    print("\n" + "="*60)
    print("EXAMPLE 2: Single Page Conversion")
    print("="*60 + "\n")
    
    # Using the convenience function
    result = convert_single_page(
        page_url="https://www.i18next.com/overview/getting-started",
        title="Getting Started with i18next"
    )
    
    if result['success']:
        print(f"\n✓ Page converted: {result['title']}")
        print(f"✓ Output: {result['output_file']}")
    else:
        print(f"\n✗ Conversion failed: {result.get('error')}")


def example_with_custom_config():
    """Example: Using custom configuration"""
    print("\n" + "="*60)
    print("EXAMPLE 3: Custom Configuration")
    print("="*60 + "\n")
    
    # Create custom configuration
    config = ConverterConfig(
        headless=False,  # Show browser
        max_expansion_levels=6,  # More expansion levels
        expansion_wait_time=3.0,  # Longer wait time
        output_base_dir="CustomSkills"
    )
    
    # Use with converter instance
    converter = DocumentationConverter(config)
    
    result = converter.convert_single_page(
        page_url="https://www.i18next.com/overview/api",
        custom_title="i18next API Reference"
    )
    
    if result['success']:
        print(f"\n✓ Page converted with custom config")
        print(f"✓ Output: {result['output_file']}")


def example_batch_single_pages():
    """Example: Convert multiple specific pages"""
    print("\n" + "="*60)
    print("EXAMPLE 4: Batch Single Page Conversion")
    print("="*60 + "\n")
    
    pages = [
        {
            'url': 'https://www.i18next.com/overview/getting-started',
            'title': 'Getting Started'
        },
        {
            'url': 'https://www.i18next.com/overview/api',
            'title': 'API Reference'
        },
        {
            'url': 'https://www.i18next.com/overview/plugins-and-utils',
            'title': 'Plugins and Utils'
        }
    ]
    
    converter = DocumentationConverter()
    successful = 0
    
    for page in pages:
        result = converter.convert_single_page(
            page_url=page['url'],
            custom_title=page['title'],
            output_dir="i18next_selected"
        )
        
        if result['success']:
            successful += 1
            print(f"✓ {page['title']}")
        else:
            print(f"✗ {page['title']}: {result.get('error')}")
    
    print(f"\n✓ Successfully converted {successful}/{len(pages)} pages")


if __name__ == '__main__':
    # Run examples
    # Uncomment the example you want to run
    
    # example_full_documentation()
    # example_single_page()
    # example_with_custom_config()
    # example_batch_single_pages()
    
    print("\nUncomment an example function to run it!")

# Made with Bob
