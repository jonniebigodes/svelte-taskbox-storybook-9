<script lang="ts">
  import type { TaskData } from "../types";

  import Task from "./Task.svelte";

  import LoadingRow from "./LoadingRow.svelte";

  interface Props {
    /** Checks if it's in loading state */
    loading?: boolean;
    /** The list of tasks */
    tasks: TaskData[];
    /** Event to change the task to pinned */
    onPinTask: (id: string) => void;
    /** Event to change the task to archived */
    onArchiveTask: (id: string) => void;
  }

  const {
    loading = false,
    tasks = [],
    onPinTask,
    onArchiveTask,
  }: Props = $props();

  const noTasks = $derived(tasks.length === 0);
  const tasksInOrder = $derived([
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ]);
</script>

{#if loading}
  <div class="list-items" data-testid="loading" id="loading">
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
  </div>
{/if}
{#if !loading && noTasks}
  <div class="list-items">
    <div class="wrapper-message">
      <span class="icon-check"></span>
      <p class="title-message">You have no tasks</p>
      <p class="subtitle-message">Sit back and relax</p>
    </div>
  </div>
{/if}

{#each tasksInOrder as task}
  <Task {task} {onPinTask} {onArchiveTask} />
{/each}
