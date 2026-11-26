export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Если запрос пришел на /webhook, обрабатываем его кодом бота
    if (url.pathname === '/webhook' && request.method === 'POST') {
      try {
        const update = await request.json();
        
        if (update.message && update.message.text) {
          const chatId = update.message.chat.id;
          const text = update.message.text;
          const botToken = env.TELEGRAM_BOT_TOKEN;

          let replyText = '';
          let replyMarkup = null;

          if (text === '/start') {
            replyText = 'Добро пожаловать в 2DSHOT! Нажми кнопку ниже.';
            replyMarkup = {
              inline_keyboard: [[
                { text: '🎮 Играть', web_app: { url: 'https://2dshotgame.islamgaliev-maksim12.workers.dev/' } }
              ]]
            };
          } else {
            replyText = 'Напиши /start, чтобы играть.';
          }

          if (botToken) {
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chat_id: chatId, text: replyText, reply_markup: replyMarkup })
            });
          }
        }
        return new Response('ok', { status: 200 });
      } catch (e) {
        return new Response('Error', { status: 500 });
      }
    }

    // Для всех остальных запросов (игра, картинки) просто отдаем статику
    // Это стандартный способ, если вы используете привязку ASSETS
    return env.ASSETS.fetch(request);
  }
};
