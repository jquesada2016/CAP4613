<script>
  // Components
  import Section from "../../components/Section.svelte";
  import Problem2 from "./Problem2.svelte";
  import Problem3 from "./Problem3.svelte";
</script>

<svelte:head>
  <title>Homework 1</title>
</svelte:head>

<h1 class="text-2xl text-center mb-8">Homework 1</h1>

<div class="flex flex-col justify-center">
  <Section title="Problem 2" headingLevel="h2" textSize="text-2xl" open>
    <Problem2 />
  </Section>
  <Section title="Problem 3" headingLevel="h2" textSize="text-2xl">
    <!-- <Problem3 /> -->
  </Section>
</div>
