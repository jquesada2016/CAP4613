import { writable } from "svelte/store";

// If first time, load dark theme
if (localStorage.getItem("dark") === null) localStorage.setItem("dark", "1");

export const darkModeStore = writable<string | null>(
  localStorage.getItem("dark"),
);
