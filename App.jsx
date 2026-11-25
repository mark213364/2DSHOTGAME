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
      backgroundColor: '#1a1a1a'
    }}>
      {currentScreen === 'menu' && (
        <MainMenu onNavigate={setCurrentScreen} />
      )}
      
      {currentScreen === 'help' && (
        <HelpScreen onNavigate={setCurrentScreen} />
      )}
    </div>
  );
}
