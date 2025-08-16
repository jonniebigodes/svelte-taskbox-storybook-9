<script lang="ts">
  import TaskList from "./TaskList.svelte";

  import { fetchTasks, store } from "./state/store.svelte";

  $effect(() => {
    fetchTasks();
  });
</script>

{#if store.status === "failed"}
  <div class="page lists-show">
    <div class="wrapper-message">
      <span class="icon-face-sad"></span>
      <p class="title-message">Oh no!</p>
      <p class="subtitle-message">Something went wrong</p>
    </div>
  </div>
{:else}
  <div class="page lists-show">
    <nav>
      <h1 class="title-page">Taskbox</h1>
    </nav>
    <TaskList />
  </div>
{/if}
