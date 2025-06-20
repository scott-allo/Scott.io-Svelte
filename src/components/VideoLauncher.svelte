<script>
  import { onMount, onDestroy } from 'svelte';
  import '../styles/VideoLauncher.scss';

  export let forceOpen = false;
  export let onClose = null;

  let isPlaying = false;
  let videoRef;

  // Gère l'ouverture forcée
  $: if (forceOpen) {
    isPlaying = true;
    if (videoRef) {
      videoRef.play();
    }
  }

  function toggleVideo() {
    if (isPlaying) {
      videoRef?.pause();
      isPlaying = false;
      if (onClose) onClose();
    } else {
      videoRef?.play();
      isPlaying = true;
    }
  }

  function handleEnded() {
    isPlaying = false;
    if (onClose) onClose();
  }
</script>

<div class="video-launcher-container">
  <button 
    class="cyber-button-debug"
    on:click={toggleVideo}
    aria-label={isPlaying ? "Pause video" : "Play video"}
  >
    {isPlaying ? '◼ STOP' : '▶ PLAY E.V.E'}
    <span class="cyber-button__glitch">▶_</span>
    <span class="cyber-button__tag">R25</span>
  </button>

  {#if isPlaying}
    <div class="futuristic-video-overlay">
      <video
        bind:this={videoRef}
        src="/assets/E.V.E.mp4"
        class="glitch-video"
        controls={false}
        loop={false}
        on:ended={handleEnded}
      />
      <div class="video-controls">
        <button on:click={toggleVideo} class="control-button">⏹</button>
        <div class="video-timecode">00:00</div>
      </div>
      <div class="video-noise-overlay"></div>
      <div class="video-scanlines"></div>
    </div>
  {/if}
</div>