<script>
  export let checked = false;
</script>

<div
  class="w-10 h-6 rounded-full bg-white relative flex items-center cursor-pointer shadow-inner"
  on:click
  on:click={() => (checked = !checked)}
>
  <input id="toggle" type="checkbox" class="hidden" bind:checked />

  <div
    class="switch w-4 h-4 rounded-full absolute border border-gray-500 transition-all duration-150 linear"
    class:left-1={!checked}
    class:left-5={checked}
    class:bg-white={!checked}
    class:bg-green-500={checked}
  />
</div>
