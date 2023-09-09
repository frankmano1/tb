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
  if (optionActions[action]) {
    // Azione associata valida
    if (optionActions[action][0].action === 'webview') {
      // Azione di tipo webview
      const webviewOptions = {
        reply_markup: {
          inline_keyboard: [{ text: 'Apri', url: optionActions[action][0].url }],
        },
      };
      bot.sendMessage(chatId, `Hai selezionato ${action}. Clicca sul pulsante per aprire la webview.`, webviewOptions);
    } else if (optionActions[action][0].action === 'action') {
      // Gestisci l'azione specifica qui
      bot.sendMessage(chatId, `Hai selezionato ${action}.`);
    }
  } else {
    // Azione associata non valida
    sendBackToMenuMessage(chatId);
  }
}

// Funzione per inviare il messaggio di ritorno al menu
function sendBackToMenuMessage(chatId) {
  const backToMenuMessage = 'Seleziona un\'opzione tra le seguenti così provo ad aiutarti:';
  sendOptionsMessage(chatId, backToMenuMessage, mainMenuOptions);
}

// Funzione per gestire il messaggio di default
function handleDefaultMessage(chatId, text) {
  if (text === '/start') {
    const welcomeMessage = 'Benvenuto su IT Italia! Sono il tuo assistente virtuale, non vedo l\'ora di aiutarti. Seleziona un\'opzione:';
    sendOptionsMessage(chatId, welcomeMessage, mainMenuOptions);
  } else if (text === '/help') {
    const helpMessage = 'Sono qui per fornirti assistenza. Puoi scegliere un\'opzione dal menu oppure utilizzare i comandi seguenti:\n/start - Mostra il messaggio di benvenuto\n/help - Fornisce informazioni sul bot\n/info - Fornisce informazioni su IT Italia';
    bot.sendMessage(chatId, helpMessage);
  } else if (text === '/info') {
    const botInfo = 'Sono un bot creato da IT Italia per fornire assistenza virtuale. Se hai bisogno di aiuto, non esitare a contattarmi.';
    bot.sendMessage(chatId, botInfo);
  } else {
    bot.sendMessage(chatId, 'Mi dispiace, devi selezionare una delle opzioni indicate nei pulsanti o contattare un nostro agente');
  }
}

// Gestione dei comandi personalizzati
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  handleDefaultMessage(chatId, '/start');
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  handleDefaultMessage(chatId, '/help');
});

bot.onText(/\/info/, (msg) => {
  const chatId = msg.chat.id;
  handleDefaultMessage(chatId, '/info');
});

// Gestione dei messaggi di testo
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Gestione dei comandi personalizzati
  if (text.startsWith('/')) {
    handleDefaultMessage(chatId, text);
  } else {
    // Gestione delle opzioni e azioni
    mainMenuOptions.forEach((option) => {
      if (text === option.text) {
        handleOptionAction(chatId, option.action);
      }
    });
  }
});
