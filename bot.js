const TelegramBot = require('node-telegram-bot-api');
const config = require('./config'); // Importa il file di configurazione

const bot = new TelegramBot(config.telegramBotToken, { polling: true });

// Messaggio di benvenuto
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = "Benvenuto su IT Italia! Seleziona il menu che desideri cliccando su uno dei pulsanti disponibili.";
  const keyboard = {
    reply_markup: {
      keyboard: [
        [
          { text: 'Chi siamo' },
          { text: 'Consulenza' },
          { text: 'Siti web' },
          { text: 'Formazione' },
          { text: 'Portfolio' },
        ],
        [
          { text: 'Le nostre news' },
          { text: 'Contatti' },
          { text: 'Assistenza Clienti' },
          { text: 'Seguici sui Social' },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, welcomeMessage, keyboard);
});

// Gestione dei pulsanti del menu
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  switch (text) {
    case 'Chi siamo':
      bot.sendMessage(chatId, 'Puoi trovare informazioni su di noi su https://ititalia.it');
      break;
    case 'Consulenza':
      bot.sendMessage(chatId, 'Per la consulenza, visita https://ititalia.it/consulenza');
      break;
    case 'Siti web':
      bot.sendMessage(chatId, 'Scopri i nostri siti web su https://ititalia.it/siti-web');
      break;
    case 'Formazione':
      bot.sendMessage(chatId, 'Per la formazione, visita https://ititalia.it/formazione');
      break;
    case 'Portfolio':
      bot.sendMessage(chatId, 'Esplora il nostro portfolio su https://portfolio.ititalia.it');
      break;
    case 'Le nostre news':
      bot.sendMessage(chatId, 'Leggi le nostre news su https://ititalia.it/blog');
      break;
    case 'Contatti':
      bot.sendMessage(chatId, 'Contattaci su https://ititalia.it/contatti');
      break;
    case 'Assistenza Clienti':
      bot.sendMessage(chatId, 'Per assistenza clienti, vai su https://ititalia.it/assistenza');
      break;
    case 'Seguici sui Social':
      // Creare il menu dei social come descritto successivamente
      sendSocialMenu(chatId);
      break;
    default:
      bot.sendMessage(chatId, 'Scelta non valida. Seleziona un'opzione dal menu.');
  }
});

// Funzione per inviare il menu dei social
function sendSocialMenu(chatId) {
  const socialKeyboard = {
    reply_markup: {
      keyboard: [
        [
          { text: 'Facebook' },
          { text: 'Twitter' },
          { text: 'Instagram' },
          { text: 'LinkedIn' },
        ],
        [
          { text: 'YouTube' },
          { text: 'Telegram' },
          { text: 'Torna al menu principale' },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, 'Seguici sui seguenti social media:', socialKeyboard);
}

// Gestione dei pulsanti dei social
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  switch (text) {
    case 'Facebook':
      bot.sendMessage(chatId, 'Seguici su Facebook su [link_facebook]');
      break;
    case 'Twitter':
      bot.sendMessage(chatId, 'Seguici su Twitter su [link_twitter]');
      break;
    case 'Instagram':
      bot.sendMessage(chatId, 'Seguici su Instagram su [link_instagram]');
      break;
    case 'LinkedIn':
      bot.sendMessage(chatId, 'Seguici su LinkedIn su [link_linkedin]');
      break;
    case 'YouTube':
      bot.sendMessage(chatId, 'Seguici su YouTube su [link_youtube]');
      break;
    case 'Telegram':
      bot.sendMessage(chatId, 'Unisciti al nostro canale Telegram su [link_telegram]');
      break;
    case 'Torna al menu principale':
      // Torna al menu principale
      bot.sendMessage(chatId, "Torna al menu principale.", {
        reply_markup: {
          remove_keyboard: true,
        },
      });
      break;
    default:
      bot.sendMessage(chatId, 'Scelta non valida. Seleziona un'opzione dal menu.');
  }
});
