import * as express from 'express'

const app = express();

console.log('come on mate... ',process.pid)

app.use(express.static('host-package'));
app.get('/favicon.ico', (req, res) => {
  res.sendFile(`${__dirname}/favicon.ico`)
})
app.get('*', (req, res) => {
  console.log(`yo dawg, we got a request from ${req.url}`);
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
