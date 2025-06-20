<script>
  import { onMount, tick } from 'svelte';
  import GlitchText from '../components/GlitchText.svelte';
  import DistortionEffect from '../components/DistortionEffect.svelte';
  import { gsap } from 'gsap';

  export let enableAudio;

  let linksRef = [];
  let isReady = false;

  // Initialisation des refs après le rendu
  onMount(async () => {
    await tick();
    if (linksRef.every(link => link !== null)) {
      isReady = true;
      animateLinks();
      startGlitchInterval();
    }
  });

  function animateLinks() {
    gsap.from(linksRef, {
      duration: 1.5,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: "back.out"
    });
  }

  let glitchInterval;
  function startGlitchInterval() {
    glitchInterval = setInterval(() => {
      if (Math.random() > 0.7 && linksRef) {
        const randomLink = linksRef[Math.floor(Math.random() * linksRef.length)];
        if (randomLink) {
          gsap.to(randomLink, {
            duration: 0.1,
            x: (Math.random() - 0.5) * 20,
            y: (Math.random() - 0.5) * 20,
            color: ['#0ff', '#f0f', '#fff'][Math.floor(Math.random() * 3)],
            onComplete: () => {
              if (randomLink) {
                gsap.to(randomLink, {
                  duration: 0.3,
                  x: 0,
                  y: 0,
                  color: '#fff'
                });
              }
            }
          });
        }
      }
    }, 3000);
  }

  // Nettoyage à la destruction du composant
  onDestroy(() => {
    if (glitchInterval) clearInterval(glitchInterval);
  });

  function handleMouseEnter(index) {
    if (linksRef[index]) {
      gsap.to(linksRef[index], {
        color: '#0ff',
        duration: 0.3,
        textShadow: '0 0 10px #0ff'
      });
    }
  }

  function handleMouseLeave(index) {
    if (linksRef[index]) {
      gsap.to(linksRef[index], {
        color: '#fff',
        duration: 0.3,
        textShadow: 'none'
      });
    }
  }

  function handleFooterMouseEnter(e) {
    gsap.to(e.target, {
      color: '#f0f',
      duration: 0.2
    });
  }

  function handleFooterMouseLeave(e) {
    gsap.to(e.target, {
      color: '#fff',
      duration: 0.5
    });
  }

  const mainLinks = ['MUSIC', 'VIDEOS', 'TOUR', 'STORE'];
  const footerLinks = [
    { label: 'INSTAGRAM', href: '#' },
    { label: 'TELEGRAM', href: '#' },
    { label: 'YOUTUBE', href: '#' },
    { label: 'CONTACT', href: '#' }
  ];
</script>

<div class="home-page" on:click={enableAudio}>
  <DistortionEffect intensity={0.5} />

  <div class="main-content">
    <GlitchText text="IC3PEAK" fontSize="6rem" class="main-title" />

    <div class="links-container">
      {#each mainLinks as link, i}
        <div
          bind:this={el => linksRef[i] = el}
          class="glitch-link"
          on:mouseenter={() => handleMouseEnter(i)}
          on:mouseleave={() => handleMouseLeave(i)}
        >
          {link}
        </div>
      {/each}
    </div>
  </div>

  <div class="footer">
    {#each footerLinks as { label, href }}
      <a
        href={href}
        class="footer-link"
        on:mouseenter={handleFooterMouseEnter}
        on:mouseleave={handleFooterMouseLeave}
      >
        {label}
      </a>
    {/each}
  </div>
</div>