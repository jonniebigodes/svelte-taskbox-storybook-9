<!-- Initial implementation -->
<!-- <script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import InboxScreen from "./InboxScreen.svelte";

  const { Story } = defineMeta({
    component: InboxScreen,
    title: "InboxScreen",
    tags: ["autodocs"],
  });
</script>

<Story name="Default" />

<Story name="Error" /> -->
<!-- Mock API with MSW -->

<!-- <script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import { http, HttpResponse } from "msw";

  import InboxScreen from "./InboxScreen.svelte";

  import * as PureTaskListStories from "./PureTaskList.stories.svelte";

  const { Story } = defineMeta({
    component: InboxScreen,
    title: "InboxScreen",
    tags: ["autodocs"],
  });
</script>

<Story
  name="Default"
  parameters={{
    msw: {
      handlers: [
        http.get("https://jsonplaceholder.typicode.com/todos?userId=1", () => {
          return HttpResponse.json(PureTaskListStories.TaskListData);
        }),
      ],
    },
  }}
/>

<Story
  name="Error"
  parameters={{
    msw: {
      handlers: [
        http.get("https://jsonplaceholder.typicode.com/todos?userId=1", () => {
          return new HttpResponse(null, {
            status: 403,
          });
        }),
      ],
    },
  }}
/> -->

<!-- Interaction tests enabled -->

<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import { http, HttpResponse } from "msw";

  import { waitFor, waitForElementToBeRemoved } from "storybook/test";

  import InboxScreen from "./InboxScreen.svelte";

  import * as PureTaskListStories from "./PureTaskList.stories.svelte";

  const { Story } = defineMeta({
    component: InboxScreen,
    title: "InboxScreen",
    tags: ["autodocs"],
  });
</script>

<Story
  name="Default"
  parameters={{
    msw: {
      handlers: [
        http.get("https://jsonplaceholder.typicode.com/todos?userId=1", () => {
          return HttpResponse.json(PureTaskListStories.TaskListData);
        }),
      ],
    },
  }}
  play={async ({ canvas, userEvent }) => {
    await waitForElementToBeRemoved(await canvas.findByTestId("loading"));
    await waitFor(async () => {
      await userEvent.click(canvas.getByLabelText("pinTask-1"));
      await userEvent.click(canvas.getByLabelText("pinTask-3"));
    });
  }}
/>

<Story
  name="Error"
  parameters={{
    msw: {
      handlers: [
        http.get("https://jsonplaceholder.typicode.com/todos?userId=1", () => {
          return new HttpResponse(null, {
            status: 403,
          });
        }),
      ],
    },
  }}
/>
