<script>
  import { onMount } from 'svelte';
  import '../styles/Terminal.scss';

  export let onSkillsCommand = null;

  let commands = [
    { text: "> SYSTEM INITIALIZED", type: "system" },
    { text: "> WELCOME TO IC3PEAK_", type: "system" },
    { text: "> Type 'help' for available commands", type: "system" }
  ];
  let inputValue = '';
  let inputRef;
  let outputRef;

  const availableCommands = {
    help: "Available commands: help, clear, about, music, videos, skills",
    clear: () => { commands = []; },
    about: "IC3PEAK is a Russian electronic music duo known for their dark and experimental sound.",
    music: "Redirecting to music section...",
    videos: "Redirecting to videos section..."
  };

  function handleCommand(cmd) {
    const command = cmd.toLowerCase().trim();
    if (command === '') return;

    commands = [...commands, { text: `> ${cmd}`, type: "user" }];

    if (command === 'skills') {
      if (onSkillsCommand) onSkillsCommand();
      commands = [...commands, { text: "Compétences techniques :", type: "system" }];
      return;
    } else {
      if (onSkillsCommand) onSkillsCommand(false);
    }

    if (command in availableCommands) {
      const response = typeof availableCommands[command] === 'function'
        ? availableCommands[command]()
        : availableCommands[command];

      if (response) {
        commands = [...commands, { text: response, type: "system" }];
      }
    } else {
      commands = [...commands, {
        text: "Command not found. Type 'help' for available commands",
        type: "error"
      }];
    }
  }

  function addCommand(e) {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
      inputValue = '';
    }
  }

  // Scroll to bottom on new command (réaction Svelte)
  $: {
    if (outputRef) {
      outputRef.scrollTop = outputRef.scrollHeight;
    }
  }

  // Focus input on mount
  onMount(() => {
    if (inputRef) {
      inputRef.focus();
    }
  });
</script>

<div class="terminal">
  <div class="terminal-header">
    <div class="terminal-controls">
      <span class="control close"></span>
      <span class="control minimize"></span>
      <span class="control maximize"></span>
    </div>
    <div class="terminal-title">IC3PEAK_TERMINAL</div>
  </div>
  <div class="terminal-output" bind:this={outputRef}>
    {#each commands as cmd, i}
      <div class={`terminal-line ${cmd.type}`}>{cmd.text}</div>
    {/each}
  </div>
  <div class="terminal-input-container">
    <span class="prompt">$</span>
    <input
      bind:this={inputRef}
      type="text"
      class="terminal-input"
      bind:value={inputValue}
      on:keypress={addCommand}
      placeholder="Enter command..."
      autocomplete="off"
    />
  </div>
</div> 