import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { AppConfigUtility } from './utilities/app-config-utility';
import * as routes from './routes';

// Create an http server
const app = express();

// Initialize all app configurations
AppConfigUtility.init(app);

// Apply routes
app.use('/analysis', routes.analysisRoutes);

// listen
app.listen(process.env.PORT || 8080, () => {
    console.log(`server listening on port ${process.env.PORT}`);
});
