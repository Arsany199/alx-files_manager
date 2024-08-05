import express from 'express';
import controllerRouting from './routes/index';

const myapp = express();
const myport = process.env.PORT || 5000;

myapp.use(express.json());

controllerRouting(myapp);

myapp.listen(myport, () => {
  console.log(`Server running on port ${myport}`);
});

export default myapp;
