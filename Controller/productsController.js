import dotenv from 'dotenv';
import express from 'express';
import authMiddleware from '../Middlewares/auth.js';
import Product from '../Models/Product.js';
import Stock from '../Models/Stock.js';

dotenv.config();
const router = express.Router();
router.use(authMiddleware);

router.post('/post', async (req, res) => {
  const dataValidation = req.body || {};
  console.log(dataValidation)
  if (
    dataValidation.name?.length < 3 ||
    !dataValidation.type ||
    !dataValidation.size
  ) {
    return res.status(400).send({ error: 'Quantidade de caracteres preenchido nos campos insuficiente' });
  }

  try {
    const data = Object.assign(req.body, { author: req.userId });

    const product = await Product.create(data);

    return res.send({ product });
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: error });
  }
});

router.get('/search/:name', async (req, res) => {
  try {
    const regex = new RegExp("^" + req.params.name.toLowerCase(), "i");
    const products = await Product.find({ name: regex });
    return res.send({ products });
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: error });
  }
});

router.get('/get', async (req, res) => {
  try {
    const products = await Product.find({ author: req.userId });
    return res.send({ products });
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: error });
  }
});

router.get('/find/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate('author brand');

    return res.send({ product });
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: error });
  }
});

router.patch('/update/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate('author brand');
    if (product.author?._id != req.userId) return res.status(401).send({ error: 'Nao autorizado' });

    const data = Object.assign(req.body, { author: req.userId });
    await product.updateOne(data);

    const updatedProduct = await Product.findOne({ _id: req.params.id }).populate('author brand');
    return res.send({ updatedProduct });
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: error });
  }
});

router.delete('/remove/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate('author');
    if (product.author?._id != req.userId) return res.status(401).send({ error: 'Nao autorizado' });
    const stock = await Stock.findOne({ product: req.params.id});
    if (stock && stock._id) {
      await stock.delete();
    }
    await product.delete();
    return res.status(200).send({ success: true, message: "Produto deletado com sucesso" });
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: error });
  }
});

export default router;
