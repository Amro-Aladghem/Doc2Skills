# Doc2Skills Frontend

> A modern Next.js application that transforms documentation into AI-ready skill files for coding agents

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)

## 🎯 Overview

Doc2Skills Frontend is a developer tool interface that enables developers to continue shipping products regardless of whether their AI coding assistants have been trained on the technologies they're using. It converts repository documentation into structured `SKILLS.md` files that coding agents can read and use to produce safe, accurate code—preventing hallucinations and non-existent API usage.

### Key Features

- 🚀 **Real-time Processing Visualization** - Watch as your documentation is transformed
- 🎨 **IDE-Inspired Interface** - Familiar developer-centric UI/UX
- 📊 **Pipeline Visualization** - See the transformation process step-by-step
- 🔄 **State Machine Architecture** - Smooth transitions between landing, processing, and workspace views
- ⚡ **Modern Tech Stack** - Built with Next.js 16, React 19, and Tailwind CSS 4
- 🎭 **Fluid Animations** - Powered by Motion (Framer Motion)

## 📋 Table of Contents

- [Getting Started](#-getting-started)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Key Components](#-key-components)
- [State Management](#-state-management)
- [Styling](#-styling)
- [Development](#-development)
- [Build & Deploy](#-build--deploy)
- [Contributing](#-contributing)

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **pnpm** 8.x or higher (recommended package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Doc2Skills/frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build production-ready application |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint for code quality checks |

## 🏗️ Architecture

### Application Flow

The application follows a **state machine pattern** with three distinct states:

```
┌─────────┐     Generate     ┌────────────┐     Complete     ┌───────────┐
│ Landing │ ───────────────> │ Processing │ ───────────────> │ Workspace │
└─────────┘                  └────────────┘                  └───────────┘
```

1. **Landing State** - User inputs repository/documentation URL
2. **Processing State** - Real-time visualization of documentation transformation
3. **Workspace State** - IDE-like interface displaying generated skills and pipeline results

### Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion successor)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📁 Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── api/                     # API routes (Next.js Route Handlers)
│   │   └── analyze/             # Documentation analysis endpoint
│   │       └── route.ts         # POST /api/analyze handler
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Main application page
│   ├── globals.css              # Global styles & Tailwind imports
│   └── favicon.ico              # App favicon
│
├── components/                   # React components (organized by feature)
│   ├── animations/              # Animation wrappers
│   │   └── PageTransition.tsx   # Page transition animations
│   │
│   ├── landing/                 # Landing page components
│   │   ├── LandingView.tsx      # Main landing view container
│   │   ├── HeroSection.tsx      # Hero with title & description
│   │   ├── URLInputForm.tsx     # Repository URL input
│   │   └── FeatureList.tsx      # Supported features list
│   │
│   ├── processing/              # Processing state components
│   │   ├── ProcessingView.tsx   # Main processing view container
│   │   ├── TerminalWindow.tsx   # Terminal-style output window
│   │   ├── StatusLine.tsx       # Individual status line
│   │   └── ProgressBar.tsx      # Progress indicator
│   │
│   ├── workspace/               # Workspace (results) components
│   │   ├── WorkspaceView.tsx    # Main workspace container
│   │   ├── RepositoryInfo.tsx   # Repository metadata sidebar
│   │   ├── PipelineVisualization.tsx  # Processing pipeline display
│   │   ├── GeneratedSkills.tsx  # Skills file output
│   │   └── ComparisonDemo.tsx   # Before/after comparison
│   │
│   ├── layout/                  # Layout components
│   │   ├── Navbar.tsx           # Top navigation bar
│   │   └── Footer.tsx           # Footer with credits
│   │
│   └── ui/                      # Reusable UI components
│       ├── PipelineNode.tsx     # Pipeline stage node
│       ├── PipelineConnector.tsx # Pipeline connector line
│       ├── SkillItem.tsx        # Skill file item
│       └── StatusBadge.tsx      # Status badge component
│
├── hooks/                       # Custom React hooks
│   ├── useAppState.ts          # Application state machine
│   ├── useProcessing.ts        # Processing simulation logic
│   └── useAnalyze.ts           # Backend API integration hook
│
├── lib/                         # Utilities & configurations
│   ├── types.ts                # TypeScript type definitions
│   ├── constants.ts            # Application constants
│   ├── animations.ts           # Animation configurations
│   └── api.ts                  # API client with error handling
│
├── utils/                       # Helper functions
│   └── mockData.ts             # Mock data for demo
│
├── public/                      # Static assets
│   └── *.svg                   # SVG icons
│
└── Configuration files
    ├── package.json            # Dependencies & scripts
    ├── tsconfig.json           # TypeScript configuration
    ├── next.config.ts          # Next.js configuration
    ├── tailwind.config.ts      # Tailwind CSS configuration
    ├── postcss.config.mjs      # PostCSS configuration
    └── eslint.config.mjs       # ESLint configuration
```

## 🧩 Key Components

### Views (Page-Level Components)

#### `LandingView`
The initial view where users input their repository or documentation URL.

**Features:**
- Hero section with product description
- URL input form with validation
- Feature list showcasing supported sources

#### `ProcessingView`
Real-time visualization of the documentation transformation process.

**Features:**
- Terminal-style output window
- Animated status lines with completion indicators
- Progress bar showing overall completion
- Smooth transitions between processing steps

#### `WorkspaceView`
IDE-inspired interface displaying the generated skills and processing results.

**Features:**
- Repository explorer sidebar (25% width)
- Pipeline visualization showing transformation stages
- Generated skills file viewer
- Before/after comparison demo

### Custom Hooks

#### `useAppState`
Manages the application's state machine and URL input.

```typescript
const { state, setState, url, setUrl, handleGenerate } = useAppState();
```

**Returns:**
- `state`: Current application state ('landing' | 'processing' | 'workspace')
- `setState`: Function to update application state
- `url`: Current repository URL
- `setUrl`: Function to update URL
- `handleGenerate`: Handler to start processing

#### `useProcessing`
Simulates the processing pipeline with animated status updates.

```typescript
const { statusLines, progress, isComplete } = useProcessing(isActive);
```

**Returns:**
- `statusLines`: Array of processing status lines with completion state
- `progress`: Current progress percentage (0-100)
- `isComplete`: Boolean indicating if processing is complete

#### `useAnalyze`
Handles backend API integration for documentation analysis.

```typescript
const { data, isLoading, error, analyze, reset } = useAnalyze();
```

**Returns:**
- `data`: Analysis response with generated skill files (null if not yet analyzed)
- `isLoading`: Boolean indicating if request is in progress
- `error`: Error message string (null if no error)
- `analyze`: Function to trigger analysis with a URL
- `reset`: Function to clear state

**Usage Example:**
```typescript
import { useAnalyze } from '@/hooks/useAnalyze';

function MyComponent() {
  const { data, isLoading, error, analyze } = useAnalyze();

  const handleSubmit = async (url: string) => {
    await analyze(url);
  };

  if (isLoading) return <div>Analyzing...</div>;
  if (error) return <div>Error: {error}</div>;
  if (data) return <div>Found {data.total} skill files</div>;

  return <button onClick={() => handleSubmit('https://...')}>Analyze</button>;
}
```

## 🔌 API Integration

### Backend Connection

The frontend connects to the Doc2Skills backend API through Next.js API routes, providing a secure proxy layer.

#### Environment Configuration

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

For local development:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### API Routes

**POST /api/analyze**

Proxies documentation analysis requests to the backend.

**Request:**
```typescript
{
  url: string; // Documentation URL to analyze
}
```

**Response:**
```typescript
{
  files: Array<{
    fileName: string;
    content: string;
  }>;
  library: string;
  source: string;
  total: number;
}
```

**Error Response:**
```typescript
{
  error: string;
  message?: string;
}
```

#### API Client

The `apiClient` utility provides type-safe methods for backend communication:

```typescript
import { apiClient } from '@/lib/api';

// Analyze documentation
try {
  const result = await apiClient.analyze('https://github.com/user/repo');
  console.log(`Generated ${result.total} skill files`);
} catch (error) {
  if (error instanceof ApiClientError) {
    console.error(`API Error: ${error.message}`);
  }
}
```

**Features:**
- Type-safe request/response handling
- Automatic error parsing
- Custom `ApiClientError` class
- Centralized configuration

#### Integration Flow

```
┌──────────┐      ┌─────────────┐      ┌─────────────┐
│ Frontend │ ───> │ Next.js API │ ───> │   Backend   │
│  (React) │      │   Route     │      │  (Python)   │
└──────────┘      └─────────────┘      └─────────────┘
     │                   │                     │
     │                   │                     │
     └─── useAnalyze ────┴──── /api/analyze ──┘
```

1. User submits URL via `useAnalyze` hook
2. Hook calls `/api/analyze` Next.js route
3. Route proxies request to backend API
4. Backend processes documentation
5. Response flows back through the chain
6. UI updates with generated skills

## 🎨 Styling

### Design System

The application uses a custom design system built on Tailwind CSS with semantic color tokens:

```css
/* Color Palette */
--bg: #0a0a0a          /* Background */
--surface: #141414     /* Surface/Cards */
--border: #262626      /* Borders */
--text: #e5e5e5        /* Primary text */
--text-muted: #a3a3a3  /* Secondary text */
--brand: #3b82f6       /* Brand blue */
--success: #22c55e     /* Success green */
```

### Responsive Design

- **Mobile-first approach** with breakpoints at `md:` (768px) and `lg:` (1024px)
- **Fluid typography** using Tailwind's responsive utilities
- **Flexible layouts** that adapt from single-column to multi-column

### Animations

Powered by Motion (Framer Motion) for smooth, performant animations:

- **Page transitions** with fade and slide effects
- **Staggered animations** for lists and status lines
- **Progress indicators** with smooth easing
- **Hover states** for interactive elements

## 💻 Development

### Code Style

- **TypeScript** for type safety
- **Functional components** with hooks
- **Component composition** over inheritance
- **Explicit prop types** with interfaces
- **JSDoc comments** for documentation

### File Naming Conventions

- **Components**: PascalCase (e.g., `HeroSection.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAppState.ts`)
- **Utilities**: camelCase (e.g., `mockData.ts`)
- **Types**: PascalCase for interfaces/types (e.g., `AppState`)

### Component Structure

```typescript
/**
 * Component description
 */
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Hooks
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // Handlers
  const handleAction = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Adding New Features

1. **Create component** in appropriate directory
2. **Define types** in `lib/types.ts` if needed
3. **Add constants** to `lib/constants.ts` if applicable
4. **Update parent component** to integrate new feature
5. **Test** in development environment

## 🏗️ Build & Deploy

### Production Build

```bash
# Create optimized production build
pnpm build

# Start production server
pnpm start
```

### Build Output

- **Static assets** in `.next/static/`
- **Server components** in `.next/server/`
- **Optimized bundles** with code splitting
- **Image optimization** via Next.js Image component

### Deployment Options

- **Vercel** (recommended) - Zero-config deployment
- **Docker** - Containerized deployment
- **Static Export** - For static hosting (if applicable)

### Environment Variables

Create a `.env.local` file for local development:

```env
# Add environment variables here
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🤝 Contributing

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the code style guidelines
   - Add TypeScript types
   - Update documentation

3. **Test your changes**
   ```bash
   pnpm dev
   pnpm lint
   ```

4. **Commit with descriptive messages**
   ```bash
   git commit -m "feat: add new feature description"
   ```

5. **Push and create a pull request**

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## 📄 License

This project is licensed under the Apache-2.0 License.

## 🙏 Acknowledgments

Built with ❤️ by team FinalBeast

---

**Made with Bob** 🤖

For more information about Doc2Skills, visit the [main repository](../).