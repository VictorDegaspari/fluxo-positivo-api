import express from 'express';
import authMiddleware from '../Middlewares/auth.js';
// import Product from '../Models/Product.js';

const router = express.Router();
router.use(authMiddleware);

router.post('/post', async (req, res) => {
});

router.get('/search/:title', async (req, res) => {
});

router.get('/get', async (req, res) => {
});

router.get('/find/:id', async (req, res) => {
});

router.patch('/update/:id', async (req, res) => {
});

router.delete('/remove/:id', async (req, res) => {
});

export default router;