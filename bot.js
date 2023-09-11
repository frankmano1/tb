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
          ['Opzione 2'],
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
        const webviewOptions = {
          reply_markup: {
            inline_keyboard: [[{ text: 'Apri', url: 'https://ititalia.it' }]]
          }
        };
        bot.sendMessage(chatId, aboutUsMessage, webviewOptions);
        break;

      case 'Opzione 2':
        const option2Message = 'Hai selezionato Opzione 2. Scegli un\'azione:';
        const option2Actions = [['Azione 3'], ['Azione 4'], ['Torna al menu']];
        sendOptionsMessage(chatId, option2Message, option2Actions);
        break;

      case 'Opzione 3':
        const option3Message = 'Hai selezionato Opzione 3. Scegli un\'azione:';
        const option3Actions = [['Azione 5'], ['Azione 6'], ['Torna al menu']];
        sendOptionsMessage(chatId, option3Message, option3Actions);
        break;

      case 'Opzione 4':
        const option4Message = 'Hai selezionato Opzione 4. Scegli un\'azione:';
        const option4Actions = [['Azione 7'], ['Azione 8'], ['Torna al menu']];
        sendOptionsMessage(chatId, option4Message, option4Actions);
        break;

      case 'Opzione 5':
        const option5Message = 'Hai selezionato Opzione 5. Scegli un\'azione:';
        const option5Actions = [['Azione 9'], ['Azione 10'], ['Torna al menu']];
        sendOptionsMessage(chatId, option5Message, option5Actions);
        break;

      default:
        // Messaggio di default per altre opzioni
        bot.sendMessage(chatId, 'Opzione non valida, seleziona un\'opzione dal menu.');
        break;
    }
  }
});

// Avvia il bot
bot.on('polling_error', (error) => {
  console.log(error);
});
