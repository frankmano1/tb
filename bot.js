const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.js'); // Importa le tue configurazioni da config.js

const token = config.telegramBotToken; // Utilizza il token dal file config.js

const bot = new TelegramBot(token, { polling: true });

// Opzioni del menu principale
const mainMenuOptions = [
  { text: 'Servizi', action: 'services' },
  { text: 'Visita il sito', action: 'website' },
  { text: 'Assistenza clienti', action: 'customerSupport' },
  { text: 'Ricevi le nostre news', action: 'news' },
  { text: 'Chatta con l\'AI', action: 'chatAI' },
];

// Azioni associate alle opzioni
const optionActions = {
  services: [
    { text: 'Consulenza', action: 'webview', url: 'https://ititalia.it/consulenza' },
    { text: 'Web App', action: 'webview', url: 'https://ititalia.it/web-app' },
    { text: 'Formazione', action: 'webview', url: 'https://ititalia.it/formazione' },
    { text: 'Portfolio', action: 'webview', url: 'https://portfolio.ititalia.it' },
  ],
  website: [{ text: 'Visita il sito', action: 'webview', url: 'https://ititalia.it' }],
  customerSupport: [{ text: 'Assistenza clienti', action: 'webview', url: 'https://ititalia.it/assistenza' }],
  news: [{ text: 'Ricevi le nostre news', action: 'action' }],
  chatAI: [{ text: 'Chatta con l\'AI', action: 'action' }],
};

// Gestione dei comandi personalizzati
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = 'Benvenuto su IT Italia! Sono il tuo assistente virtuale, non vedo l\'ora di aiutarti. Seleziona un\'opzione:';
  sendOptionsMessage(chatId, welcomeMessage, mainMenuOptions);
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpMessage = 'Sono qui per fornirti assistenza. Puoi scegliere un\'opzione dal menu oppure utilizzare i comandi seguenti:\n/start - Mostra il messaggio di benvenuto\n/help - Fornisce informazioni sul bot\n/info - Fornisce informazioni su IT Italia';
  bot.sendMessage(chatId, helpMessage);
});

bot.onText(/\/info/, (msg) => {
  const chatId = msg.chat.id;
  const botInfo = 'Sono un bot creato da IT Italia per fornire assistenza virtuale. Se hai bisogno di aiuto, non esitare a contattarmi.';
  bot.sendMessage(chatId, botInfo);
});

// Gestione dei messaggi di testo
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Gestione delle opzioni e azioni
  mainMenuOptions.forEach((option) => {
    if (text === option.text) {
      const action = option.action;
      handleOptionAction(chatId, action);
    }
  });

  // Messaggio di default per testi non riconosciuti
  handleDefaultMessage(chatId);
});

// Funzione per inviare un messaggio con opzioni
function sendOptionsMessage(chatId, message, options) {
  const optionsMessage = {
    reply_markup: {
      keyboard: options.map((option) => [option.text]),
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
  bot.sendMessage(chatId, message, optionsMessage);
}

// Funzione per gestire le azioni delle opzioni
function handleOptionAction(chatId, action) {
  if (action in optionActions) {
    const options = optionActions[action];
    if (options[0].action === 'webview') {
      const webviewOptions = {
        reply_markup: {
          inline_keyboard: options.map((option) => [{ text: option.text, url: option.url }]),
        },
      };
      bot.sendMessage(chatId, `Hai selezionato ${action}. Clicca sul pulsante per aprire la webview.`, webviewOptions);
    } else if (options[0].action === 'action') {
      // Gestisci l'azione specifica qui
      bot.sendMessage(chatId, `Hai selezionato ${action}.`);
    }
  } else {
    sendBackToMenuMessage(chatId);
  }
}

// Funzione per inviare il messaggio di ritorno al menu
function sendBackToMenuMessage(chatId) {
  const backToMenuMessage = 'Seleziona un\'opzione tra le seguenti così provo ad aiutarti:';
  sendOptionsMessage(chatId, backToMenuMessage, mainMenuOptions);
}

// Funzione per gestire il messaggio di default
function handleDefaultMessage(chatId) {
  bot.sendMessage(chatId, 'Mi dispiace, devi selezionare una delle opzioni indicate nei pulsanti o contattare un nostro agente');
}
