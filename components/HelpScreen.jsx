import './MainMenu.css'; 

export default function HelpScreen({ onNavigate }) {
  const itemsInfo = [
    { name: 'Пиво', desc: 'Выбрасывает текущий патрон из дробовика.' },
    { name: 'Лупа', desc: 'Показывает, какой патрон заряжен сейчас.' },
    { name: 'Сигарета', desc: 'Восстанавливает 1 единицу здоровья.' },
    { name: 'Пила', desc: 'Увеличивает урон следующего выстрела в 2 раза.' }
  ];

  return (
    <div className="menu-container help-container">
      <h1 className="menu-title" style={{ fontSize: '24px', marginTop: '10px' }}>ПОМОЩЬ</h1>
      
      <div className="help-scroll-area">
        <p style={{ color: '#888', textAlign: 'center', marginBottom: '20px' }}>
          Предметы и их эффекты
        </p>
        <div className="items-list">
          {itemsInfo.map((item) => (
            <div key={item.name} className="help-item-card">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="menu-buttons" style={{ marginBottom: '20px' }}>
        <button 
          className="menu-btn selected" 
          onClick={() => onNavigate('menu')}
        >
          {'> Назад <'}
        </button>
      </div>
    </div>
  );
}
