const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

dotenv.config();

// MIDDLEWARES
app.use(express.json());

// MONGO
mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
  .then(() => console.log('Connexion à mongo réussi'))
  .catch(error => console.log(error.message))

// PORT
const PORT = process.env.PORT || 8080;

// LISTEN
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
