import dotenv from 'dotenv';
import express from 'express';
import authMiddleware from '../Middlewares/auth.js';
import Stock from '../Models/Stock.js';
import StockHistory from '../Models/StockHistory.js';

dotenv.config();
const router = express.Router();
router.use(authMiddleware);

router.get('/find/:name', async (req, res) => {
    try {
        const regex = new RegExp("^" + req.params.name.toLowerCase(), "i");
        const stocks = await Stock.find({ name: regex, author: req.userId });
        return res.send({ stocks });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.get('/get', async (req, res) => {
    try {
        const [stocks, stocks_history] = await Promise.all([
            Stock.find({ author: req.userId }).populate('product'),
            StockHistory.find({ author: req.userId })
                .sort({ created: -1 })
                .populate('product')
        ]);

        return res.send({ stocks, stocks_history });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.post('/post', async (req, res) => {
    const dataValidation = req.body;
    if (
      !dataValidation.product || 
      dataValidation.quantity <= 0
    ) {
        return res.status(400).send({ error: 'Quantidade de caracteres preenchido nos campos insuficiente' });
    }
  
    const stock = await Stock.findOne({ product: dataValidation.product });
    if (stock && stock._id) {
        return res.status(400).send({ error: 'Já existe esse produto no estoque!' });
    }

    try {
        const data = Object.assign(req.body, { author: req.userId });
        const stock = await Stock.create(data);
        await stock.populate('product');

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

        if (stock?.quantity >= 0 && data?.quantity >= 0) {
            if (stock.quantity === data.quantity) {
                return res.status(401).send({ error: 'Quantidades não podem ser iguais' });
            }

            let type = 'outflow';
            let showWarning = false;

            if (data.quantity > stock.quantity) {
                type = 'inflow';
            } else {
                type = 'outflow';
            }

            if (data.quantity <= 10) {
                showWarning = true;
            }
            await StockHistory.create({
                author: req.userId,
                last_quantity: stock.quantity,
                product: stock.product,
                quantity: data.quantity,
                type: type,
                stock: stock._id,
                warning_quantity: showWarning
            });
        } else {
            return res.status(401).send({ error: 'Quantidades inválidas' });
        }

        await stock.updateOne(data);

        const [updatedStock, stockHistory] = await Promise.all([
            Stock.findOne({ _id: req.params.id }).populate('product'),
            StockHistory.findOne({ stock: stock._id })
                .sort({ created: -1 })
                .populate('product')
        ]);

        return res.send({ updatedStock, stockHistory });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});
  
router.delete('/remove/:id', async (req, res) => {
    try {
        const stock = await Stock.findOne({ _id: req.params.id });
        if (stock.author?._id != req.userId) return res.status(401).send({ error: 'Não autorizado' });

        await Promise.all([ 
            StockHistory.deleteMany({ product: stock.product }),
            stock.delete()
        ]);

        return res.status(200).send({ success: true, message: "Stock deleted successfully" });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

export default router;