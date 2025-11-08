const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

dotenv.config();

// MIDDLEWARES
app.use(express.json());

// ROUTERS
const userRouter = require('./router/user.router');
const articleRouter = require('./router/article.router');

// MONGO
mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
  .then(() => console.log('Connexion à mongo réussi'))
  .catch(error => console.log(error.message))

// PORT
const PORT = process.env.PORT || 8080;

// PREFIX
app.use('/api/user', userRouter);
app.use('/api/article', articleRouter);

// LISTEN
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
