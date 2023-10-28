import express from 'express';
import authMiddleware from '../Middlewares/auth.js';
// import User from '../Models/User.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/find/:email', async (req, res) => {
    
});

router.get('/get', async (req, res) => {
});

router.post('/post', async (req, res) => {
});

export default router;