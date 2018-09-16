const express = require('express');
const voice = require('./routes/voice.route');

const app = express();

app.get('/', (req, res) => res.send('Hello World'));
app.use('/submission', voice);

let port = 1234;
app.listen(port, () => console.log('Server is on ' + port));
