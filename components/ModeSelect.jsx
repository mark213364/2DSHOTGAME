import './MainMenu.css'; // Используем те же стили

export default function ModeSelect({ onNavigate }) {
  return (
    <div className="menu-container">
      <h1 className="menu-title">ВЫБОР РЕЖИМА</h1>
      
      <div className="menu-buttons">
        <button 
          className="menu-btn selected" 
          onClick={() => onNavigate('game', { mode: 'bot' })}
        >
          {'> ПРОТИВ БОТА <'}
        </button>
        <button 
          className="menu-btn" 
          onClick={() => onNavigate('multiplayer')}
        >
          ПРОТИВ ИГРОКА
        </button>
        <button 
          className="menu-btn" 
          onClick={() => onNavigate('menu')}
        >
          НАЗАД
        </button>
      </div>
    </div>
  );
}
