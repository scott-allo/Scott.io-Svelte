<script>
  import { writable } from 'svelte/store';
  import '../styles/Navigation.scss';

  // Liste des liens
  const links = ['INSTAGRAM', 'TELEGRAM', 'YOUTUBE', 'CONTACT'];

  // État local pour le lien actif
  let activeLink = '';

  function handleMouseEnter(link) {
    activeLink = link;
  }

  function handleMouseLeave() {
    activeLink = '';
  }
</script>

<nav class="cyber-nav">
  <div class="nav-glitch-container">
    {#each links as link}
      <a
        href="/{link.toLowerCase()}"
        class="nav-link {activeLink === link ? 'active' : ''}"
        on:mouseenter={() => handleMouseEnter(link)}
        on:mouseleave={handleMouseLeave}
        data-text={link}
      >
        {link}
        <div class="glitch-effect"></div>
      </a>
    {/each}
  </div>
  <div class="nav-scanner"></div>
</nav> 