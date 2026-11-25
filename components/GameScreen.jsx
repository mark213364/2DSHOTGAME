import './GameScreen.css';

export default function GameScreen({ onNavigate }) {
  return (
    <div className="game-container">
      <div className="game-hud">
        <div className="hud-player">
          <span className="hud-label">ВЫ</span>
          <div className="hp-bar">
            <div className="hp-fill" style={{ width: '100%' }}></div>
          </div>
        </div>
        <div className="hud-enemy">
          <span className="hud-label">ПРОТИВНИК</span>
          <div className="hp-bar">
            <div className="hp-fill" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
      <div className="game-arena">
        <div className="shotgun-placeholder">[ ДРОБОВИК ]</div>
        <div className="turn-indicator">ВАШ ХОД</div>
      </div>
      <div className="action-bar">
        <button className="action-btn">В СЕБЯ</button>
        <button className="action-btn">В ВРАГА</button>
      </div>
      <div className="items-bar">
        <div className="item-slot">Пиво</div>
        <div className="item-slot">Лупа</div>
        <div className="item-slot">Сигарета</div>
        <div className="item-slot">Пила</div>
      </div>
      <button className="exit-btn" onClick={() => onNavigate('menu')}>
        Выход
      </button>
    </div>
  );
}
