export default {

    jsonResult(result) {
        if (result && result.code === 0) {
            result.data = JSON.parse(result.data);
            result.status = true;
        } else {
            result.status = false;
        }
    },

    cors(ctx, origin) {
        ctx.set('Access-Control-Allow-Origin', origin);
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, from');
        ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,PATCH,OPTIONS');
        ctx.set('Access-Control-Allow-Credentials', 'true');
    }

}
