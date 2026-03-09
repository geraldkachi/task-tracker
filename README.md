# Task Tracker

A clean, minimal task management app built with React Native and Expo.

## Setup

```bash
npm install
npx expo start
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with the Expo Go app.

## Features

- ✅ View a list of tasks
- ✅ Create new tasks (with validation — empty tasks are rejected)
- ✅ Mark tasks as complete or incomplete
- ✅ Filter tasks: **All** / **Active** / **Done or completed**
- ✅ Tasks persist across app restarts via AsyncStorage
- ✅ Progress bar showing completion rate
- ✅ Contextual empty states per filter
- ✅ Accessible (roles, labels, hints on all interactive elements)

## Libraries & Rationale

| Library | Why |
|---|---|
| **Expo SDK 54** | Latest stable SDK; zero-config tooling for iOS/Android/Web |
| **Expo Router 4** | File-based routing — clean, typed, scales well if the app grows |
| **@react-native-async-storage/async-storage** | The standard, battle-tested persistence layer for React Native; simple key-value API that covers this use case without over-engineering |
| **Zustand 5** | Minimal global state with no boilerplate; the store co-locates actions and derived data cleanly; trivial to test |
| **Zod** | Declarative runtime validation with TypeScript inference; prevents empty task creation at the schema level rather than with ad-hoc checks |
| **NativeWind 4** | Tailwind CSS for React Native; enables design-token driven theming with a shared vocabulary |
| **TypeScript** | Full strict-mode types throughout; `Task` and `FilterType` types drive the entire data layer |

## Project Structure

```
TaskTracker/
├── app/
│   ├── _layout.tsx        # Root layout (SafeAreaProvider)
│   └── index.tsx          # Single screen — the whole app
├── components/
│   ├── AddTaskInput.tsx   # Controlled input with Zod validation
│   ├── EmptyState.tsx     # Context-aware empty state per filter
│   ├── FilterBar.tsx      # All / Active / Done tab strip
│   └── TaskItem.tsx       # Individual task row (checkbox, delete)
├── store/
│   └── taskStore.ts       # Zustand store with AsyncStorage sync
├── types/
│   └── index.ts           # Task and FilterType types
└── utils/
    ├── schemas.ts          # Zod validation schemas
    └── storage.ts          # AsyncStorage read/write helpers
```

## What I Would Improve With More Time

1. **Swipe-to-delete** — use `react-native-gesture-handler` swipeable rows for a more native delete UX rather than a visible delete button
2. **Reorder tasks** — drag-and-drop reordering with `react-native-draggable-flatlist`
3. **Due dates** — add an optional due date field with overdue highlighting
4. **Optimistic updates with React Query** — if this backed a real API, React Query would handle caching, background refetching, and optimistic UI gracefully
5. **Undo delete** — a brief toast with an undo action (Snackbar pattern) instead of permanent immediate deletion
6. **Animations** — entrance/exit animations on task rows using Reanimated's `FadeIn`/`FadeOut` layout animations
7. **Dark mode** — the colour tokens are already abstracted, so adding a dark theme would be straightforward
