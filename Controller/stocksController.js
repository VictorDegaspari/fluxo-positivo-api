import dotenv from 'dotenv';
import express from 'express';
import authMiddleware from '../Middlewares/auth.js';
import Stock from '../Models/Stock.js';

dotenv.config();
const router = express.Router();
router.use(authMiddleware);

router.get('/find/:name', async (req, res) => {
    try {
        const regex = new RegExp("^" + req.params.name.toLowerCase(), "i");
        const donors = await Stock.find({ name: regex, author: req.userId });
        return res.send({ donors });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.get('/get', async (req, res) => {
    try {
        const donors = await Stock.find({ author: req.userId }).populate('product brand');
        return res.send({ donors });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.post('/post', async (req, res) => {
    const dataValidation = req.body;
    if (
      dataValidation.name.length < 3 ||
      !dataValidation.product || 
      dataValidation.quantity <= 0
    ) {
        return res.status(400).send({ error: 'Quantidade de caracteres preenchido nos campos insuficiente' });
    }
  
    try {
        const data = Object.assign(req.body, { author: req.userId });
        const stock = await Stock.create(data);

        return res.send({ stock });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
      const stock = await Stock.findOne({ _id: req.params.id });
        if (stock.author?._id != req.userId) return res.status(401).send({ error: 'Não autorizado' });

        const data = Object.assign(req.body, { author: req.userId });
        await stock.updateOne(data);

        const updatedStock = await Stock.findOne({ _id: req.params.id }).populate('product');
        return res.send({ updatedStock });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});
  
router.delete('/remove/:id', async (req, res) => {
    try {
        const stock = await Stock.findOne({ _id: req.params.id });
        if (stock.author?._id != req.userId) return res.status(401).send({ error: 'Não autorizado' });
        await stock.delete();
        return res.status(200).send({ success: true, message: "Doador deletado com sucesso" });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

export default router;