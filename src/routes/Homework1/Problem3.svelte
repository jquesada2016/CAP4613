<script>
  // Lifecycle
  import { onMount } from "svelte";

  // Components
  import Section from "../../components/Section.svelte";

  // MNIST dataset
  import mnist from "mnist";

  let canvasRef1: HTMLCanvasElement;
  let canvasRef2: HTMLCanvasElement;
  let canvasRef3: HTMLCanvasElement;

  let canvasRefs = [canvasRef1, canvasRef2, canvasRef3];

  // Get the number of samples

  $: {
    if (canvasRef1 && canvasRef2 && canvasRef3) {
      renderNumbers(canvasRef1.getContext("2d")!);
      renderNumbers(canvasRef2.getContext("2d")!);
      renderNumbers(canvasRef3.getContext("2d")!);
    }
  }

  function renderNumbers(c: CanvasRenderingContext2D) {
    const set = mnist.set(10, 10);

    const scale = 2;

    let i = 0;

    let offsetX = 0;
    let offsetY = 0;

    let number = 0;

    c.fillStyle = "#FFFFFF";

    for (let nY = 0; nY < 2; nY++) {
      offsetX = 0;
      offsetY = 28 * nY * scale;

      for (let nX = 0; nX < 5; nX++) {
        i = 0;
        offsetX = nX * 28 * scale;
        let digit = mnist[number].get();
        number++;

        for (let y = 0; y < 28; y++) {
          for (let x = 0; x < 28; x++) {
            if (Math.ceil(digit[i]))
              c.fillRect(
                x * scale + offsetX,
                y * scale + offsetY,
                1 * scale,
                1 * scale,
              );

            i++;
          }
        }
      }
    }
  }
</script>

<Section title="a)" headingLevel="h3">
  <div class="grid grid-cols-4 text-center">
    <p>Image size: 28x28 px</p>
    <p>Training: 60,000</p>
    <p>Testing: 10,000</p>
  </div>
</Section>

<Section title="b) & c)" headingLevel="h3">
  <div class="flex flex-col justify-center">
    <canvas
      bind:this={canvasRef1}
      width={28 * 10}
      height={28 * 4 * 1}
      class="bg-gray-900 rounded-xl border border-gray-200 p-4 mb-4"
    />
    <canvas
      bind:this={canvasRef2}
      width={28 * 10}
      height={28 * 4 * 1}
      class="bg-gray-900 rounded-xl border border-gray-200 p-4 mb-4"
    />
    <canvas
      bind:this={canvasRef3}
      width={28 * 10}
      height={28 * 4 * 1}
      class="bg-gray-900 rounded-xl border border-gray-200 p-4 mb-4"
    />
  </div>
</Section>

<Section title="d)" headingLevel="h3" open>
  <div class="grid grid-cols-2 text-center">
    <p>20% of training: {0.2 * 60_000}</p>
    <p>20% of testing: {0.2 * 10_000}</p>
  </div>
</Section>
