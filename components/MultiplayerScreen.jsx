import { useState } from 'react';
import './MainMenu.css';

export default function MultiplayerScreen({ onNavigate }) {
  const [code, setCode] = useState('');

  const createGame = () => {
    const newCode = Math.floor(10000000 + Math.random() * 90000000).toString();
    alert(`Игра создана! Код для друга: ${newCode}\n(Сейчас работает только создание, сетевой код добавим позже)`);
  };

  const joinGame = () => {
    if (code.length === 8) {
      alert(`Подключение к игре ${code}... (Функция в разработке)`);
    } else {
      alert('Введите 8-значный код');
    }
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">МУЛЬТИПЛЕЕР</h1>
      
      <div className="menu-buttons">
        <button className="menu-btn" onClick={createGame}>
          СОЗДАТЬ ИГРУ
        </button>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <input 
            type="text" 
            placeholder="Введите код" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={8}
            style={{ 
              padding: '10px', 
              textAlign: 'center', 
              fontSize: '18px', 
              background: '#333', 
              color: 'white', 
              border: '1px solid #555', 
              borderRadius: '5px' 
            }}
          />
          <button className="menu-btn" onClick={joinGame}>
            ПРИСОЕДИНИТЬСЯ
          </button>
        </div>

        <button className="menu-btn" onClick={() => onNavigate('modeSelect')} style={{ marginTop: '20px' }}>
          НАЗАД
        </button>
      </div>
    </div>
  );
}
