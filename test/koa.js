
const koa2Static2 = require('../src/index');

const Koa = require('koa');

const path = require('path');

const staticPath = path.resolve(__dirname, './static');

const app = new Koa();

// koa2Static2.install(app, staticPath);


// koa2Static2.install(app, staticPath, {
//   maxAge: 10000
// });


// koa2Static2.install(app, staticPath, {
//   maxAge: 10000,
//   excludeExtensionCache: ['html', 'css']
// });

app.use(koa2Static2(staticPath, {
  maxAge: 3000
}));


app.listen(3000);

console.log('http://localhost:3000');