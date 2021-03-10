import 'module-alias/register';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;

app.listen(port, (): void => console.log(`Server listening on Port: ${port}`));
