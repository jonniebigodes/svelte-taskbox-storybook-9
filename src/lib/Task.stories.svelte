<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import { fn } from "storybook/test";

  import Task from "./Task.svelte";

  export const TaskData = {
    id: "1",
    title: "Test Task",
    state: "TASK_INBOX",
    events: {
      onArchiveTask: fn(),
      onPinTask: fn(),
    },
  };

  const { Story } = defineMeta({
    component: Task,
    title: "Task",
    tags: ["autodocs"],
    excludeStories: /.*Data$/,
    args: {
      ...TaskData.events,
    },
  });
</script>

<Story name="Default" args={{ task: TaskData }} />

<Story name="Pinned" args={{ task: { ...TaskData, state: "TASK_PINNED" } }} />

<Story
  name="Archived"
  args={{ task: { ...TaskData, state: "TASK_ARCHIVED" } }}
/>
