"""
Test script to verify the new skill format
"""
from backend import convert_single_page, ConverterConfig

# Test with a single page
config = ConverterConfig(headless=True)

print("Testing single page conversion with new format...")
print("=" * 60)

result = convert_single_page(
    page_url="https://react.dev/learn/adding-interactivity",
    config=config,
    title="Adding Interactivity"
)

if result['success']:
    print("\n✓ Conversion successful!")
    print(f"✓ Output file: {result['output_file']}")
    print("\nReading generated file to verify format...")
    print("=" * 60)
    
    with open(result['output_file'], 'r', encoding='utf-8') as f:
        # Read first 30 lines to see the metadata
        lines = [f.readline() for _ in range(30)]
        print(''.join(lines))
else:
    print(f"\n✗ Conversion failed: {result.get('error')}")

# Made with Bob
