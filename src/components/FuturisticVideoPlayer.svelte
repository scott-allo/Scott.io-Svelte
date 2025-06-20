<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import '../styles/FuturisticVideoPlayer.scss';

  export let videoSrc = '/assets/E.V.E.mp4';
  export let title = "E.V.E - Présentation du Site";
  export let autoPlay = false;
  export let muted = true;

  let isPlaying = false;
  let isVisible = false;
  let volume = 0.5;
  let showControls = false;
  let videoLoaded = false;
  let error = null;

  let videoRef;
  let containerRef;
  let screenRef;

  onMount(() => {
    // Animation d'entrée
    gsap.fromTo(containerRef,
      { scale: 0.8, opacity: 0, rotationY: -45, transformOrigin: "center center" },
      {
        scale: 1, opacity: 1, rotationY: 0, duration: 1.5, ease: "power2.out",
        onComplete: () => {
          isVisible = true;
          if (autoPlay && videoRef) {
            setTimeout(() => {
              videoRef.play().catch(e => {
                error = 'Auto-play bloqué par le navigateur';
              });
            }, 500);
          }
        }
      }
    );
    // Animation continue du cadre
    gsap.to(screenRef, {
      boxShadow: "0 0 30px #0ff, 0 0 60px #f0f, inset 0 0 20px rgba(0,255,255,0.1)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  });

  function handlePlayPause() {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
        isPlaying = false;
      } else {
        videoRef.play().then(() => {
          isPlaying = true;
        }).catch(error_ => {
          error = 'Erreur de lecture: ' + error_.message;
          if (videoRef.muted) {
            videoRef.muted = false;
            videoRef.play().then(() => {
              isPlaying = true;
            }).catch(e => {
              error = 'Impossible de lancer la vidéo';
            });
          }
        });
      }
    }
  }

  function handleVideoClick() {
    handlePlayPause();
  }

  function handleVolumeChange(e) {
    const newVolume = parseFloat(e.target.value);
    volume = newVolume;
    if (videoRef) {
      videoRef.volume = newVolume;
      videoRef.muted = newVolume === 0;
    }
  }

  function toggleMute() {
    if (videoRef) {
      videoRef.muted = !videoRef.muted;
      if (videoRef.muted) {
        volume = 0;
      } else {
        volume = 0.5;
        videoRef.volume = 0.5;
      }
    }
  }

  function handleMouseEnter() {
    showControls = true;
  }

  function handleMouseLeave() {
    showControls = false;
  }

  function handleVideoLoad() {
    videoLoaded = true;
    error = null;
  }

  function handleVideoError() {
    error = 'Erreur de chargement de la vidéo';
    videoLoaded = false;
  }
</script>

<div
  class="futuristic-video-container"
  bind:this={containerRef}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <div class="launch-button-container" style="display: block;">
    <button
      class="launch-button"
      on:click={handlePlayPause}
      style="position: relative; z-index: 1000; background: rgba(255, 0, 0, 0.8); border: 2px solid red; color: white;"
    >
      <span class="launch-text">LANCER E.V.E (DEBUG)</span>
      <span class="launch-icon">🤖</span>
    </button>
    <button
      class="test-button"
      on:click={() => {
        if (videoRef) {
          console.log('Vidéo src:', videoRef.src);
          console.log('Vidéo readyState:', videoRef.readyState);
          console.log('Vidéo networkState:', videoRef.networkState);
          console.log('Vidéo error:', videoRef.error);
          console.log('Vidéo paused:', videoRef.paused);
          console.log('Vidéo muted:', videoRef.muted);
        }
      }}
      style="position: absolute; top: 120px; left: 50%; transform: translateX(-50%); background: rgba(255, 0, 0, 0.8); color: white; border: 1px solid red; padding: 5px 10px; border-radius: 5px; font-size: 12px; cursor: pointer; z-index: 1001;"
    >
      TEST VIDÉO
    </button>
  </div>

  <div class="video-screen-frame" bind:this={screenRef}>
    <div class="corner corner-tl"></div>
    <div class="corner corner-tr"></div>
    <div class="corner corner-bl"></div>
    <div class="corner corner-br"></div>
    <div class="scanlines"></div>
    <div class="video-content">
      <video
        bind:this={videoRef}
        src={videoSrc}
        on:click={handleVideoClick}
        class="futuristic-video"
        {muted}
        preload="metadata"
        on:play={() => isPlaying = true}
        on:pause={() => isPlaying = false}
        on:ended={() => isPlaying = false}
        on:loadedmetadata={() => { if (videoRef) videoRef.volume = volume; }}
        on:canplay={handleVideoLoad}
        on:error={handleVideoError}
      />
      <div class="video-overlay {showControls ? 'show' : ''}">
        <div class="video-title">{title}</div>
        <div class="video-controls">
          <button class="control-btn play-btn" on:click={handlePlayPause}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <div class="volume-controls">
            <button class="control-btn volume-btn" on:click={toggleMute}>
              {(videoRef?.muted || volume === 0) ? '🔇' : '🔊'}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              on:input={handleVolumeChange}
              class="volume-slider"
            />
          </div>
        </div>
      </div>
      <div class="status-indicators">
        <div class="status-dot recording"></div>
        <div class="status-dot live"></div>
        <div class="status-dot signal"></div>
      </div>
    </div>
    <div class="glitch-overlay"></div>
  </div>
  <div class="tech-info">
    <div class="info-line">SYSTEM: E.V.E_AI_CORE v2.1</div>
    <div class="info-line">STATUS: {isPlaying ? 'STREAMING' : 'STANDBY'}</div>
    <div class="info-line">SIGNAL: {isVisible ? 'OPTIMAL' : 'INITIALIZING'}</div>
    <div class="info-line">VOLUME: {Math.round(volume * 100)}%</div>
    <div class="info-line">LOADED: {videoLoaded ? 'YES' : 'NO'}</div>
    {#if error}
      <div class="info-line error">ERROR: {error}</div>
    {/if}
  </div>
</div> 