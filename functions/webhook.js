export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const update = await request.json();

    // Проверяем, что пришло сообщение (а не что-то другое)
    if (update.message && update.message.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text;
      const botToken = env.TELEGRAM_BOT_TOKEN; // Берем токен из настроек Cloudflare

      let replyText = '';
      let replyMarkup = null;

      // Обработка команды /start
      if (text === '/start') {
        replyText = 'Добро пожаловать в 2DSHOT! Нажми кнопку ниже, чтобы начать игру.';
        replyMarkup = {
          inline_keyboard: [[
            { 
              text: '🎮 Играть', 
              web_app: { url: 'https://2dshotgame.islamgaliev-maksim12.workers.dev/' } 
            }
          ]]
        };
      } 
      // Обработка команды /help
      else if (text === '/help') {
        replyText = 'Команды бота:\n/start - Запустить игру\n/help - Помощь';
      }
      // Ответ на любое другое сообщение
      else {
        replyText = 'Я тебя не понимаю. Напиши /start, чтобы играть.';
      }

      // Отправляем ответ в Telegram
      if (botToken) {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: replyText,
            reply_markup: replyMarkup
          })
        });
      }
    }

    // Telegram требует отвечать 200 OK, иначе он будет повторять запрос
    return new Response('ok', { status: 200 });
  } catch (e) {
    return new Response('Error', { status: 500 });
  }
}
