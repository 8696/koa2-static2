const utils = require('./utils');
const koaStatic = require('koa-static');
const Koa = require('koa');

function koa2Static2(staticPath, options = {}) {
  return koaStatic(staticPath, options);
}

koa2Static2.install = function (koaApp, staticPath, options = {}) {
  //
  if (!(koaApp instanceof Koa)) {
    throw new Error('the first parameter must be koa instance');
  }
  //
  if (!utils.fsStatSync(staticPath).isDirectory()) {
    throw new Error('no such directory, stat ' + staticPath);
  }
  //
  if (utils.getValueType(options) !== 'object') {
    throw new Error('the third argument must be an object');
  }

  options = Object.assign({
    excludeExtensionCache: ['html']
  }, options);
  koaApp.use(async (ctx, next) => {
    const urlParse = require('url').parse(ctx.request.path);
    const filePath = require('path').join(staticPath, urlParse.pathname);
    const ifModifiedSince = ctx.request.headers['if-modified-since'];
    const ifNoneMatch = ctx.request.headers['if-none-match'];
    try {
      if ((ifModifiedSince || ifNoneMatch) && !utils.checkExtension(options.excludeExtensionCache, filePath)) {
        const fileStat = await utils.fsStat(filePath);
        if (ifModifiedSince === fileStat.ctime.toString() || ifNoneMatch === fileStat.ctime.toString()) {
          ctx.status = 304;
          ctx.body = '';
        }
      }
    } catch (e) {
    }
    await next();
  });

  const setHeaders = options.hasOwnProperty('setHeaders') ? options.setHeaders : function _setHeaders() {
  };
  delete options.setHeaders;
  koaApp.use(koa2Static2(staticPath, {
    setHeaders(response, filePath, stat) {
      setHeaders(response, filePath, stat);
      if (utils.checkExtension(options.excludeExtensionCache, filePath)) {
        response.setHeader('Cache-Control', 'no-cache');
        response.setHeader('Pragma', 'no-cache');
        response.setHeader('Last-Modified', new Date().toString());
        response.setHeader('Etag', new Date().toString());
      } else {
        response.setHeader('Last-Modified', stat.ctime.toString());
        response.setHeader('Etag', stat.ctime.toString());
      }
    },
    ...options
  }));

};


module.exports = koa2Static2;


