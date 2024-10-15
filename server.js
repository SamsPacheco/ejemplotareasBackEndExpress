
require('dotenv').config({ path: './config.env' });
import express, { json } from 'express';
import cors from 'cors';
// get MongoDB driver connection
import { connectToServer } from './db/conn';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(json());
app.use(require('./routes/record'));

// Global error handling
app.use(function (err, _req, res) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// perform a database connection when the server starts
connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    app.emit
    // app.emit("appStarted");
    app.emit("appStarted");
  });
});

module.exports = app;