const TelegramBot = require('node-telegram-bot-api');
const config = require('./config'); // Importa il file di configurazione

const bot = new TelegramBot(config.telegramBotToken, { polling: true });

// Funzione per inviare un messaggio con opzioni
function sendOptionsMessage(chatId, message, options) {
  const optionsMessage = {
    reply_markup: {
      keyboard: options,
      resize_keyboard: true,
      one_time_keyboard: true
    }
  };
  bot.sendMessage(chatId, message, optionsMessage);
}

// Funzione per gestire il messaggio di default
function handleDefaultMessage(chatId) {
  bot.sendMessage(chatId, 'Mi dispiace, devi selezionare una delle opzioni indicate nei pulsanti o contattare un nostro agente');
}

// Gestione dei messaggi
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Controllo se il messaggio è un comando personalizzato
  if (text.startsWith('/')) {
    // Gestione dei comandi personalizzati
    switch (text) {
      case '/start':
        const welcomeMessage = 'Benvenuto su IT Italia! Sono il tuo assistente virtuale, non vedo l\'ora di aiutarti. Seleziona un\'opzione tra le seguenti:';
        const startOptions = [
          ['Chi siamo'],
          ['Servizi'],
          ['Opzione 3'],
          ['Opzione 4'],
          ['Opzione 5']
        ];
        sendOptionsMessage(chatId, welcomeMessage, startOptions);
        break;

      case '/help':
        const helpMessage = 'Sono qui per fornirti assistenza. Puoi scegliere un\'opzione dal menu oppure utilizzare i comandi seguenti:\n/start - Mostra il messaggio di benvenuto\n/help - Fornisce informazioni sul bot\n/info - Fornisce informazioni su IT Italia';
        bot.sendMessage(chatId, helpMessage);
        break;

      case '/info':
        const botInfo = 'Sono un bot creato da IT Italia per fornire assistenza virtuale. Se hai bisogno di aiuto, non esitare a contattarmi.';
        bot.sendMessage(chatId, botInfo);
        break;

      default:
        // Messaggio di default per comandi non riconosciuti
        bot.sendMessage(chatId, 'Comando non valido');
        break;
    }
  } else {
    // Gestione delle opzioni e azioni
    switch (text) {
      case 'Chi siamo':
        const aboutUsMessage = 'Benvenuti in IT Italia! Siamo un team di esperti pronti ad aiutarvi. Clicca sul pulsante sottostante per ulteriori informazioni:';
        const aboutUsWebviewOptions = {
          reply_markup: {
            inline_keyboard: [[{ text: 'Apri', url: 'https://ititalia.it' }]]
          }
        };
        bot.sendMessage(chatId, aboutUsMessage, aboutUsWebviewOptions);
        break;

      case 'Servizi':
        const servicesMessage = 'Hai selezionato Servizi. Scegli un\'azione:';
        const servicesActions = [
          ['Consulenza', 'Siti Web', 'Formazione'],
          ['Torna al menu']
        ];
        sendOptionsMessage(chatId, servicesMessage, servicesActions);
        break;

      case 'Consulenza':
        const consulenzaMessage = 'Hai selezionato Consulenza. Clicca sul pulsante sottostante per ulteriori informazioni:';
        const consulenzaWebviewOptions = {
          reply_markup: {
            inline_keyboard: [[{ text: 'Apri', url: 'https://ititalia.it/consulenza' }]]
          }
        };
        bot.sendMessage(chatId, consulenzaMessage, consulenzaWebviewOptions);
        break;

      case 'Siti Web':
        const sitiWebMessage = 'Hai selezionato Siti Web. Clicca sul pulsante sottostante per ulteriori informazioni:';
        const sitiWebWebviewOptions = {
          reply_markup: {
            inline_keyboard: [[{ text: 'Apri', url: 'https://ititalia.it/siti-web' }]]
          }
        };
        bot.sendMessage(chatId, sitiWebMessage, sitiWebWebviewOptions);
        break;

      case 'Formazione':
        const formazioneMessage = 'Hai selezionato Formazione. Clicca sul pulsante sottostante per ulteriori informazioni:';
        const formazioneWebviewOptions = {
          reply_markup: {
            inline_keyboard: [[{ text: 'Apri', url: 'https://ititalia.it/formazione' }]]
          }
        };
        bot.sendMessage(chatId, formazioneMessage, formazioneWebviewOptions);
        break;

      default:
        handleDefaultMessage(chatId);
        break;
    }
  }
});

// Avvia il bot
bot.on('polling_error', (error) => {
  console.log(error);
});
