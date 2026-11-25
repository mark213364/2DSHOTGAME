import { useState } from 'react';
import MainMenu from './components/MainMenu';
import HelpScreen from './components/HelpScreen';
import GameScreen from './components/GameScreen';
import ModeSelect from './components/ModeSelect';
import MultiplayerScreen from './components/MultiplayerScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [gameMode, setGameMode] = useState('bot');
  
  // Состояние для эффекта затемнения
  const [isFading, setIsFading] = useState(false);
  // Состояние для хранения следующего экрана
  const [nextScreen, setNextScreen] = useState(null);

  const handleNavigate = (screen, options = {}) => {
    // Если переход на тот же экран - ничего не делаем
    if (screen === currentScreen) return;

    // Запоминаем, куда хотим перейти
    setNextScreen({ screen, options });
    // Включаем затемнение
    setIsFading(true);

    // Ждем 500мс (половина анимации - затемнение)
    setTimeout(() => {
      // Меняем экран
      if (options?.mode) setGameMode(options.mode);
      setCurrentScreen(screen);
      
      // Ждем еще 50мс, чтобы новый экран успел отрендериться в темноте
      setTimeout(() => {
        // Выключаем затемнение (экран плавно проявляется)
        setIsFading(false);
      }, 50);
    }, 500);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'menu': return <MainMenu onNavigate={handleNavigate} />;
      case 'help': return <HelpScreen onNavigate={handleNavigate} />;
      case 'modeSelect': return <ModeSelect onNavigate={handleNavigate} />;
      case 'multiplayer': return <MultiplayerScreen onNavigate={handleNavigate} />;
      case 'game': return <GameScreen onNavigate={handleNavigate} mode={gameMode} />;
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
      {/* Текущий экран */}
      <div className="screen-fade">
        {renderScreen()}
      </div>

      {/* Оверлей затемнения */}
      <div 
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: '#000',
          pointerEvents: isFading ? 'all' : 'none', // Блокируем клики во время затемнения
          opacity: isFading ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          zIndex: 9999 // Поверх всего
        }}
      />
    </div>
  );
}
