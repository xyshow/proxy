import Router from 'koa-router';
import Test from './controller/test';

const router = new Router();
// 测试mock模块
new Test(router);

router.get('/', async (ctx, next) => {
    ctx.body = 'api proxy server';
});


export default router;