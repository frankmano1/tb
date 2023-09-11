const TelegramBot = require('node-telegram-bot-api');
const config = require('./config'); // Importa il file di configurazione

const bot = new TelegramBot(config.telegramBotToken, { polling: true });

// Variabile per memorizzare il menu principale
const mainMenu = [
  ['Chi siamo'],
  ['Servizi'],
  ['Portfolio'],
  ['Le nostre News'], // Modifica il testo del pulsante "Opzione 4" in "Le nostre News"
  ['Area Clienti'], // Modifica il testo del pulsante "Opzione 5" in "Area Clienti"
];

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
        sendOptionsMessage(chatId, welcomeMessage, mainMenu);
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
  
        case 'Torna al menu':
          sendOptionsMessage(chatId, 'Seleziona un\'opzione tra le seguenti:', mainMenu);
          break;

      case 'Portfolio':
        const portfolioMessage = 'Hai selezionato Portfolio. Clicca sul pulsante sottostante per ulteriori informazioni:';
        const portfolioWebviewOptions = {
          reply_markup: {
            inline_keyboard: [[{ text: 'Apri', url: 'https://portfolio.ititalia.it' }]]
          }
        };
        bot.sendMessage(chatId, portfolioMessage, portfolioWebviewOptions);
        break;

      case 'Le nostre News':
        const newsMessage = 'Hai selezionato Le nostre News. Clicca sul pulsante sottostante per ulteriori informazioni:';
        const newsWebviewOptions = {
          reply_markup: {
            inline_keyboard: [[{ text: 'Apri', url: 'https://ititalia.it/blog' }]]
          }
        };
        bot.sendMessage(chatId, newsMessage, newsWebviewOptions);
        break;

      case 'Area Clienti':
        const areaClientiMessage = 'Hai selezionato Area Clienti. Scegli un\'azione:';
        const areaClientiActions = [
          ['Contatti', 'Assistenza Clienti'],
          ['Torna al menu']
        ];
        sendOptionsMessage(chatId, areaClientiMessage, areaClientiActions);
        break;

      case 'Contatti':
        const contattiMessage = 'Hai selezionato Contatti. Clicca sul pulsante sottostante per ulteriori informazioni:';
        const contattiWebviewOptions = {
          reply_markup: {
            inline_keyboard: [[{ text: 'Apri', url: 'https://ititalia.it/contatti' }]]
          }
        };
        bot.sendMessage(chatId, contattiMessage, contattiWebviewOptions);
        break;

      case 'Assistenza Clienti':
        const assistenzaMessage = 'Hai selezionato Assistenza Clienti. Clicca sul pulsante sottostante per ulteriori informazioni:';
        const assistenzaWebviewOptions = {
          reply_markup: {
            inline_keyboard: [[{ text: 'Apri', url: 'https://ititalia.it/assistenza' }]]
          }
        };
        bot.sendMessage(chatId, assistenzaMessage, assistenzaWebviewOptions);
        break;

      case 'Torna al menu':
        sendOptionsMessage(chatId, 'Seleziona un\'opzione tra le seguenti:', mainMenu);
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

// Avvia il bot
bot.on('polling_error', (error) => {
  console.log(error);
});
