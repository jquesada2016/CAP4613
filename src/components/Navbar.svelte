<script>
  // Components
  import Icon from "fa-svelte";
  import Switch from "./Switch.svelte";

  // Icons
  import { faAdjust } from "@fortawesome/free-solid-svg-icons";

  // stores
  import { darkModeStore } from "../stores";

  let darkMode = Boolean($darkModeStore);

  // Save to localStorage and update the store
  $: {
    localStorage.setItem("dark", darkMode ? "1" : "");
    $darkModeStore = darkMode ? "1" : "";
  }
</script>

<header class="h-14 flex items-center p-4 bg-gray-300 dark:bg-gray-500">
  <h1 class="font-bold text-xl flex-grow">Jose Quesada</h1>

  <div class="mr-2">
    <Icon icon={faAdjust} />
  </div>
  <Switch bind:checked={darkMode} />
</header>
