import config from './config/config';
import developmentConfig from './runtime/config/development';
import productionConfig from './runtime/config/production';

export default {

    init: () => {
        console.log(config);
        if (process.env.NODE_ENV === 'development') {
            for (let key in developmentConfig) {
                config[key] = developmentConfig[key];
            }
        } else if (process.env.NODE_ENV === 'production') {
            for (let key in productionConfig) {
                config[key] = productionConfig[key];
            }
        }
    }

}