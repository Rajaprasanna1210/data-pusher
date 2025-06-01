const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'data.db'), (err) => {
  if (err) return console.error('DB connection error:', err.message);
  console.log('✅ SQLite DB connected.');
});

// Create tables and sample data
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      account_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      secret_token TEXT NOT NULL,
      website TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS destinations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      account_id TEXT NOT NULL,
      url TEXT NOT NULL,
      method TEXT NOT NULL,
      headers TEXT NOT NULL,
      FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE
    )
  `);

  // Sample Account
  db.run(`
    INSERT OR IGNORE INTO accounts (email, account_id, name, secret_token, website)
    VALUES (
      'sample@example.com',
      'acc-123456',
      'Sample Account',
      'sample-token-123',
      'https://sample.com'
    )
  `);

  // Sample Destination
  db.run(`
    INSERT OR IGNORE INTO destinations (account_id, url, method, headers)
    VALUES (
      'acc-123456',
      'https://webhook.site/your-webhook-url',
      'POST',
      '{"APP_ID":"1234APPID1234","APP_SECTET":"secretKey","ACTION":"user.update","Content-Type":"application/json","Accept":"*"}'
    )
  `);
});

module.exports = db;
