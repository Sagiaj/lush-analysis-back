import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';

export class AppConfigUtility {
    static init (app: any) {
        app.use(cors(import('../config/cors')));
        app.use(compression());
        app.use(bodyParser.json());
    }
}
