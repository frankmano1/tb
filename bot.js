const TelegramBot = require('node-telegram-bot-api');
const mysql = require('mysql');
const config = require('./config.js');

const token = config.telegramBotToken;
const bot = new TelegramBot(token, { polling: true });

const db = mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName
});

db.connect((err) => {
  if (err) {
    console.error('Errore nella connessione al database:', err);
  } else {
    console.log('Connessione al database MySQL avvenuta con successo!');
  }
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Benvenuto su IT Italia, ti illustreremo tutte le funzionalità principali del nostro bot, ma prima presentiamoci!')
    .then(() => {
      setTimeout(() => {
        bot.sendMessage(chatId, 'Come ti chiami? (Inserisci il tuo nome per continuare)');
      }, 1000);
    });
});

bot.on('text', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text.startsWith('Il mio nome è ')) {
    const name = text.replace('Il mio nome è ', '');

    // Salva il nome nel database
    db.query('INSERT INTO utenti (chat_id, nome) VALUES (?, ?)', [chatId, name], (err, result) => {
      if (err) {
        console.error('Errore durante l\'inserimento nel database:', err);
      } else {
        // Invia un messaggio personalizzato con il nome utente
        bot.sendMessage(chatId, `Piacere di conoscerti, ${name}! Ti chiediamo un'ultima informazione, potresti scriverci qui sotto il tuo indirizzo email?`);
      }
    });

    // Crea una variabile con il nome utente
    const username = name;

    // Attendi una risposta per l'indirizzo email
    bot.once('text', (msg) => {
      const email = msg.text;

      // Salva l'indirizzo email nel database
      db.query('UPDATE utenti SET email = ? WHERE chat_id = ?', [email, chatId], (err, result) => {
        if (err) {
          console.error('Errore durante l\'aggiornamento nel database:', err);
        } else {
          bot.sendMessage(chatId, `Grazie per averci fornito il tuo indirizzo email, ${username}! Ora abbiamo tutte le informazioni necessarie.`);
        }
      });
    });
  } else {
    bot.sendMessage(chatId, `Hai scritto: ${text}`);
  }
});

bot.on('polling_error', (error) => {
  console.error(error);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Comando non riconosciuto. Prova /start per iniziare.');
});
