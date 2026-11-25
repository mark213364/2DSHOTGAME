import { useState, useEffect } from 'react';
import './GameScreen.css';

export default function GameScreen({ onNavigate }) {
  const [playerHp, setPlayerHp] = useState(6);
  const [enemyHp, setEnemyHp] = useState(6);
  const [turn, setTurn] = useState('player');
  
  // Кейсы (3 штуки)
  const [cases, setCases] = useState([1, 1, 1]); // 1 = закрыт
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
        // Здесь можно добавить логику открытия кейса после раунда
      }, 1000);
    } else {
      setCurrentShell(newShells[0]);
    }

    setTurn('enemy');
    setTimeout(() => setTurn('player'), 2000);
  };

  // Двойной клик для использования предмета
  const handleItemDoubleClick = (itemName) => {
    console.log(`Использован предмет: ${itemName}`);
    // Здесь будет логика применения предмета
  };

  const confirmSurrender = () => {
    onNavigate('menu');
  };

  return (
    <div className="game-container">
      {/* Модальное окно подтверждения сдачи */}
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

      {/* Верхняя панель с кнопкой "Сдаться" */}
      <div className="game-hud">
        <button className="surrender-btn" onClick={() => setShowSurrenderModal(true)}>
          Сдаться
        </button>
        <div className="hud-stats">
          <div className="hud-player">
            <span className="hud-label">ВЫ</span>
            <div className="hp-bar">
              {/* Деления для здоровья (6 штук) */}
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

      {/* Кейсы внизу (вместо выстрелов) */}
      <div className="cases-bar">
        <span className="cases-label">Кейсы:</span>
        {cases.map((c, i) => (
          <div key={i} className={`case-icon ${c === 0 ? 'opened' : ''}`}>
            {c === 1 ? '📦' : '📭'}
          </div>
        ))}
      </div>

      {/* Кнопки выстрелов */}
      <div className="action-bar">
        <button className="action-btn" onClick={() => handleShoot('self')} disabled={turn !== 'player'}>В СЕБЯ</button>
        <button className="action-btn" onClick={() => handleShoot('enemy')} disabled={turn !== 'player'}>В ВРАГА</button>
      </div>

      {/* Панель предметов с двойным кликом */}
      <div className="items-bar">
        <div className="items-grid">
          {['Пиво', 'Лупа', 'Сигарета', 'Пила', 'Наручники', 'Телефон'].map(item => (
            <div 
              key={item} 
              className="item-slot"
              onDoubleClick={() => handleItemDoubleClick(item)}
              // Для мобильных устройств используем onTouchEnd для двойного тапа
              onClick={(e) => {
                // Простая имитация двойного тапа для мобильных
                if (e.detail === 2) handleItemDoubleClick(item);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
