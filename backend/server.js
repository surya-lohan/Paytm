import express from 'express'
import cors from 'cors';
import connectDB from './database/mongoDb/mongoose.js';
import router from './routes/index.js';

connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Backend Server is running');
});

app.use('/api/v1', router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

