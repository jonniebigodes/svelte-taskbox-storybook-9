<script>
  let { children } = $props();
</script>

<div>
  {@render children()}
</div>

<style>
  div {
    margin: 3em;
  }
</style>
