import { useState, useEffect } from 'react';
import './GameScreen.css';

export default function GameScreen({ onNavigate }) {
  const [playerHp, setPlayerHp] = useState(6);
  const [enemyHp, setEnemyHp] = useState(6);
  const [turn, setTurn] = useState('player');
  
  const [cases, setCases] = useState([1, 1, 1]); // 1 = закрыт, 0 = открыт
  const [showSurrenderModal, setShowSurrenderModal] = useState(false);

  const [shells, setShells] = useState([]);
  const [currentShell, setCurrentShell] = useState(null);

  useEffect(() => {
    const newShells = [...Array(3).fill('live'), ...Array(3).fill('blank')].sort(() => Math.random() - 0.5);
    setShells(newShells);
    setCurrentShell(newShells[0]);
  }, []);

  const handleShoot = (target) => {
    if (turn !== 'player' || shells.length === 0) return;

    const isLive = currentShell === 'live';
    
    if (isLive) {
      if (target === 'self') {
        setPlayerHp(prev => Math.max(0, prev - 1));
      } else {
        setEnemyHp(prev => Math.max(0, prev - 1));
      }
    }

    const newShells = shells.slice(1);
    setShells(newShells);
    
    if (newShells.length === 0) {
      setTimeout(() => {
        const reloaded = [...Array(3).fill('live'), ...Array(3).fill('blank')].sort(() => Math.random() - 0.5);
        setShells(reloaded);
        setCurrentShell(reloaded[0]);
        // Здесь можно добавить логику открытия кейса (например, cases[0] = 0)
      }, 1000);
    } else {
      setCurrentShell(newShells[0]);
    }

    setTurn('enemy');
    setTimeout(() => setTurn('player'), 2000);
  };

  const handleItemDoubleClick = (itemName, index, side) => {
    console.log(`Использован предмет: ${itemName} из ${side} сетки, слот ${index}`);
  };

  const confirmSurrender = () => {
    onNavigate('menu');
  };

  return (
    <div className="game-container">
      {/* Модальное окно */}
      {showSurrenderModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Вы уверены, что хотите сдаться?</h3>
            <div className="modal-buttons">
              <button onClick={confirmSurrender}>Да</button>
              <button onClick={() => setShowSurrenderModal(false)}>Нет</button>
            </div>
          </div>
        </div>
      )}

      {/* Верхняя панель */}
      <div className="game-hud">
        <button className="surrender-btn" onClick={() => setShowSurrenderModal(true)}>
          Сдаться
        </button>
        <div className="hud-stats">
          <div className="hud-player">
            <span className="hud-label">ВЫ</span>
            <div className="hp-bar">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`hp-segment ${i < playerHp ? 'filled' : ''}`}></div>
              ))}
            </div>
          </div>
          <div className="hud-enemy">
            <span className="hud-label">ВРАГ</span>
            <div className="hp-bar">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`hp-segment ${i < enemyHp ? 'filled enemy' : ''}`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Игровое поле */}
      <div className="game-arena">
        <div className="turn-indicator">
          {turn === 'player' ? 'ВАШ ХОД' : 'ХОД ВРАГА'}
        </div>
        
        <div className="shotgun-display">
          [ ДРОБОВИК ]
        </div>
        
        <div className="ammo-info">
          Текущий: {currentShell === 'live' ? '🔴 Боевой' : '⚪ Холостой'}
        </div>
      </div>

      {/* Кнопки выстрелов */}
      <div className="action-bar">
        <button className="action-btn" onClick={() => handleShoot('self')} disabled={turn !== 'player'}>В СЕБЯ</button>
        <button className="action-btn" onClick={() => handleShoot('enemy')} disabled={turn !== 'player'}>В ВРАГА</button>
      </div>

      {/* НОВАЯ ПАНЕЛЬ ПРЕДМЕТОВ И КЕЙСА */}
      <div className="bottom-panel">
        {/* Левая сетка предметов (2x2) */}
        <div className="items-grid left-grid">
          {[1, 2, 3, 4].map((id) => (
            <div key={`left-${id}`} className="item-slot" onDoubleClick={() => handleItemDoubleClick('Предмет', id, 'left')}>
              {/* Сюда потом вставим иконки */}
            </div>
          ))}
        </div>

        {/* Центральный кейс */}
        <div className="case-center" onClick={() => console.log('Клик по кейсу')}>
          <div className="case-icon">📦</div>
          <div className="case-count">{cases.filter(c => c === 1).length}</div>
        </div>

        {/* Правая сетка предметов (2x2) */}
        <div className="items-grid right-grid">
          {[1, 2, 3, 4].map((id) => (
            <div key={`right-${id}`} className="item-slot" onDoubleClick={() => handleItemDoubleClick('Предмет', id, 'right')}>
              {/* Сюда потом вставим иконки */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
