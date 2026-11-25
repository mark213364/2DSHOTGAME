export default function Shotgun({ skin = 'default' }) {
  // Цвета для скинов
  const skinColors = {
    default: '#888888', // Серый металл
    gold: '#FFD700',    // Золотой
    blood: '#8B0000',   // Кроваво-красный
  };

  const currentColor = skinColors[skin] || skinColors.default;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // ВАЖНО: Мы изменили viewBox, чтобы дробовик выглядел пропорционально
      viewBox="0 0 3292.5 800" 
      width="100%"
      height="100%"
      style={{ 
        maxWidth: '300px', 
        color: currentColor, // Передаем цвет
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' 
      }}
    >
      {/* ВСТАВЬТЕ СЮДА ВАШ ТЕГ <path> */}
      <path 
        fill="currentColor" // <-- Заменили жесткий цвет на currentColor
        d="m19.29 515.94c-0.32876-0.85673... (и так далее, весь ваш длинный путь) ..." 
      />
    </svg>
  );
}
