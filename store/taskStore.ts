import { create } from "zustand";
import { Task, FilterType } from "../types";
import { loadTasks, saveTasks } from "../utils/storage";

interface TaskStore {
  tasks: Task[];
  filter: FilterType;
  hydrated: boolean;

  // Actions
  hydrate: () => Promise<void>;
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setFilter: (filter: FilterType) => void;

  // Derived (computed inline to keep the store simple)
  filteredTasks: () => Task[];
  counts: () => { all: number; active: number; completed: number };
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  filter: "all",
  hydrated: false,

  hydrate: async () => {
    const tasks = await loadTasks();
    set({ tasks, hydrated: true });
  },

  addTask: (title: string) => {
    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title,
      completed: false,
      createdAt: Date.now(),
    };
    const tasks = [newTask, ...get().tasks];
    set({ tasks });
    saveTasks(tasks);
  },

  toggleTask: (id: string) => {
    const tasks = get().tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    set({ tasks });
    saveTasks(tasks);
  },

  deleteTask: (id: string) => {
    const tasks = get().tasks.filter((t) => t.id !== id);
    set({ tasks });
    saveTasks(tasks);
  },

  setFilter: (filter: FilterType) => set({ filter }),

  filteredTasks: () => {
    const { tasks, filter } = get();
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  },

  counts: () => {
    const { tasks } = get();
    const completed = tasks.filter((t) => t.completed).length;
    return { all: tasks.length, active: tasks.length - completed, completed };
  },
}));
