import { useState, useEffect } from 'react';
import Shotgun from './svg/Shotgun'; // Импорт дробовика из новой папки
import './GameScreen.css';

export default function GameScreen({ onNavigate }) {
  // Состояния игры
  const [playerHp, setPlayerHp] = useState(6);
  const [enemyHp, setEnemyHp] = useState(6);
  const [turn, setTurn] = useState('player'); // 'player' или 'enemy'
  
  const [cases, setCases] = useState([1, 1, 1]); // 3 кейса (1 = закрыт, 0 = открыт)
  const [showSurrenderModal, setShowSurrenderModal] = useState(false);
  
  const [shells, setShells] = useState([]);
  const [currentShell, setCurrentShell] = useState(null);
  
  // Состояние для скина дробовика (для теста)
  const [currentSkin, setCurrentSkin] = useState('default');

  // Инициализация патронов при старте
  useEffect(() => {
    const newShells = [...Array(3).fill('live'), ...Array(3).fill('blank')].sort(() => Math.random() - 0.5);
    setShells(newShells);
    setCurrentShell(newShells[0]);
  }, []);

  // Логика выстрела
  const handleShoot = (target) => {
    if (turn !== 'player' || shells.length === 0) return;

    const isLive = currentShell === 'live';
    
    // Наносим урон
    if (isLive) {
      if (target === 'self') {
        setPlayerHp(prev => Math.max(0, prev - 1));
      } else {
        setEnemyHp(prev => Math.max(0, prev - 1));
      }
    }

    // Убираем патрон
    const newShells = shells.slice(1);
    setShells(newShells);
    
    // Перезарядка, если патроны кончились
    if (newShells.length === 0) {
      setTimeout(() => {
        const reloaded = [...Array(3).fill('live'), ...Array(3).fill('blank')].sort(() => Math.random() - 0.5);
        setShells(reloaded);
        setCurrentShell(reloaded[0]);
      }, 1000);
    } else {
      setCurrentShell(newShells[0]);
    }

    // Передаем ход врагу
    setTurn('enemy');

    // Имитация хода врага (через 2 секунды)
    setTimeout(() => {
      setTurn('player');
    }, 2000);
  };

  // Обработка использования предмета (двойной клик)
  const handleItemDoubleClick = (itemName, index, side) => {
    console.log(`Использован предмет: ${itemName} из ${side} сетки, слот ${index}`);
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

      {/* Верхняя панель с кнопкой "Сдаться" и здоровьем */}
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

      {/* Игровое поле с дробовиком */}
      <div className="game-arena">
        <div className="turn-indicator">
          {turn === 'player' ? 'ВАШ ХОД' : 'ХОД ВРАГА'}
        </div>
        
        <div className="shotgun-display">
          {/* Подключаем компонент дробовика */}
          <Shotgun skin={currentSkin} />
        </div>
        
        {/* Временная кнопка смены скина для проверки */}
        <button 
          onClick={() => setCurrentSkin(prev => prev === 'default' ? 'gold' : 'default')}
          style={{ marginTop: '15px', color: '#fff', background: '#333', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Сменить скин
        </button>

        <div className="ammo-info">
          Патроны: {shells.length} | Текущий: {currentShell === 'live' ? '🔴 Боевой' : '⚪ Холостой'}
        </div>
      </div>

      {/* Кнопки выстрелов */}
      <div className="action-bar">
        <button 
          className="action-btn" 
          onClick={() => handleShoot('self')}
          disabled={turn !== 'player'}
        >
          В СЕБЯ
        </button>
        <button 
          className="action-btn" 
          onClick={() => handleShoot('enemy')}
          disabled={turn !== 'player'}
        >
          В ВРАГА
        </button>
      </div>

      {/* Нижняя панель с предметами и кейсом */}
      <div className="bottom-panel">
        {/* Левая сетка предметов (2x2) */}
        <div className="items-grid left-grid">
          {[1, 2, 3, 4].map((id) => (
            <div 
              key={`left-${id}`} 
              className="item-slot" 
              onDoubleClick={() => handleItemDoubleClick('Предмет', id, 'left')}
            >
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
            <div 
              key={`right-${id}`} 
              className="item-slot" 
              onDoubleClick={() => handleItemDoubleClick('Предмет', id, 'right')}
            >
              {/* Сюда потом вставим иконки */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
