<script>
  import { onMount, onDestroy } from 'svelte';
  export let intensity = 0.5;

  let canvas;
  let animationFrameId;
  let time = 0;

  function resize() {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }

  function animate(now) {
    time = now * 0.001; // Convertir en secondes
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const y = Math.floor(i / 4 / canvas.width);
      const scanline = Math.sin(y * 0.1 + time * 2) * 0.1;
      const noise = Math.random() * intensity;
      const value = (noise + scanline) * 255;

      data[i] = value;     // R
      data[i + 1] = value; // G
      data[i + 2] = value; // B
      data[i + 3] = 15;    // A (très transparent)
    }

    ctx.putImageData(imageData, 0, 0);
    animationFrameId = requestAnimationFrame(animate);
  }

  onMount(() => {
    resize();
    window.addEventListener('resize', resize);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  });

  onDestroy(() => {
    window.removeEventListener('resize', resize);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });
</script>

<canvas
  bind:this={canvas}
  style="
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 1;
    opacity: 0.3;
    mix-blend-mode: overlay;
  "
></canvas>