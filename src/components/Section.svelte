<script>
  // Icons
  import Icon from "fa-svelte";
  import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
  import { slide } from "svelte/transition";

  export let headingLevel: string = "h1";
  export let title: string;
  export let textSize: string = "";
  export let open = false;

  $: headingHTML = `<${headingLevel} class="${textSize} cursor-pointer">${title}</${headingLevel}>`;
</script>

<section class="w-full mb-8">
  <div class="flex items-center cursor-pointer" on:click={() => (open = !open)}>
    {@html headingHTML}

    <div
      class="flex-grow border border-gray-800 dark:border-gray-200 h-0 mx-4"
    />

    <div
      class="transform transition-transform duration-300"
      class:rotate-180={open}
    >
      <Icon icon={faChevronDown} />
    </div>
  </div>

  {#if open}
    <div transition:slide class="pl-4">
      <slot />
    </div>
  {/if}
</section>
