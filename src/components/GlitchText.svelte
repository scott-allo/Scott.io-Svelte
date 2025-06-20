<script>
  export let text = '';
  export let fontSize = '2rem';
  export let className = '';
</script>

<div class={`glitch-text-container ${className}`} style="font-size: {fontSize};">
  <div class="glitch-text-original">{text}</div>
</div>