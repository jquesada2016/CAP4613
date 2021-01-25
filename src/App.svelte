<script>
  import "./TailwindStyles.svelte";

  import Navbar from "./components/Navbar.svelte";
  import Content from "./components/Content.svelte";
</script>

<Navbar />
<Content />

<style>
  :global(body) {
    display: flex;
    flex-direction: column;
    color: white;
    min-height: 100vh;
  }
</style>
