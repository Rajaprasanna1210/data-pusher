const db = require('../db/database');

exports.createDestination = (req, res) => {
  const { account_id, url, method, headers } = req.body;
  if (!url || !method || !headers) {
    return res.status(400).json({ error: 'url, method, and headers are required' });
  }

  const query = `
    INSERT INTO destinations (account_id, url, method, headers)
    VALUES (?, ?, ?, ?)
  `;
  db.run(query, [account_id, url, method, JSON.stringify(headers)], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
};

exports.getAllDestinations = (req, res) => {
  db.all('SELECT * FROM destinations', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getDestinationById = (req, res) => {
  db.get('SELECT * FROM destinations WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Destination not found' });
    res.json(row);
  });
};

exports.updateDestination = (req, res) => {
  const { url, method, headers } = req.body;
  const query = `
    UPDATE destinations SET url = ?, method = ?, headers = ?
    WHERE id = ?
  `;
  db.run(query, [url, method, JSON.stringify(headers), req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
};

exports.deleteDestination = (req, res) => {
  db.run('DELETE FROM destinations WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
};

exports.getDestinationsByAccountId = (req, res) => {
  db.all('SELECT * FROM destinations WHERE account_id = ?', [req.params.accountId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};
