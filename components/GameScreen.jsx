import { useState, useEffect } from 'react';
import Shotgun from './svg/Shotgun';
import './GameScreen.css';

export default function GameScreen({ onNavigate, mode = 'bot' }) {
  const [playerHp, setPlayerHp] = useState(6);
  const [enemyHp, setEnemyHp] = useState(6);
  const [turn, setTurn] = useState('player');
  
  const [cases, setCases] = useState([1, 1, 1]);
  const [showSurrenderModal, setShowSurrenderModal] = useState(false);
  
  const [shells, setShells] = useState([]);
  const [currentShell, setCurrentShell] = useState(null);
  
  const [currentSkin] = useState('default');
  
  // Состояние для поворота дробовика: 'none', 'self', 'enemy'
  const [aimDirection, setAimDirection] = useState('none');

  // Инициализация патронов
  useEffect(() => {
    const newShells = [...Array(3).fill('live'), ...Array(3).fill('blank')].sort(() => Math.random() - 0.5);
    setShells(newShells);
    setCurrentShell(newShells[0]);
  }, []);

  // --- ЛОГИКА БОТА ---
  useEffect(() => {
    if (mode === 'bot' && turn === 'enemy' && shells.length > 0) {
      const timer = setTimeout(() => {
        const isLive = currentShell === 'live';
        
        // Примитивный ИИ: Если патрон боевой - стреляет в игрока, если холостой - в себя
        if (isLive) {
          handleShoot('enemy_target_player'); // Бот стреляет в игрока
        } else {
          handleShoot('enemy_target_self'); // Бот стреляет в себя
        }
      }, 1500); // Задержка, чтобы игрок увидел "ХОД ВРАГА"

      return () => clearTimeout(timer);
    }
  }, [turn, mode, currentShell, shells.length]);

  // --- ЛОГИКА ВЫСТРЕЛА ---
  const handleShoot = (action) => {
    if (shells.length === 0) return;

    const isLive = currentShell === 'live';
    let target = '';

    // Определяем цель и направление ствола
    if (action === 'self') {
      target = 'player';
      setAimDirection('self');
    } else if (action === 'enemy') {
      target = 'enemy';
      setAimDirection('enemy');
    } else if (action === 'enemy_target_player') {
      target = 'player';
      setAimDirection('self'); // Дробовик бота смотрит на игрока
    } else if (action === 'enemy_target_self') {
      target = 'enemy';
      setAimDirection('enemy'); // Дробовик бота смотрит на себя
    }

    // Наносим урон
    if (isLive) {
      if (target === 'player') {
        setPlayerHp(prev => Math.max(0, prev - 1));
      } else if (target === 'enemy') {
        setEnemyHp(prev => Math.max(0, prev - 1));
      }
    }

    // Убираем патрон
    const newShells = shells.slice(1);
    setShells(newShells);
    
    // Перезарядка
    if (newShells.length === 0) {
      setTimeout(() => {
        const reloaded = [...Array(3).fill('live'), ...Array(3).fill('blank')].sort(() => Math.random() - 0.5);
        setShells(reloaded);
        setCurrentShell(reloaded[0]);
        setAimDirection('none'); // Возвращаем дробовик в исходное положение
      }, 1000);
    } else {
      setCurrentShell(newShells[0]);
    }

    // Передаем ход
    if (turn === 'player') {
      setTurn('enemy');
    } else {
      setTurn('player');
    }

    // Возвращаем дробовик в исходное положение через 1.5 секунды
    setTimeout(() => {
      setAimDirection('none');
    }, 1500);
  };

  const handleItemDoubleClick = (itemName, index, side) => {
    console.log(`Использован предмет: ${itemName} из ${side} сетки, слот ${index}`);
  };

  return (
    <div className="game-container">
      {showSurrenderModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Вы уверены, что хотите сдаться?</h3>
            <div className="modal-buttons">
              <button onClick={() => onNavigate('menu')}>Да</button>
              <button onClick={() => setShowSurrenderModal(false)}>Нет</button>
            </div>
          </div>
        </div>
      )}

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

      <div className="game-arena">
        <div className="turn-indicator">
          {turn === 'player' ? 'ВАШ ХОД' : 'ХОД ВРАГА'}
        </div>
        
        {/* Добавляем класс для поворота */}
        <div className={`shotgun-display ${aimDirection === 'self' ? 'aim-self' : aimDirection === 'enemy' ? 'aim-enemy' : ''}`}>
          <Shotgun skin={currentSkin} />
        </div>

        <div className="ammo-info">
          Патроны: {shells.length} | Текущий: {currentShell === 'live' ? '🔴 Боевой' : '⚪ Холостой'}
        </div>
      </div>

      <div className="action-bar">
        <button 
          className="action-btn" 
          onClick={() => handleShoot('self')}
          disabled={turn !== 'player' || shells.length === 0}
        >
          В СЕБЯ
        </button>
        <button 
          className="action-btn" 
          onClick={() => handleShoot('enemy')}
          disabled={turn !== 'player' || shells.length === 0}
        >
          В ВРАГА
        </button>
      </div>

      <div className="bottom-panel">
        <div className="items-grid left-grid">
          {[1, 2, 3, 4].map((id) => (
            <div key={`left-${id}`} className="item-slot" onDoubleClick={() => handleItemDoubleClick('Предмет', id, 'left')}></div>
          ))}
        </div>

        <div className="case-center" onClick={() => console.log('Клик по кейсу')}>
          <div className="case-icon">📦</div>
          <div className="case-count">{cases.filter(c => c === 1).length}</div>
        </div>

        <div className="items-grid right-grid">
          {[1, 2, 3, 4].map((id) => (
            <div key={`right-${id}`} className="item-slot" onDoubleClick={() => handleItemDoubleClick('Предмет', id, 'right')}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
