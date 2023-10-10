import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import router from './router/index.router'

dotenv.config()
const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(cors())
app.use(express.json())
app.use('/', router());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
