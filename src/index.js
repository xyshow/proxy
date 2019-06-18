import memeye from 'memeye';
import constants from './utils/static-utils';
import chalk from 'chalk';
import Koa from 'koa';
import convert from 'koa-convert';
import router from './router';
import proxy from "koa-better-http-proxy";
import config from './config/config'
import resultUtils from './utils/result-utils';
import start from './start';

// 内存监控
// memeye();

const doneLog = chalk.bgGreen.black(' DONE ') + ' ';
const errorLog = chalk.bgRed.black(' ERROR ') + ' ';
const okayLog = chalk.bgBlue.black(' OKAY ') + ' ';
let targetHost = null;
let path = null;

start.init();

const app = new Koa();
app.use(async (ctx, next) => {
    // const from = httpUtils.getHeader(ctx.headers, 'from');
    const start = Date.now();
    await next();
    if (ctx.request.header.origin) {
        resultUtils.cors(ctx, ctx.request.header.origin);
    } else {
        resultUtils.cors(ctx, '*');
    }
    const ms = Date.now() - start;
    if (ctx.body) {
        console.log(ctx.body.toString());
    }
    console.log(`${doneLog} ${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(async (ctx, next) => {
    if (ctx.method === 'OPTIONS') {
        ctx.status = 200;
    } else {
        await next();
    }
});

app.use(async (ctx, next) => {
    for (let proxyItem of config.proxy) {
        if (ctx.originalUrl.indexOf(proxyItem.projectName) > -1) {
            targetHost = proxyItem.host;
            path = ctx.url;
            break;
        }
    }
    await next();
});

async function setProxyUrl(ctx, next) {
    if (targetHost) {
        delete ctx.headers.origin;
        delete ctx.headers.referer;
        console.log('target:', targetHost);
        return proxy(targetHost, {
            timeout: 60000,
            headers: {
                'Origin': targetHost,
                'Referer': path
            },
            limit: '100mb'
        })(ctx, next);
    }
    return () => {}
    await next();
}

app.use(setProxyUrl);

app.use(convert(router.routes()));
app.use(convert(router.allowedMethods()));

app.listen(8070);