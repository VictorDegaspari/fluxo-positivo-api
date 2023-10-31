import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './Controller/authController.js';
import brandRoutes from './Controller/brandsController.js';
import donorRoutes from './Controller/donorsController.js';
import productRoutes from './Controller/productsController.js';
import stockRoutes from './Controller/stocksController.js';
import usersRoutes from './Controller/usersController.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

// ROUTES
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/stocks', stockRoutes);
app.use('/brands', brandRoutes);
app.use('/donors', donorRoutes);

// CONFIG
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(express.static('/public'));
app.use(express.static('/uploads'));

app.get('/', (req, res) => {
    res.send('OK');
})

app.listen(PORT, () => {
    console.log('Server running at ' + (process.env.PORT || 3001));
});
