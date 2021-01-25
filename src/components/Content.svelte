<script>
  import { Router, Route, navigate } from "svelte-routing";
</script>

<main class="bg-gray-800 flex-grow p-4">
  <Router>
    <Route path="/">
      <div class="grid grid-cols-3 justify-items-center gap-4 pt-8">
        <div
          class="border-2 border-green-500 rounded-3xl h-44 px-4 py-2 w-44 transform hover:scale-125 transition-all duration-200"
        >Homework 1</div>
      </div>
    </Route>
  </Router>
</main>
