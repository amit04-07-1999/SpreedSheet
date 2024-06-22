const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models'); // Corrected to require the index file of models directory
const cellRoutes = require('./routes/cellRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', cellRoutes);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
