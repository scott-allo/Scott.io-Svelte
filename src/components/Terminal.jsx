import { useState, useRef, useEffect } from 'react';

function Terminal({ onSkillsCommand }) {
  const [commands, setCommands] = useState([
    { text: "> SYSTEM INITIALIZED", type: "system" },
    { text: "> WELCOME TO IC3PEAK_", type: "system" },
    { text: "> Type 'help' for available commands", type: "system" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const availableCommands = {
    help: "Available commands: help, clear, about, music, videos, skills",
    clear: () => setCommands([]),
    about: "IC3PEAK is a Russian electronic music duo known for their dark and experimental sound.",
    music: "Redirecting to music section...",
    videos: "Redirecting to videos section..."
  };

  const handleCommand = (cmd) => {
    const command = cmd.toLowerCase().trim();
    
    if (command === '') return;

    setCommands(prev => [...prev, { text: `> ${cmd}`, type: "user" }]);

    if (command === 'skills') {
      if (onSkillsCommand) onSkillsCommand();
      setCommands(prev => [...prev, { text: "Compétences techniques :", type: "system" }]);
      return;
    } else {
      if (onSkillsCommand) onSkillsCommand(false);
    }

    if (command in availableCommands) {
      const response = typeof availableCommands[command] === 'function' 
        ? availableCommands[command]() 
        : availableCommands[command];
      
      if (response) {
        setCommands(prev => [...prev, { text: response, type: "system" }]);
      }
    } else {
      setCommands(prev => [...prev, { 
        text: "Command not found. Type 'help' for available commands", 
        type: "error" 
      }]);
    }
  };

  const addCommand = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [commands]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-controls">
          <span className="control close"></span>
          <span className="control minimize"></span>
          <span className="control maximize"></span>
        </div>
        <div className="terminal-title">IC3PEAK_TERMINAL</div>
      </div>
      <div className="terminal-output" ref={outputRef}>
        {commands.map((cmd, i) => (
          <div key={i} className={`terminal-line ${cmd.type}`}>
            {cmd.text}
          </div>
        ))}
      </div>
      <div className="terminal-input-container">
        <span className="prompt">$</span>
        <input 
          ref={inputRef}
          type="text" 
          className="terminal-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={addCommand}
          placeholder="Enter command..."
        />
      </div>
    </div>
  );
}

export default Terminal; 