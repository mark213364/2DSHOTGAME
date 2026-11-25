import { useState } from 'react';
import MainMenu from './components/MainMenu';
import HelpScreen from './components/HelpScreen';
import GameScreen from './components/GameScreen';
import ModeSelect from './components/ModeSelect';
import MultiplayerScreen from './components/MultiplayerScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [gameMode, setGameMode] = useState('bot');
  const [roomCode, setRoomCode] = useState(null); // Код комнаты для мультиплеера
  const [isFading, setIsFading] = useState(false);

  const handleNavigate = (screen, options = {}) => {
    if (screen === currentScreen) return;
    
    setIsFading(true);

    setTimeout(() => {
      if (options?.mode) setGameMode(options.mode);
      if (options?.roomCode) setRoomCode(options.roomCode);
      setCurrentScreen(screen);
      
      setTimeout(() => setIsFading(false), 50);
    }, 500);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'menu': return <MainMenu onNavigate={handleNavigate} />;
      case 'help': return <HelpScreen onNavigate={handleNavigate} />;
      case 'modeSelect': return <ModeSelect onNavigate={handleNavigate} />;
      case 'multiplayer': return <MultiplayerScreen onNavigate={handleNavigate} />;
      case 'game': return <GameScreen onNavigate={handleNavigate} mode={gameMode} roomCode={roomCode} />;
      default: return <MainMenu onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ 
      height: '100dvh', 
      width: '100vw', 
      overflow: 'hidden',
      backgroundColor: '#1a1a1a',
      position: 'relative'
    }}>
      <div className="screen-fade">
        {renderScreen()}
      </div>

      {/* Оверлей затемнения */}
      <div 
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: '#000',
          pointerEvents: isFading ? 'all' : 'none',
          opacity: isFading ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          zIndex: 9999
        }}
      />
    </div>
  );
}
