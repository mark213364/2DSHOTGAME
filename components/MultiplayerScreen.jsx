import { useState } from 'react';
import Toast from './Toast';
import './MainMenu.css';

export default function MultiplayerScreen({ onNavigate }) {
  const [code, setCode] = useState('');
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [toast, setToast] = useState({ isVisible: false, message: '' });

  const showToast = (message) => {
    setToast({ isVisible: true, message });
  };

  const createGame = () => {
    const newCode = Math.floor(10000000 + Math.random() * 90000000).toString();
    onNavigate('game', { mode: 'multiplayer_wait', roomCode: newCode });
  };

  const joinGame = () => {
    if (code.length === 8) {
      onNavigate('game', { mode: 'multiplayer_wait', roomCode: code });
    } else {
      showToast('Введите 8-значный код!');
    }
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">МУЛЬТИПЛЕЕР</h1>
      
      <div className="menu-buttons">
        <button 
          className={`menu-btn ${hoveredBtn === 'create' ? 'selected' : ''}`}
          onMouseEnter={() => setHoveredBtn('create')}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={createGame}
        >
          {hoveredBtn === 'create' ? '> СОЗДАТЬ ИГРУ <' : 'СОЗДАТЬ ИГРУ'}
        </button>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <input 
            type="text" 
            placeholder="Введите код" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={8}
            style={{ 
              padding: '10px', textAlign: 'center', fontSize: '18px', 
              background: '#333', color: 'white', border: '1px solid #555', borderRadius: '5px' 
            }}
          />
          <button 
            className={`menu-btn ${hoveredBtn === 'join' ? 'selected' : ''}`}
            onMouseEnter={() => setHoveredBtn('join')}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={joinGame}
          >
            {hoveredBtn === 'join' ? '> ПРИСОЕДИНИТЬСЯ <' : 'ПРИСОЕДИНИТЬСЯ'}
          </button>
        </div>

        <button 
          className={`menu-btn ${hoveredBtn === 'back' ? 'selected' : ''}`}
          onMouseEnter={() => setHoveredBtn('back')}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={() => onNavigate('modeSelect')} 
          style={{ marginTop: '20px' }}
        >
          {hoveredBtn === 'back' ? '> НАЗАД <' : 'НАЗАД'}
        </button>
      </div>

      <Toast message={toast.message} isVisible={toast.isVisible} onClose={() => setToast({ ...toast, isVisible: false })} />
    </div>
  );
}
