import express from 'express';
import authMiddleware from '../Middlewares/auth.js';
import User from '../Models/User.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/find/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        return res.send({ user });
        
    } catch (error) {
        return res.status(400).send({ error });
    }
});

router.get('/get', async (req, res) => {
    try {
        const users = await User.find();
        return res.send({ users });
        
    } catch (error) {
        return res.status(400).send({ error });
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (user._id != req.userId) return res.status(401).send({ error: 'Nao autorizado' });
      await user.updateOne(req.body);
      const updatedUser = await User.findOne({ _id: req.params.id });
      return res.send({ updatedUser });
    } catch (error) {
      console.error(error)
      return res.status(400).send({ error: error });
    }
});

export default router;