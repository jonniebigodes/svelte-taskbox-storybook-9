// // A simple Svelte state management implementation using runes update methods and initial data.
// // A true app would be more complex and separated into different files.

// import type { TaskData } from "../../types";

// interface TaskBoxState {
//   tasks: TaskData[];
//   status: "idle" | "loading" | "failed" | "succeeded";
//   error: string | null;
// }
// /*
//  * The initial state of our store when the app loads.
//  * Usually, you would fetch this from a server. Let's not worry about that now
//  */
// const defaultTasks: TaskData[] = [
//   { id: "1", title: "Something", state: "TASK_INBOX" },
//   { id: "2", title: "Something more", state: "TASK_INBOX" },
//   { id: "3", title: "Something else", state: "TASK_INBOX" },
//   { id: "4", title: "Something again", state: "TASK_INBOX" },
// ];

// const initialState: TaskBoxState = {
//   tasks: defaultTasks,
//   status: "idle",
//   error: null,
// };

// export const store = $state<TaskBoxState>(initialState);

// export function archiveTask(id: string) {
//   const filteredTasks = store.tasks
//     .map(
//       (task): TaskData =>
//         task.id === id
//           ? { ...task, state: "TASK_ARCHIVED" as TaskData["state"] }
//           : task
//     )
//     .filter((t) => t.state === "TASK_INBOX" || t.state === "TASK_PINNED");
//   store.tasks = filteredTasks;
// }

// export function pinTask(id: string) {
//   const task = store.tasks.find((task) => task.id === id);
//   if (task) {
//     task.state = "TASK_PINNED";
//   }
// }

// Updates for the Screen section

// A simple Svelte state management implementation using runes update methods and initial data.
// A true app would be more complex and separated into different files.
import type { TaskData } from "../../types";

interface TaskBoxState {
  tasks: TaskData[];
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | null;
}

const initialState: TaskBoxState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const store = $state<TaskBoxState>(initialState);

// Function that fetches tasks from the API to populate the store
export async function fetchTasks() {
  store.status = "loading";
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?userId=1"
    );
    const data = await response.json();
    // Transform the data to match the TaskData type
    const result = data
      .map((task: { id: number; title: string; completed: boolean }) => ({
        id: `${task.id}`,
        title: task.title,
        state: task.completed ? "TASK_ARCHIVED" : "TASK_INBOX",
      }))
      .filter(
        (task: TaskData) =>
          task.state === "TASK_INBOX" || task.state === "TASK_PINNED"
      );

    store.tasks = result;
    store.status = "succeeded";
  } catch (error) {
    if (error && typeof error === "object" && "message" in error) {
      store.error = (error as { message: string }).message;
    } else {
      store.error = String(error);
    }
    store.status = "failed";
  }
}

// Function that archives a task
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

// Function that pins a task
export function pinTask(id: string) {
  const task = store.tasks.find((task) => task.id === id);
  if (task) {
    task.state = "TASK_PINNED";
  }
}
