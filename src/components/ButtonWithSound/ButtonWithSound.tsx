import React, { useRef } from 'react';

import clickSound from './assets/click.mp3';

function ButtonWithSound() {
  const audioRef = useRef(new Audio(clickSound));

  const playClickSound = () => {
    audioRef.current.play();
  };

  return <button onClick={playClickSound}>Clique aqui para reproduzir um som!</button>;
}

export default ButtonWithSound;
