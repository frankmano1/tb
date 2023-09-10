const mysql = require('mysql');
const readline = require('readline');
const config = require('./config'); // Importa le credenziali dal file config.js

// Configura la connessione al database MySQL
const dbConnection = mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
});

dbConnection.connect((err) => {
  if (err) {
    console.error('Errore nella connessione al database: ' + err.message);
    return;
  }
  console.log('Connesso al database MySQL');
});

// Crea l'interfaccia per leggere input dall'utente
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Funzione per eseguire una query SQL e gestire gli errori
function queryDatabase(sql, values, callback) {
  dbConnection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Errore nell\'esecuzione della query: ' + err.message);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

// Funzione per porre una domanda all'utente
function askQuestion(question, callback) {
  rl.question(question + ' ',
