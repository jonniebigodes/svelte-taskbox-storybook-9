<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import TaskList from "./TaskList.svelte";
  import MarginDecorator from "./MarginDecorator.svelte";

  import * as TaskStories from "./Task.stories.svelte";

  const TaskListData = [
    { ...TaskStories.TaskData, id: "1", title: "Task 1" },
    { ...TaskStories.TaskData, id: "2", title: "Task 2" },
    { ...TaskStories.TaskData, id: "3", title: "Task 3" },
    { ...TaskStories.TaskData, id: "4", title: "Task 4" },
    { ...TaskStories.TaskData, id: "5", title: "Task 5" },
    { ...TaskStories.TaskData, id: "6", title: "Task 6" },
  ];

  const { Story } = defineMeta({
    component: TaskList,
    title: "TaskList",
    tags: ["autodocs"],
    decorators: [() => MarginDecorator],
    args: {
      ...TaskStories.TaskData.events,
    },
  });
</script>

<Story
  name="Default"
  args={{
    tasks: TaskListData,
    loading: false,
  }}
/>
<Story
  name="WithPinnedTasks"
  args={{
    tasks: [
      ...TaskListData.slice(0, 5),
      { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" },
    ],
  }}
/>

<Story
  name="Loading"
  args={{
    tasks: [],
    loading: true,
  }}
/>

<Story
  name="Empty"
  args={{
    tasks: TaskListData.slice(0, 0),
    loading: false,
  }}
/>
