const express = require('express');
const dotenv = require('dotenv');
const db = require('./db/database');

dotenv.config();
const app = express();
app.use(express.json());

const accountRoutes = require('./routes/accountRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const dataHandler = require('./routes/dataHandler');

app.use('/accounts', accountRoutes);
app.use('/destinations', destinationRoutes);
app.use('/', dataHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
