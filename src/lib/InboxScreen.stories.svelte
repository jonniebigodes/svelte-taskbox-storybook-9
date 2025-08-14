<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import InboxScreen from "./InboxScreen.svelte";

  const { Story } = defineMeta({
    component: InboxScreen,
    title: "InboxScreen",
    tags: ["autodocs"],
  });
</script>

<Story name="Default" />

<Story name="Error" />
