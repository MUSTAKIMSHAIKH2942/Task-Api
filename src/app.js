const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
