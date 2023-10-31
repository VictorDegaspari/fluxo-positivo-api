import dotenv from 'dotenv';
import express from 'express';
import authMiddleware from '../Middlewares/auth.js';
import Brand from '../Models/Brand.js';

dotenv.config();
const router = express.Router();
router.use(authMiddleware);

router.get('/find/:name', async (req, res) => {
  try {
    const regex = new RegExp("^" + req.params.name.toLowerCase(), "i");
    const brands = await Brand.find({ name: regex, author: req.userId });
    return res.send({ brands });
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: error });
  }
});

router.get('/get', async (req, res) => {
  try {
    const brands = await Brand.find({ author: req.userId });
    return res.send({ brands });
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: error });
  }
});

router.post('/post', async (req, res) => {
  const dataValidation = req.body;
  if (
    dataValidation.name.length < 3
  ) {
    return res.status(400).send({ error: 'Quantidade de caracteres preenchido nos campos insuficiente' });
  }

  try {
    const data = Object.assign(req.body, { author: req.userId });
    const brand = await Brand.create(data);

    return res.send({ brand });
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: error });
  }
});

router.patch('/update/:id', async (req, res) => {
  try {
    const brand = await Brand.findOne({ _id: req.params.id }).populate('author');
    if (brand.author?._id != req.userId) return res.status(401).send({ error: 'Não autorizado' });

    const data = Object.assign(req.body, { author: req.userId });
    await brand.updateOne(data);

    const updatedBrand = await Brand.findOne({ _id: req.params.id }).populate('author');
    return res.send({ updatedBrand });
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: error });
  }
});

router.delete('/remove/:id', async (req, res) => {
  try {
    const brand = await Brand.findOne({ _id: req.params.id });
    if (brand.author?._id != req.userId) return res.status(401).send({ error: 'Não autorizado' });
    await brand.delete();
    return res.status(200).send({ success: true, message: "Marca deletada com sucesso" });
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: error });
  }
});

export default router;