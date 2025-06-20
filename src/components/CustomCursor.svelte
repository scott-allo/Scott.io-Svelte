<script>
  import { onMount, onDestroy } from 'svelte';
  import '../styles/CustomCursor.scss';

  let cursorRef;

  function moveCursor(e) {
    if (cursorRef) {
      cursorRef.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }
  }

  onMount(() => {
    document.addEventListener('mousemove', moveCursor);
  });

  onDestroy(() => {
    document.removeEventListener('mousemove', moveCursor);
  });
</script>

<div class="custom-cursor" bind:this={cursorRef}></div>