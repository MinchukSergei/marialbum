const koa = require('koa');
const cors = require('koa2-cors');
const koaLogger = require('koa-pino-logger');
const fs = require('fs');
const stream = fs.createWriteStream('server.log', {flags: 'a'});

const app = new koa();
const router = require('./router');

app.use(cors());
app.use(koaLogger({stream: stream}));
app.use(router.router.routes());

app.listen(process.env.SERVER_PORT);