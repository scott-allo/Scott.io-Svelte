<script>
  import { onMount, onDestroy } from 'svelte';
  import { Howl } from 'howler';

  export let enabled = false;

  let sound = null;
  let handleFirstInteraction;

  onMount(() => {
    if (enabled && !sound) {
      sound = new Howl({
        src: ['/assets/audio/ambient.mp3'],
        loop: true,
        volume: 0.3,
        onplayerror: function() {
          sound.once('unlock', function() {
            sound.play();
          });
        }
      });

      // Démarrage avec interaction utilisateur
      handleFirstInteraction = () => {
        sound.play();
        document.removeEventListener('click', handleFirstInteraction);
      };

      document.addEventListener('click', handleFirstInteraction);
    }
  });

  $: if (!enabled && sound) {
    sound.stop();
    sound = null;
  }

  onDestroy(() => {
    if (sound) {
      sound.stop();
      sound = null;
    }
    document.removeEventListener('click', handleFirstInteraction);
  });
</script>