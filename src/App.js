import React from 'react';
import './App.css';

import { Game } from './core/game/Game';
import { getGameCommandHandler } from './core/game/commandHandler';
import { Architecture } from './demonstrate/Architecture';

import { eventSourceProvider } from './infrastructure/eventSource';

const eventSource = eventSourceProvider();
const gameCommandHandler = getGameCommandHandler(eventSource);

function App() {
  return (
	  <div>
	  <Architecture
             source={eventSource}
	  />
	  </div>
  );
}

export default App;
