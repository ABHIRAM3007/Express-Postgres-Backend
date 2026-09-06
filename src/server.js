import 'dotenv/config';
import { app } from './app.js';
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Catalog API listening on port ${port}`));