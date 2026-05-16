# Doc2Skills Backend

A scalable Python backend for converting HTML documentation to **Bob AI compatible skill files**. Automatically generates SKILL.md format files with proper YAML frontmatter for seamless integration with Bob AI. Supports both full documentation site conversion and single page conversion.

## 🏗️ Architecture

```
Scripts/
├── backend/                    # Core backend package
│   ├── __init__.py            # Package exports
│   ├── config.py              # Configuration management
│   ├── converter.py           # Main converter with both approaches
│   └── utils/                 # Shared utilities
│       ├── __init__.py
│       ├── browser.py         # Browser automation (Selenium)
│       ├── content_processor.py  # HTML parsing & markdown conversion
│       └── file_manager.py    # File operations
├── main.py                    # CLI entry point
├── requirements.txt           # Python dependencies
└── README.md                  # This file
```

## 🎯 Features

### Two Conversion Approaches

1. **Full Documentation Conversion** (`--full`)
   - Converts entire documentation sites
   - Auto-discovers all pages through navigation expansion
   - Heuristic detection of expandable menus
   - Batch processing with progress tracking

2. **Single Page Conversion** (`--page`)
   - Converts individual documentation pages
   - User-specified URL input
   - Optional custom title
   - Quick and focused conversion

### Shared Components

Both approaches utilize the same core utilities:

- **Browser Management**: Selenium-based web scraping with auto-expansion
- **Content Processing**: HTML cleanup and markdown conversion
- **File Management**: Organized output structure

## 📦 Installation

1. **Install Python dependencies:**

```bash
cd Scripts
pip install -r requirements.txt
```

2. **Chrome/Chromium required:**
   - The script uses Chrome WebDriver (auto-installed via webdriver-manager)
   - Ensure Chrome or Chromium is installed on your system

## 🚀 Usage

### CLI Usage

#### Full Documentation Conversion

Convert an entire documentation site:

```bash
python main.py --full https://www.i18next.com/
```

With custom output directory:

```bash
python main.py --full https://docs.example.com/ --output my_docs
```

### Single Page Conversion

Convert a specific page:

```bash
python main.py --page https://www.i18next.com/overview/getting-started
```

With custom title and output:

```bash
python main.py --page https://example.com/guide --title "Getting Started" --output guides
```

### Advanced Options

```bash
# Show browser (non-headless mode)
python main.py --full https://example.com/ --no-headless

# Adjust expansion levels and timing
python main.py --full https://example.com/ --max-levels 6 --wait-time 3.0
```

### Help

```bash
python main.py --help
```

### API Usage

Start the FastAPI server:

```bash
python api.py
```

Server runs on: `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

#### Analyze Documentation via API

**Request:**

```bash
curl -X POST "http://localhost:8000/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.i18next.com/"}'
```

**Response:**

```json
{
  "files": [
    {
      "fileName": "Getting_Started.md",
      "content": "---\nname: Getting Started\n..."
    },
    {
      "fileName": "Translation_Function.md",
      "content": "---\nname: Translation Function\n..."
    }
  ],
  "total": 2,
  "library": "I18next",
  "source": "https://www.i18next.com/"
}
```

**Strategy:**

- **GitHub URLs**: Single page conversion (faster)
- **Other URLs**: Full documentation conversion

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete API reference.

## 🔧 Configuration

### Programmatic Usage

```python
from backend import ConverterConfig, convert_full_documentation, convert_single_page

# Custom configuration
config = ConverterConfig(
    headless=True,
    max_expansion_levels=4,
    expansion_wait_time=2.0,
    output_base_dir="Skills"
)

# Full documentation conversion
result = convert_full_documentation(
    doc_url="https://www.i18next.com/",
    config=config,
    output_dir="i18next_docs"
)

# Single page conversion
result = convert_single_page(
    page_url="https://www.i18next.com/overview/getting-started",
    config=config,
    title="Getting Started"
)
```

### Configuration Options

| Option                 | Default         | Description                               |
| ---------------------- | --------------- | ----------------------------------------- |
| `headless`             | `True`          | Run browser in headless mode              |
| `window_size`          | `"1920,1080"`   | Browser window size                       |
| `page_load_timeout`    | `30`            | Page load timeout (seconds)               |
| `max_expansion_levels` | `4`             | Max navigation expansion depth            |
| `expansion_wait_time`  | `2.0`           | Wait time between expansions              |
| `initial_load_wait`    | `5.0`           | Initial page load wait time               |
| `output_base_dir`      | `".bob/skills"` | Base output directory (Bob AI compatible) |

## 📁 Output Structure

```
.bob/skills/
└── domain_name/           # Extracted from URL (e.g., react, i18next)
    ├── Page_Title_1.md
    ├── Page_Title_2.md
    └── ...
