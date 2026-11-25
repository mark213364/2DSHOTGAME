import { useState } from 'react';
import './MainMenu.css';

export default function ModeSelect({ onNavigate }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuItems = [
    { label: 'ПРОТИВ БОТА', action: () => onNavigate('game', { mode: 'bot' }) },
    { label: 'ПРОТИВ ИГРОКА', action: () => onNavigate('multiplayer') },
    { label: 'НАЗАД', action: () => onNavigate('menu') }
  ];

  return (
    <div className="menu-container">
      <h1 className="menu-title">ВЫБОР РЕЖИМА</h1>
      
      <div className="menu-buttons">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            className={`menu-btn ${selectedIndex === index ? 'selected' : ''}`}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => {
              setSelectedIndex(index);
              item.action();
            }}
          >
            {selectedIndex === index ? `> ${item.label} <` : item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
