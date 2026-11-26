export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/webhook' && request.method === 'POST') {
      try {
        const update = await request.json();
        
        // Логируем всё, что приходит от Telegram
        console.log('Received update:', JSON.stringify(update));

        if (update.message && update.message.text) {
          const chatId = update.message.chat.id;
          const text = update.message.text;
          const botToken = env.TELEGRAM_BOT_TOKEN;

          // Логируем токен (первые 10 символов для безопасности)
          console.log('Bot token exists:', !!botToken);

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
            // Логируем, что пытаемся отправить
            console.log('Sending message to:', chatId, 'Text:', replyText);

            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chat_id: chatId, text: replyText, reply_markup: replyMarkup })
            });

            // Логируем ответ от Telegram API
            const responseText = await response.text();
            console.log('Telegram API response:', response.status, responseText);
          } else {
            console.error('Bot token is missing!');
          }
        } else {
          console.log('No message or text in update');
        }
        return new Response('ok', { status: 200 });
      } catch (e) {
        console.error('Error processing webhook:', e.message);
        return new Response('Error', { status: 500 });
      }
    }

    // Для всех остальных запросов отдаем статику
    return env.ASSETS.fetch(request);
  }
};