```

**Example:**

```
.bob/skills/
├── react/
│   ├── Adding_Interactivity.md
│   ├── State_Management.md
│   └── Hooks_Reference.md
└── i18next/
    ├── Getting_Started.md
    └── Translation_Function.md
```

Each markdown file follows **Bob AI's SKILL.md format**:

- **YAML Frontmatter** (required by Bob AI):
  - `name`: Page title
  - `description`: Auto-extracted description (helps Bob decide when to activate)
  - `library`: Library/framework name (custom field)
  - `source`: Original documentation URL (custom field)
- **Instructions Section**: Full documentation content in markdown

### Example Output File (Bob AI Compatible)

```markdown
---
name: Adding Interactivity
description: Some things on the screen update in response to user input. For example, clicking an image gallery switches the active image. In React, data that changes over time is called state.
library: React
source: https://react.dev/learn/adding-interactivity
---

# Adding Interactivity

[Documentation content becomes Bob AI instructions...]
```

### Using with Bob AI

Place generated skills in:

- **Project-specific**: `<project>/.bob/skills/react/`
- **Global**: `~/.bob/skills/react/`

Bob AI will automatically:

- Read the `description` to determine when to activate the skill
- Load the content as instructions when relevant
- Use the `library` field for context
- Reference the `source` URL when citing information

See [SKILL_FORMAT.md](SKILL_FORMAT.md) for complete Bob AI integration documentation.

## 🔍 How It Works

### Full Documentation Flow

1. **Load Base URL**: Opens the main documentation page
2. **Expand Navigation**: Heuristically expands all collapsible menus (up to 4 levels)
3. **Extract Links**: Discovers all documentation page URLs
4. **Process Pages**: Visits each page, converts to markdown, saves to file
5. **Report Results**: Provides statistics on success/failure

### Single Page Flow

1. **Load Page URL**: Opens the specific documentation page
2. **Extract Content**: Parses HTML and extracts main content
3. **Convert to Markdown**: Cleans HTML and converts to markdown
4. **Save File**: Saves with sanitized filename

### Shared Functions

- **Browser Automation**: Selenium WebDriver with Chrome
- **Heuristic Expansion**: Detects and clicks expandable elements
- **HTML Cleanup**: Removes navigation, footers, scripts, styles
- **Markdown Conversion**: Uses markdownify with ATX heading style
- **File Management**: Safe filename generation and organized output

## 🛠️ Development

### Adding New Features

The modular architecture makes it easy to extend:

1. **New utilities**: Add to `backend/utils/`
2. **Configuration options**: Update `backend/config.py`
3. **Conversion logic**: Modify `backend/converter.py`
4. **CLI options**: Extend `main.py`

### Module Structure

- **`config.py`**: Centralized configuration with dataclass
- **`converter.py`**: Main conversion logic with both approaches
- **`utils/browser.py`**: Browser management and automation
- **`utils/content_processor.py`**: HTML parsing and markdown conversion
- **`utils/file_manager.py`**: File operations and directory management

## 📝 Examples

### Example 1: Convert i18next Documentation

```bash
python main.py --full https://www.i18next.com/
```

Output:

```
Skills/i18next/
├── Getting_Started.md
├── Translation_Function.md
├── Interpolation.md
└── ...
```

### Example 2: Convert Single React Guide

```bash
python main.py --page https://react.dev/learn/thinking-in-react --title "Thinking in React"
```

Output:

```
Skills/react/
└── Thinking_in_React.md
```

## 🐛 Troubleshooting

### Chrome Driver Issues

- Ensure Chrome/Chromium is installed
- webdriver-manager will auto-download the correct driver version

### Page Not Loading

- Increase `--wait-time` for slower sites
- Use `--no-headless` to debug visually

### Missing Content

- Some sites use heavy JavaScript; increase wait times
- Check if site blocks automated browsers

## 📄 License

Part of the Doc2Skills project.

## 🤝 Contributing

This is a modular, scalable architecture designed for easy extension and maintenance. Feel free to add new features or improve existing ones!
