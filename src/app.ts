import './env';

import * as cors from 'cors';
import * as helmet from 'helmet';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import routes from './routes';

import * as errorHandler from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// API Routes
app.use('/', routes);

// Error Middlewares
// app.use(errorHandler.customError);
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFound);

export default app;
