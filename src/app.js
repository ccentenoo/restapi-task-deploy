import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import TasksRoutes from './route/taskroutes';

const app = express();

// stetings
app.set('port', process.env.PORT || 3000);

//Middelwares
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(morgan('dev'));
app.use(express.json()); //para que moongo entienda json
app.use(express.urlencoded({extended: false})); //para que entienda datos enviados desdeun form html

//routes
app.get('/', (req, res) => {
  res.json({ "menssage": "Welcome" });
})

app.use('/api/tasks', TasksRoutes);

export default app;