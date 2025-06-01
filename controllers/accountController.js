const db = require('../db/database');
const { v4: uuidv4 } = require('uuid');

exports.createAccount = (req, res) => {
  const { email, name, website } = req.body;
  const account_id = uuidv4();
  const secret_token = uuidv4();

  if (!email || !name) return res.status(400).json({ error: 'email and name are required' });

  const query = `
    INSERT INTO accounts (email, account_id, name, secret_token, website)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(query, [email, account_id, name, secret_token, website || null], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, account_id, secret_token });
  });
};

exports.getAllAccounts = (req, res) => {
  db.all('SELECT * FROM accounts', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getAccountById = (req, res) => {
  const query = 'SELECT * FROM accounts WHERE account_id = ?';
  db.get(query, [req.params.accountId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Account not found' });
    res.json(row);
  });
};

exports.updateAccount = (req, res) => {
  const { name, website } = req.body;
  const query = `
    UPDATE accounts SET name = ?, website = ? WHERE account_id = ?
  `;
  db.run(query, [name, website, req.params.accountId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
};

exports.deleteAccount = (req, res) => {
  const accountId = req.params.accountId;

  db.run('DELETE FROM destinations WHERE account_id = ?', [accountId]);
  db.run('DELETE FROM accounts WHERE account_id = ?', [accountId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
};
