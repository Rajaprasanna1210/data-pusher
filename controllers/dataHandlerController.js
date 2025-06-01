const db = require('../db/database');
const axios = require('axios');

exports.handleIncomingData = (req, res) => {
  const token = req.headers['cl-x-token'];
  const data = req.body;

  if (!token) {
    return res.status(401).json({ error: 'Un Authenticate' });
  }

  if (typeof data !== 'object') {
    return res.status(400).json({ error: 'Invalid Data' });
  }

  const accountQuery = 'SELECT * FROM accounts WHERE secret_token = ?';

  db.get(accountQuery, [token], (err, account) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!account) return res.status(404).json({ error: 'Account not found' });

    db.all('SELECT * FROM destinations WHERE account_id = ?', [account.account_id], async (err, destinations) => {
      if (err) return res.status(500).json({ error: err.message });

      for (const dest of destinations) {
        try {
          const headers = JSON.parse(dest.headers);
          if (dest.method.toUpperCase() === 'GET') {
            await axios.get(dest.url, {
              headers,
              params: data,
            });
          } else {
            await axios({
              method: dest.method,
              url: dest.url,
              headers,
              data,
            });
          }
        } catch (e) {
          console.error(`Error sending to ${dest.url}`, e.message);
        }
      }

      res.json({ message: 'Data forwarded to destinations.' });
    });
  });
};
