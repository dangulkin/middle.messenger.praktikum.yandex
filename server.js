import express, { static } from 'express';
import path from 'path';
const app = express();
const PORT = 3000;

app.use(static('dist'));
app.use(static('static'));

app.use('/assets/static', static(__dirname + '/static'));

app.use('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});


// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
