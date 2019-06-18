import resultUtils from '../utils/result-utils';
import config from '../config/config';

export default class BaseController {

    constructor() {

    }

    /**
     * 返回json数据
     * @param {*} obj 
     * @param {*} ctx 
     */
    sendJson(obj, ctx) {
        resultUtils.cors(ctx);
        ctx.type = 'application/json';
        ctx.body = JSON.stringify(obj);
        ctx.status = 200;
    }

    /**
     * 判断是否为空
     * @param {*String} str 
     */
    isNull(str) {
        if (!str || str === null || str === undefined) {
            return true;
        }
    }

    /**
     * 返回错误信息给前端
     * @param {*String} errorStr 
     * @param {*Integer} errorCode 
     * @param {*} ctx 
     */
    error(errorStr, errorCode, ctx) {
        resultUtils.cors(ctx);
        ctx.type = 'application/json';
        ctx.body = JSON.stringify({ message: errorStr, code: errorCode, ttl: 1 });
        ctx.status = 500;
    }

    /**
     * 返回成功信息给前端
     * @param {*} ctx 
     */
    success(ctx) {
        resultUtils.cors(ctx);
        ctx.type = 'application/json';
        ctx.body = JSON.stringify({success: true, msg: ''});
        ctx.status = 200;
    }

    /**
     * 获取时间戳
     * @returns {Number}
     */
    getTime() {
        return parseInt(Date.now() / 1000);
    }

    /**
     * 获取项目名称
     * @returns {String}
     */
    getProjectName() {
        return config.projectName;
    }

}