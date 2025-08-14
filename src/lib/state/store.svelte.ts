// A simple Svelte state management implementation using runes update methods and initial data.
// A true app would be more complex and separated into different files.

import type { TaskData } from "../../types";

interface TaskBoxState {
  tasks: TaskData[];
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | null;
}
/*
 * The initial state of our store when the app loads.
 * Usually, you would fetch this from a server. Let's not worry about that now
 */
const defaultTasks: TaskData[] = [
  { id: "1", title: "Something", state: "TASK_INBOX" },
  { id: "2", title: "Something more", state: "TASK_INBOX" },
  { id: "3", title: "Something else", state: "TASK_INBOX" },
  { id: "4", title: "Something again", state: "TASK_INBOX" },
];

const initialState: TaskBoxState = {
  tasks: defaultTasks,
  status: "idle",
  error: null,
};

export const store = $state<TaskBoxState>(initialState);

export function archiveTask(id: string) {
  const filteredTasks = store.tasks
    .map(
      (task): TaskData =>
        task.id === id
          ? { ...task, state: "TASK_ARCHIVED" as TaskData["state"] }
          : task
    )
    .filter((t) => t.state === "TASK_INBOX" || t.state === "TASK_PINNED");
  store.tasks = filteredTasks;
}

export function pinTask(id: string) {
  const task = store.tasks.find((task) => task.id === id);
  if (task) {
    task.state = "TASK_PINNED";
  }
}
