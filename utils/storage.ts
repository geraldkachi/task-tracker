import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types";

const TASKS_KEY = "@task_tracker:tasks";

export async function loadTasks(): Promise<Task[]> {
  try {
    const raw = await AsyncStorage.getItem(TASKS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Task[];
  } catch {
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch {
    // fail silently — tasks still work in-session
  }
}
