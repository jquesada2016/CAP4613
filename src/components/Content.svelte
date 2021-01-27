<script>
  // Routing
  import { Router, Route, navigate } from "svelte-routing";

  // Components
  import Homework1 from "../routes/Homework1/Homework1.svelte";
</script>

<main class="dark:bg-gray-800 flex-grow p-4">
  <Router>
    <Route path="/">
      <h1 class="text-xl text-center mb-8">Welcom to Deep Learning!</h1>
      <div class="grid grid-cols-3 justify-items-center gap-4">
        <div
          class="border-2 border-green-500 rounded-3xl h-44 px-4 py-2 w-44 transform hover:scale-125 transition-all duration-200 hover:shadow-lg cursor-pointer"
          on:click={() => navigate("homework-1")}
        ><h2 class="font-bold cursor-pointer">Homework 1</h2></div>
      </div>
    </Route>
    <Route path="homework-1">
      <Homework1 />
    </Route>
  </Router>
</main>
