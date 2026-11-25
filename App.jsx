import { useState } from 'react';
import MainMenu from './components/MainMenu';
import HelpScreen from './components/HelpScreen';
import GameScreen from './components/GameScreen';
import ModeSelect from './components/ModeSelect';
import MultiplayerScreen from './components/MultiplayerScreen';

export default function App() {
  // Текущий активный экран
  const [currentScreen, setCurrentScreen] = useState('menu');
  
  // Режим игры ('bot' или 'multiplayer'), передается в GameScreen
  const [gameMode, setGameMode] = useState('bot');

  // Универсальная функция навигации
  const handleNavigate = (screen, options = {}) => {
    // Если переходим в игру и передан режим — сохраняем его
    if (screen === 'game' && options?.mode) {
      setGameMode(options.mode);
    }
    setCurrentScreen(screen);
  };

  return (
    <div style={{ 
      height: '100dvh', 
      width: '100vw', 
      overflow: 'hidden',
      backgroundColor: '#1a1a1a',
      position: 'relative'
    }}>
      {/* Главное меню */}
      {currentScreen === 'menu' && (
        <div className="screen-fade">
          <MainMenu onNavigate={handleNavigate} />
        </div>
      )}
      
      {/* Экран помощи */}
      {currentScreen === 'help' && (
        <div className="screen-fade">
          <HelpScreen onNavigate={handleNavigate} />
        </div>
      )}

      {/* Экран выбора режима (Против бота / Против игрока) */}
      {currentScreen === 'modeSelect' && (
        <div className="screen-fade">
          <ModeSelect onNavigate={handleNavigate} />
        </div>
      )}

      {/* Экран мультиплеера (Создать / Присоединиться) */}
      {currentScreen === 'multiplayer' && (
        <div className="screen-fade">
          <MultiplayerScreen onNavigate={handleNavigate} />
        </div>
      )}

      {/* Экран самой игры */}
      {currentScreen === 'game' && (
        <div className="screen-fade">
          <GameScreen onNavigate={handleNavigate} mode={gameMode} />
        </div>
      )}
    </div>
  );
}
