import * as express from 'express'

const app = express();

console.log('come on mate... ',process.pid)

app.use(express.static('host-package'));
app.get('/favicon.ico', (req, res) => {
  res.sendFile(`${__dirname}/favicon.ico`)
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
