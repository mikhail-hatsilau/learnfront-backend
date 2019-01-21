import app from './app';
import { PORT } from './config/env';

app.listen(PORT, () => {
    console.info(`App is listening on ${PORT} port`);
});