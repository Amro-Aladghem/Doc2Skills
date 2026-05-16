# Component Structure Documentation

## Overview

This document describes the refactored component architecture for the Doc2Skills frontend application. The monolithic `page.tsx` file has been broken down into a modular, maintainable structure following Next.js 13+ App Router best practices.

## Directory Structure

```
frontend/
├── app/
│   ├── page.tsx                          # Main orchestrator (64 lines)
│   ├── layout.tsx                        # Root layout
│   └── globals.css                       # Global styles
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                    # Navigation header
│   │   └── Footer.tsx                    # Footer component
│   │
│   ├── landing/
│   │   ├── LandingView.tsx               # Landing state container
│   │   ├── HeroSection.tsx               # Hero text and description
│   │   ├── URLInputForm.tsx              # URL input with button
│   │   └── FeatureList.tsx               # Supported features list
│   │
│   ├── processing/
│   │   ├── ProcessingView.tsx            # Processing state container
│   │   ├── TerminalWindow.tsx            # Terminal UI wrapper
│   │   ├── StatusLine.tsx                # Individual status line
│   │   └── ProgressBar.tsx               # Progress indicator
│   │
│   ├── workspace/
│   │   ├── WorkspaceView.tsx             # Workspace state container
│   │   ├── RepositoryInfo.tsx            # Left panel - repo details
│   │   ├── PipelineVisualization.tsx     # Center panel - pipeline
│   │   ├── GeneratedSkills.tsx           # Right panel - skills list
│   │   └── ComparisonDemo.tsx            # Bottom section - AI comparison
│   │
│   ├── ui/
│   │   ├── StatusBadge.tsx               # Reusable status badge
│   │   ├── PipelineNode.tsx              # Pipeline node component
│   │   ├── PipelineConnector.tsx         # Pipeline connector
│   │   └── SkillItem.tsx                 # Skill file item
│   │
│   └── animations/
│       └── PageTransition.tsx            # Reusable page transition wrapper
│
├── hooks/
│   ├── useAppState.ts                    # App state machine
│   └── useProcessing.ts                  # Processing state logic
│
├── lib/
│   ├── types.ts                          # TypeScript interfaces
│   ├── constants.ts                      # Constants and config
│   └── animations.ts                     # Animation variants
│
└── utils/
    └── mockData.ts                       # Mock data for demo
```

## Component Hierarchy

### Main Application Flow

```
Page (app/page.tsx)
├── Navbar
├── Main Content (AnimatePresence)
│   ├── LandingView (state === 'landing')
│   │   ├── HeroSection
│   │   ├── URLInputForm
│   │   └── FeatureList
│   │
│   ├── ProcessingView (state === 'processing')
│   │   └── TerminalWindow
│   │       ├── StatusLine (multiple)
│   │       └── ProgressBar
│   │
│   └── WorkspaceView (state === 'workspace')
│       ├── RepositoryInfo
│       │   └── StatusBadge (multiple)
│       ├── PipelineVisualization
│       │   ├── PipelineNode (multiple)
│       │   └── PipelineConnector (multiple)
│       ├── GeneratedSkills
│       │   └── SkillItem (multiple)
│       └── ComparisonDemo
│
└── Footer
```

## State Management

### Application States

The app uses a state machine with three states:

1. **landing** - Initial state with URL input
2. **processing** - Shows terminal animation with progress
3. **workspace** - Displays results and comparison demo

### Custom Hooks

#### `useAppState`
Manages the application state machine and URL input.

**Returns:**
- `state`: Current app state
- `setState`: Function to change state
- `url`: Current URL input
- `setUrl`: Function to update URL
- `handleGenerate`: Callback to start processing

#### `useProcessing`
Manages processing animation and status updates.

**Parameters:**
- `isActive`: Boolean indicating if processing is active

**Returns:**
- `statusLines`: Array of status line objects
- `progress`: Current progress percentage (0-100)
- `isComplete`: Boolean indicating completion

## Key Features

