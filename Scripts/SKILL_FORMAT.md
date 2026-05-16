# Skill File Format Documentation

## Overview

Each converted documentation page is saved as a markdown file following **Bob AI's SKILL.md format** for AI agent consumption.

## File Format Structure

Following Bob AI's skill specification:

```markdown
---
name: Page Title
description: Brief description extracted from the first meaningful text elements of the page
library: LibraryName
source: https://example.com/docs/page
---

# Page Title

[Main content in markdown format - this becomes the skill instructions]
```

## YAML Frontmatter Fields

### name (Required)

- **Format**: `Page Title` (without library suffix)
- **Example**: `"Adding Interactivity"`, `"Getting Started"`
- **Purpose**: The skill's display name used in Bob AI interface
- **Bob's Usage**: Used to identify and reference the skill

### description (Required)

- **Format**: Clear, concise summary (1-2 lines, max ~300 characters)
- **Example**: `"Some things on the screen update in response to user input. For example, clicking an image gallery switches the active image. In React, data that changes over time is called state."`
- **Extraction**: Automatically extracted from the first meaningful text elements (h1, h2, p, div) in the main content area
- **Purpose**: Helps Bob AI decide when to activate this skill
- **Bob's Usage**: Skills without descriptions are ignored by Bob

### library (Custom Field)

- **Format**: `"LibraryName"` (capitalized, no spaces)
- **Example**: `"React"`, `"I18next"`, `"Express"`
- **Purpose**: Identifies the library/framework/package context
- **Extraction**: Automatically extracted from the domain name in the URL

### source (Custom Field)

- **Format**: Full URL string
- **Example**: `"https://react.dev/learn/adding-interactivity"`
- **Purpose**: Original documentation page URL for reference
- **Bob's Usage**: Allows Bob to cite sources and users to access original docs

## Instructions Section

Everything below the `---` delimiter becomes the instructions Bob receives when the skill is activated:

1. **Title**: H1 heading with the page title
2. **Body**: Full markdown conversion of the documentation page
   - Code blocks preserved
   - Links maintained
   - Images included
   - Navigation, footers, and scripts removed

## Example Files

### Example 1: React Documentation

```markdown
---
name: Adding Interactivity
description: Some things on the screen update in response to user input. For example, clicking an image gallery switches the active image. In React, data that changes over time is called state.
library: React
source: https://react.dev/learn/adding-interactivity
---

# Adding Interactivity

Some things on the screen update in response to user input. For example, clicking an image gallery switches the active image. In React, data that changes over time is called _state._ You can add state to any component, and update it as needed.

## In this chapter

- How to handle user-initiated events
- How to make components "remember" information with state
- How React updates the UI in two phases

[rest of content...]
```

### Example 2: i18next Documentation

````markdown
---
name: Getting Started
description: i18next is an internationalization-framework written in and for JavaScript. It provides you with a complete solution to localize your product from web to mobile and desktop.
library: I18next
source: https://www.i18next.com/overview/getting-started
---

# Getting Started

i18next is an internationalization-framework written in and for JavaScript. It provides you with a complete solution to localize your product from web to mobile and desktop.

## Installation

```bash
npm install i18next
```
````

[rest of content...]

```

## Filename Convention

- **Format**: `Page_Title.md`
- **Rules**:
  - Spaces replaced with underscores
  - Special characters removed
  - Safe for all file systems
- **Examples**:
  - `Adding_Interactivity.md`
  - `Getting_Started.md`
  - `API_Reference.md`

## Directory Structure

Skills are organized by library/framework:

```

Skills/
└── library_name/
├── Skill_1.md
├── Skill_2.md
└── Skill_3.md

```

Example:
```

Skills/
├── react/
│ ├── Adding_Interactivity.md
│ ├── State_Management.md
│ └── Hooks_Reference.md
└── i18next/
├── Getting_Started.md
├── Translation_Function.md
└── Plugins.md

```

## Bob AI Integration

### How Bob Uses These Skills

1. **Skill Activation**: Bob reads the `description` field to determine when to activate the skill
2. **Context Loading**: Bob loads the skill's instructions (everything after `---`)
3. **Library Context**: Bob uses the `library` field to understand the framework context
4. **Source Reference**: Bob can cite the `source` URL when providing information
5. **Instruction Following**: Bob follows the content as actionable instructions

### Skill Locations

Generated skills are automatically placed in `.bob/skills/` and can be used at:

| Location                 | Scope            | Use case                                | Auto-generated |
| ------------------------ | ---------------- | --------------------------------------- | -------------- |
| `<project>/.bob/skills/` | Project-specific | Documentation for project dependencies  | ✅ Yes (default) |
| `~/.bob/skills/`         | Global           | Personal library documentation          | Manual copy    |

**Default behavior:** The converter outputs to `.bob/skills/` in the current directory, making skills immediately available to Bob AI in that project.

### Example Usage with Bob

When you ask Bob:
> "How do I add interactivity in React?"

Bob will:
1. Check skill descriptions for relevance
2. Find "Adding Interactivity" skill (description matches query)
3. Load the skill's instructions
4. Use the content to provide accurate, documentation-based answers
5. Reference the source URL if needed

## Conversion Process

1. **Page Load**: Browser loads the documentation page
2. **Title Extraction**: Extracts page title from `<title>` or `<h1>` tags
3. **Library Detection**: Extracts library name from URL domain
4. **Description Extraction**: Finds first 2 meaningful text elements (h1, h2, p, div)
5. **Content Conversion**: Converts HTML to markdown, removing navigation/footer
6. **YAML Generation**: Creates frontmatter with name, description, library, source
7. **File Save**: Saves with sanitized filename in library-specific directory

## Key Differences from Standard Skills

While following Bob AI's SKILL.md format, these generated skills have some differences:

1. **Auto-Generated**: Created from documentation, not manually written
2. **Reference Material**: Content is documentation, not step-by-step instructions
3. **Custom Fields**: Added `library` and `source` fields for context
4. **Bulk Creation**: Designed for converting entire documentation sites

## Best Practices

### For Bob AI Usage

- **Clear Descriptions**: Auto-extracted descriptions help Bob determine relevance
- **Focused Content**: Each skill covers one documentation page/topic
- **Source Attribution**: Original URLs allow Bob to cite sources
- **Library Context**: Library field helps Bob understand framework-specific concepts

### For Organization

- **Library Folders**: Keep skills organized by library/framework
- **Consistent Naming**: Use original documentation page titles
- **Version Control**: Include in `.bob/skills/` for team sharing
- **Regular Updates**: Re-run converter when documentation updates

## Notes

- All metadata is enclosed in YAML frontmatter (`---` delimiters)
- Description extraction skips navigation-like text (menu, skip to, etc.)
- Content cleanup removes: nav, footer, script, style, header, aside tags
- Markdown uses ATX-style headings (`#`, `##`, etc.)
- Skills load once per conversation in Bob AI
- Bob automatically determines when to activate skills based on descriptions
```
