<script>
  // TailwindCSS
  import "./TailwindStyles.svelte";

  // Components
  import Navbar from "./components/Navbar.svelte";
  import Content from "./components/Content.svelte";
  import { darkModeStore } from "./stores";

  $: darkMode = Boolean($darkModeStore);
</script>

<div class:dark={darkMode}>
  <div class="flex flex-col min-h-screen dark:text-white">
    <Navbar />
    <Content />
  </div>
</div>
