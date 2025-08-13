<script lang="ts">
  type TaskData = {
    id?: string;
    title?: string;
    state: "TASK_ARCHIVED" | "TASK_INBOX" | "TASK_PINNED";
  };

  interface Props {
    task: TaskData;
    onArchiveTask: (id: string) => void;
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
</script>

<div class="list-item">
  <label for={`title-${task.id}`} aria-label={task.title}>
    <input
      type="text"
      value={task.title}
      readOnly
      name="title"
      id={`title-${task.id}`}
    />
  </label>
</div>
