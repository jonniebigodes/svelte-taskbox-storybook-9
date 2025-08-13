<script lang="ts">
  type TaskData = {
    id: string;
    title: string;
    state: "TASK_ARCHIVED" | "TASK_INBOX" | "TASK_PINNED";
  };

  interface Props {
    /** Composition of the task */
    task: TaskData;
    /** Event to change the task to archived */
    onArchiveTask: (id: string) => void;
    /** Event to change the task to pinned */
    onPinTask: (id: string) => void;
  }

  const {
    task = {
      id: "",
      title: "",
      state: "TASK_INBOX",
    },
    onArchiveTask,
    onPinTask,
  }: Props = $props();

  const isChecked = $derived(task.state === "TASK_ARCHIVED");
</script>

<div class="list-item {task.state}">
  <label
    for={`checked-${task.id}`}
    class="checkbox"
    aria-label={`archiveTask-${task.id}`}
  >
    <input
      type="checkbox"
      checked={isChecked}
      disabled
      name={`checked-${task.id}`}
      id={`archiveTask-${task.id}`}
    />
    <span
      class="checkbox-custom"
      onclick={() => onArchiveTask(task.id ?? "")}
    />
  </label>
  <label for={`title-${task.id}`} aria-label={task.title} class="title">
    <input
      type="text"
      value={task.title}
      readonly
      name="title"
      id={`title-${task.id}`}
      placeholder="Input title"
    />
  </label>
  {#if task.state !== "TASK_ARCHIVED"}
    <button
      class="pin-button"
      onclick={(e) => {
        e.preventDefault();
        onPinTask(task.id ?? "");
      }}
      id={`pinTask-${task.id}`}
      aria-label={`pinTask-${task.id}`}
    >
      <span class="icon-star" />
    </button>
  {/if}
</div>
