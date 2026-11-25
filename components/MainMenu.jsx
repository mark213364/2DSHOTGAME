import { useState } from 'react';
import './MainMenu.css';

export default function MainMenu({ onNavigate }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Обратите внимание на action для кнопки "Играть"
  const menuItems = [
    { label: 'Играть', action: () => onNavigate('game') }, 
    { label: 'Настройки', action: () => console.log('Настройки в разработке') },
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
            onClick={() => {
              setSelectedIndex(index);
              item.action();
            }}
          >
            {/* Рендерим обрамление > ... < только для выбранной кнопки */}
            {selectedIndex === index ? `> ${item.label} <` : item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
