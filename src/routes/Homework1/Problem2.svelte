<script>
  // Lifecycle
  import { onMount } from "svelte";

  // Charts
  import Chart from "chart.js";

  // Colors
  import { darkModeStore } from "../../stores";
  import colors from "tailwindcss/colors";
  import { color } from "d3";

  $: darkMode = Boolean($darkModeStore);

  let C1 = [
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 2, y: 3 },
    { x: 1, y: 2 },
  ];

  let C2 = [
    { x: 1, y: 2 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ];

  let canvasRef: HTMLCanvasElement;

  const initChart = () => {
    const ctx = canvasRef.getContext("2d")!;

    return new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Class 1",
            data: C1,
            radius: 8,
            backgroundColor: colors.blue[500],
          },
          {
            label: "Class 2",
            data: C2,
            pointStyle: "triangle",
            radius: 15,
            backgroundColor: colors.amber[500],
          },
          {
            type: "line",
            label: "x-threshold",
            data: [
              { x: xTh, y: yMin },
              { x: xTh, y: yMax },
            ],
            borderColor: darkMode ? colors.white : colors.black,
            borderWidth: 1,
            pointRadius: 8,
            fill: false,
          },
          {
            type: "line",
            label: "y-threshold",
            data: [
              { x: xMin, y: yTh },
              { x: xMax, y: yTh },
            ],
            borderColor: darkMode ? colors.white : colors.black,
            borderWidth: 1,
            pointRadius: 8,
            fill: false,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontColor: darkMode ? colors.gray[200] : colors.gray[800],
            filter: (item) =>
              item.datasetIndex !== 2 && item.datasetIndex !== 3,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                zeroLineColor: darkMode ? colors.gray[200] : colors.gray[800],
              },
              ticks: {
                beginAtZero: darkMode ? colors.gray[200] : colors.gray[800],
                fontColor: darkMode ? colors.gray[200] : colors.gray[800],
                min: xMin,
                max: xMax,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                zeroLineColor: darkMode ? colors.gray[200] : colors.gray[800],
              },
              ticks: {
                beginAtZero: true,
                fontColor: darkMode ? colors.gray[200] : colors.gray[800],
                min: yMin,
                max: yMax,
              },
            },
          ],
        },
      },
    });
  };

  let chartRef: Chart;

  $: {
    $darkModeStore;

    try {
      chartRef = initChart();
    } catch (e) {}
  }

  onMount(() => {
    chartRef = initChart();
  });

  let xMin = 0;
  let xMax = 4;

  let yMin = 0;
  let yMax = 4;

  let xTh = 1.5;
  let yTh = 1.5;

  let c1Accuracy = 0;
  let c2Accuracy = 0;
  let accuracy = 0;
  let c1Count = 0;
  let c2Count = 0;

  $: {
    try {
      // Update x-axis threshold
      chartRef.data.datasets[2].data[0].x = xTh;
      chartRef.data.datasets[2].data[1].x = xTh;

      // Update y-axis threshold
      chartRef.data.datasets[3].data[0].y = yTh;
      chartRef.data.datasets[3].data[1].y = yTh;

      chartRef.update();
    } catch (e) {}

    // Reset counters
    c1Count = 0;
    c2Count = 0;

    // Count C1 correct classification
    C1.map((point) => {
      if (point.x >= xTh && point.y >= yTh) c1Count++;
    });

    // Count C2 correct classification
    C2.map((point) => {
      if (point.x <= xTh || point.y <= yTh) c2Count++;
    });

    accuracy = (c1Count + c2Count) / (C1.length + C2.length);
  }

  let newX: number;
  let newY: number;
</script>

<div class="flex flex-col items-center">
  <div
    class="bg-gray-200 dark:bg-gray-900 shadow-lg rounded-2xl relative"
    style="width: 80vw;"
  >
    <canvas bind:this={canvasRef} />
  </div>

  <div class="w-full">
    <h3 class="text-xl p-4 text-center">Configure Classification</h3>

    <label for="">x-axis</label>
    <input
      type="range"
      class="w-full"
      bind:value={xTh}
      min={xMin}
      max={xMax}
      step={0.01}
    />
    <label for="">y-axis</label>
    <input
      type="range"
      class="w-full"
      bind:value={yTh}
      min={xMin}
      max={xMax}
      step={0.01}
    />

    <div class="flex justify-around w-full mb-4">
      <p>x-threshold: {xTh}</p>
      <p>y-threshold: {yTh}</p>
    </div>

    <div class="mb-4">
      <p class="text-xl">Add new data</p>
      <div class="flex flex-col md:flex-row justify-between mt-2">
        <label for=""
          >x: <input
            type="number"
            class="w-16 bg-gray-200 dark:bg-gray-900 border border-black dark:border-white rounded-full px-2 ml-2"
            bind:value={newX}
          /></label
        >

        <label for="" class="w-64"
          >y: <input
            type="number"
            class="w-16 bg-gray-200 dark:bg-gray-900 border border-black dark:border-white rounded-full px-2 ml-2"
            bind:value={newY}
          /></label
        >
        <button
          class="px-2 py-1 rounded-full border-green-500 border"
          on:click={() => {
            if (newX === undefined || newY === undefined)
              alert("You must enter valid points for both x and y!");

            if (newX >= xTh && newY >= yTh) {
              C1.push({ x: newX, y: newY });
              C1 = C1;
            } else C2.push({ x: newX, y: newY });
            {
              chartRef.update();
              C2 = C2;
            }
          }}>Add sample</button
        >
      </div>
    </div>

    <div class="flex justify-around text-xl mb-8 text-center">
      <p>Results:</p>
      <p>Class 1: {c1Count}/{C1.length}</p>
      <p>Class 2: {c2Count}/{C2.length}</p>
      <p>Overall: {Math.round(accuracy * 100)}%</p>
    </div>
    <p class="text-3xl">Best possible %: 86</p>
  </div>
</div>