### 1. Separation of Concerns
Each component has a single, well-defined responsibility:
- Layout components handle navigation and footer
- View components manage state-specific UI
- UI components are reusable primitives
- Hooks encapsulate business logic

### 2. Type Safety
All types are centralized in `lib/types.ts`:
- `AppState`: State machine type
- `StatusLine`: Processing status interface
- `RepositoryInfo`: Repository metadata
- `SkillFile`: Generated skill file
- `PipelineStage`: Pipeline node data

### 3. Reusability
UI components can be used across the application:
- `StatusBadge`: Checkmark with label
- `PipelineNode`: Animated pipeline stage
- `PipelineConnector`: Animated connector line
- `SkillItem`: File list item with hover effects
- `PageTransition`: Consistent page animations

### 4. Maintainability
- Small, focused files (15-96 lines)
- Clear naming conventions
- Consistent file organization
- Easy to locate and modify features

### 5. Path Aliases
All imports use the `@/` alias configured in `tsconfig.json`:
```typescript
import { useAppState } from '@/hooks/useAppState';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { mockData } from '@/utils/mockData';
```

## Animation Strategy

### Variants
Centralized in `lib/animations.ts`:
- `containerVariants`: Page transitions
- `staggerChildren`: Staggered child animations
- `fadeInUp`: Fade in from bottom
- `fadeIn`: Simple fade in

### Usage
```typescript
import { containerVariants } from '@/lib/animations';

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {children}
</motion.div>
```

## Constants and Configuration

### Processing Configuration
```typescript
PROCESSING_CONFIG = {
  stepDuration: 700,      // ms per step
  completionDelay: 800,   // delay before workspace
}
```

### Initial Status Lines
Defined in `lib/constants.ts` with 7 processing steps.

### Mock Data
Demo data in `utils/mockData.ts`:
- Repository information
- Navigation tree structure
- Generated skill files

## Best Practices

### Component Creation
1. Create interface for props
2. Add JSDoc comment describing purpose
3. Use TypeScript for type safety
4. Export as named export (not default)

### File Naming
- Components: PascalCase (e.g., `StatusBadge.tsx`)
- Hooks: camelCase with 'use' prefix (e.g., `useAppState.ts`)
- Utils: camelCase (e.g., `mockData.ts`)

### Import Order
1. React/Next.js imports
2. Third-party libraries
3. Internal components
4. Internal hooks/utils
5. Types

## Migration from Original

### Before (511 lines)
```typescript
// Everything in one file
export default function App() {
  // All state, logic, and UI
}
```

### After (64 lines)
```typescript
// Clean orchestration
export default function Page() {
  const { state, url, handleGenerate } = useAppState();
  const { statusLines, progress } = useProcessing(state === 'processing');
  
  return (
    <div>
      <Navbar />
      <AnimatePresence mode="wait">
        {state === 'landing' && <LandingView />}
        {state === 'processing' && <ProcessingView />}
        {state === 'workspace' && <WorkspaceView />}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
```

## Testing Strategy

### Unit Tests
- Test hooks independently
- Test UI components with mock data
- Test utility functions

### Integration Tests
- Test state transitions
- Test user interactions
- Test animation sequences

### E2E Tests
- Test complete user flow
- Test all three states
- Test responsive behavior

## Future Enhancements

### Potential Improvements
1. Add error handling components
2. Create loading skeleton components
3. Add accessibility improvements
4. Implement keyboard navigation
5. Add unit tests for all components
6. Create Storybook stories
7. Add performance monitoring
8. Implement code splitting

### Scalability
The modular structure makes it easy to:
- Add new states to the state machine
- Create new view components
- Add new UI primitives
- Extend functionality without touching existing code

## Conclusion

This refactored structure provides:
- ✅ Better code organization
- ✅ Improved maintainability
- ✅ Enhanced reusability
- ✅ Type safety throughout
- ✅ Clear separation of concerns
- ✅ Easy to test and extend
- ✅ Follows Next.js best practices
- ✅ Production-ready architecture