import { useState } from 'react';
import MainMenu from './components/MainMenu';
import HelpScreen from './components/HelpScreen';
import GameScreen from './components/GameScreen'; // <-- Вернули импорт

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');

  return (
    <div style={{ 
      height: '100dvh', 
      width: '100vw', 
      overflow: 'hidden',
      backgroundColor: '#1a1a1a',
      position: 'relative'
    }}>
      {currentScreen === 'menu' && (
        <div className="screen-fade">
          <MainMenu onNavigate={setCurrentScreen} />
        </div>
      )}
      
      {currentScreen === 'help' && (
        <div className="screen-fade">
          <HelpScreen onNavigate={setCurrentScreen} />
        </div>
      )}

      {currentScreen === 'game' && (
        <div className="screen-fade">
          <GameScreen onNavigate={setCurrentScreen} />
        </div>
      )}
    </div>
  );
}
