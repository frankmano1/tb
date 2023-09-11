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

// Funzione per gestire le azioni delle opzioni
function handleOptionAction(chatId, action) {
  const backToOptions = {
    reply_markup: {
      keyboard: [
        ['Su di noi'],
        ['Opzione 2'],
        ['Opzione 3'],
        ['Opzione 4'],
        ['Opzione 5']
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  };

  if (action === 'I nostri servizi') {
    // Apri la webview con l'URL specificato
    const webviewOptions = {
      reply_markup: {
        inline_keyboard: [[{ text: 'Apri', url: 'https://ititalia.it/servizi' }]]
      }
    };
    bot.sendMessage(chatId, 'Hai selezionato I nostri servizi. Clicca sul pulsante per aprire la webview.', webviewOptions);
  } else if (action === 'Portfolio') {
    // Apri la webview con l'URL specificato
    const webviewOptions = {
      reply_markup: {
        inline_keyboard: [[{ text: 'Apri', url: 'https://portfolio.ititalia.it' }]]
      }
    };
    bot.sendMessage(chatId, 'Hai selezionato Portfolio. Clicca sul pulsante per aprire la webview.', webviewOptions);
  } else {
    bot.sendMessage(chatId, 'Hai selezionato ' + action, backToOptions);
  }
}

// Funzione per inviare il messaggio di ritorno al menu
function sendBackToMenuMessage(chatId) {
  const backToMenuMessage = 'Seleziona un\'opzione tra le seguenti così provo ad aiutarti:';

  const menuOptions = {
    reply_markup: {
      keyboard: [
        ['Su di noi'],
        ['Opzione 2'],
        ['Opzione 3'],
        ['Opzione 4'],
        ['Opzione 5']
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  };

  bot.sendMessage(chatId, backToMenuMessage, menuOptions);
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
          ['Su di noi'],
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
      case 'Su di noi':
        const aboutUsMessage = 'Hai selezionato Su di noi. Scegli un\'azione:';
        const aboutUsActions = [['I nostri servizi'], ['Portfolio'], ['Azione 2'], ['Torna al menu']];
        sendOptionsMessage(chatId, aboutUsMessage, aboutUsActions);
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

      case 'I nostri servizi':
      case 'Portfolio':
      case 'Azione 2':
      case 'Azione 3':
      case 'Azione 4':
      case 'Azione 5':
      case 'Azione 6':
      case 'Azione 7':
      case 'Azione 8':
      case 'Azione 9':
      case 'Azione 10':
        handleOptionAction(chatId, text);
        break;

      case 'Torna al menu':
        sendBackToMenuMessage(chatId);
        break;

      default:
        handleDefaultMessage(chatId);
        break;
    }
  }
});
