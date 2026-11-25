import { useState } from 'react';
import MainMenu from './components/MainMenu';
import HelpScreen from './components/HelpScreen';

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

      {/* ТЕСТОВЫЙ ЭКРАН ВМЕСТО ИГРЫ */}
      {currentScreen === 'game' && (
        <div className="screen-fade" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
          <h1 style={{ color: '#ff3333', fontSize: '32px' }}>ТЕСТ: ЭКРАН ИГРЫ РАБОТАЕТ</h1>
          <button 
            onClick={() => setCurrentScreen('menu')}
            style={{ marginTop: '20px', padding: '10px 20px', background: 'none', border: '1px solid #555', color: 'white', borderRadius: '5px' }}
          >
            Назад в меню
          </button>
        </div>
      )}
    </div>
  );
}
