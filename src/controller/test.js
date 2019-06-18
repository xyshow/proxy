import Base from './base.js';

export default class extends Base {
    
    constructor(router) {
        super();
        this.router = router;
        this.router.post('/test', this.test);
    }

    async test(ctx, next) {
        console.log(ctx.request.body);
        super.sendJson(ctx.request.body, ctx);
    }

}