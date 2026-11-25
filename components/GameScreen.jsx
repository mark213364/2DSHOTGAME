import { useState } from 'react';
import './GameScreen.css';

export default function GameScreen({ onNavigate }) {
  // Пока здесь нет логики, только визуал
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);

  return (
    <div className="game-container">
      {/* Верхняя панель с жизнями и кнопкой выхода */}
      <div className="game-hud">
        <button className="exit-btn" onClick={() => onNavigate('menu')}>
          &lt; Выход
        </button>
        <div className="hud-stats">
          <div className="hud-player">
            <span className="hud-label">ВЫ</span>
            <div className="hp-bar">
              <div className="hp-fill" style={{ width: `${playerHp}%` }}></div>
            </div>
          </div>
          <div className="hud-enemy">
            <span className="hud-label">ВРАГ</span>
            <div className="hp-bar">
              <div className="hp-fill enemy" style={{ width: `${enemyHp}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Центральная часть — дробовик */}
      <div className="game-arena">
        <div className="turn-indicator">ВАШ ХОД</div>
        <div className="shotgun-placeholder">
          [ ДРОБОВИК ]
        </div>
        <div className="ammo-info">Патроны: ? / ?</div>
      </div>

      {/* Кнопки выстрелов */}
      <div className="action-bar">
        <button className="action-btn">В СЕБЯ</button>
        <button className="action-btn">В ВРАГА</button>
      </div>

      {/* Панель предметов */}
      <div className="items-bar">
        <div className="item-slot">Пиво</div>
        <div className="item-slot">Лупа</div>
        <div className="item-slot">Сигарета</div>
        <div className="item-slot">Пила</div>
      </div>
    </div>
  );
}
