"""
Main entry point for Doc2Skills converter
Provides CLI interface for both conversion approaches
"""
import argparse
import sys
from backend import (
    ConverterConfig,
    convert_full_documentation,
    convert_single_page
)


def main():
    """Main CLI entry point"""
    parser = argparse.ArgumentParser(
        description='Doc2Skills - Convert HTML documentation to markdown skill files',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Convert entire documentation site
  python main.py --full https://www.i18next.com/
  
  # Convert single page
  python main.py --page https://www.i18next.com/overview/getting-started
  
  # Convert with custom output directory
  python main.py --full https://docs.example.com/ --output my_docs
  
  # Convert single page with custom title
  python main.py --page https://example.com/guide --title "Getting Started Guide"
  
  # Non-headless mode (show browser)
  python main.py --full https://example.com/ --no-headless
        """
    )
    
    # Conversion mode (mutually exclusive)
    mode_group = parser.add_mutually_exclusive_group(required=True)
    mode_group.add_argument(
        '--full',
        metavar='URL',
        help='Convert entire documentation site from base URL'
    )
    mode_group.add_argument(
        '--page',
        metavar='URL',
        help='Convert a single documentation page'
    )
    
    # Optional arguments
    parser.add_argument(
        '--output', '-o',
        metavar='DIR',
        help='Custom output directory name (default: extracted from URL)'
    )
    parser.add_argument(
        '--title', '-t',
        metavar='TITLE',
        help='Custom title for single page conversion (default: extracted from page)'
    )
    parser.add_argument(
        '--no-headless',
        action='store_true',
        help='Run browser in visible mode (default: headless)'
    )
    parser.add_argument(
        '--max-levels',
        type=int,
        default=4,
        metavar='N',
        help='Maximum navigation expansion levels (default: 4)'
    )
    parser.add_argument(
        '--wait-time',
        type=float,
        default=2.0,
        metavar='SECONDS',
        help='Wait time between expansions (default: 2.0)'
    )
    
    args = parser.parse_args()
    
    # Create configuration
    config = ConverterConfig(
        headless=not args.no_headless,
        max_expansion_levels=args.max_levels,
        expansion_wait_time=args.wait_time
    )
    
    # Execute conversion based on mode
    try:
        if args.full:
            print("=" * 60)
            print("FULL DOCUMENTATION CONVERSION MODE")
            print("=" * 60)
            result = convert_full_documentation(
                doc_url=args.full,
                config=config,
                output_dir=args.output
            )
            
            if result['success']:
                print("\n" + "=" * 60)
                print("CONVERSION SUMMARY")
                print("=" * 60)
                print(f"Total pages found: {result['total_pages']}")
                print(f"Successfully converted: {result['successful']}")
                print(f"Failed: {result['failed']}")
                print(f"Output directory: {result['output_directory']}")
                return 0
            else:
                print(f"\n[ERROR] Conversion failed: {result.get('error', 'Unknown error')}")
                return 1
                
        elif args.page:
            print("=" * 60)
            print("SINGLE PAGE CONVERSION MODE")
            print("=" * 60)
            result = convert_single_page(
                page_url=args.page,
                config=config,
                output_dir=args.output,
                title=args.title
            )
            
            if result['success']:
                print("\n" + "=" * 60)
                print("CONVERSION SUMMARY")
                print("=" * 60)
                print(f"Page title: {result['title']}")
                print(f"Output file: {result['output_file']}")
                print(f"Output directory: {result['output_directory']}")
                return 0
            else:
                print(f"\n[ERROR] Conversion failed: {result.get('error', 'Unknown error')}")
                return 1
    
    except KeyboardInterrupt:
        print("\n\n[!] Conversion interrupted by user")
        return 130
    except Exception as e:
        print(f"\n[ERROR] Unexpected error: {str(e)}")
        return 1


if __name__ == '__main__':
    sys.exit(main())

# Made with Bob
