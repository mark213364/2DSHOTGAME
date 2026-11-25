import { useState } from 'react';
import './MainMenu.css';

export default function MainMenu({ onNavigate }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuItems = [
    { label: 'Играть', action: () => onNavigate('modeSelect') },
    { label: 'Настройки', action: () => console.log('Настройки') },
    { label: 'Помощь', action: () => onNavigate('help') }
  ];

  return (
    <div className="menu-container">
      <h1 className="menu-title">2DSHOT</h1>
      
      <div className="menu-buttons">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            className={`menu-btn ${selectedIndex === index ? 'selected' : ''}`}
            onMouseEnter={() => setSelectedIndex(index)} // Выделение при наведении мыши
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
