import dotenv from 'dotenv';
import express from 'express';
import authMiddleware from '../Middlewares/auth.js';
import Donor from '../Models/Donor.js';

dotenv.config();
const router = express.Router();
router.use(authMiddleware);

router.get('/find/:name', async (req, res) => {
    try {
        const regex = new RegExp("^" + req.params.name.toLowerCase(), "i");
        const donors = await Donor.find({ name: regex, author: req.userId });
        return res.send({ donors });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.get('/get', async (req, res) => {
    try {
        const donors = await Donor.find({ author: req.userId });
        return res.send({ donors });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.post('/post', async (req, res) => {
    const dataValidation = req.body;
    if (
      dataValidation.name?.length < 1 || 
      dataValidation.email?.length < 1 || 
      dataValidation.phone?.length < 1 ||
      !dataValidation.type
    ) {
        return res.status(400).send({ error: 'Quantidade de caracteres preenchido nos campos insuficiente' });
    }
  
    try {
        const data = Object.assign(req.body, { author: req.userId });
        const donor = await Donor.create(data);

        return res.send({ donor });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
      const donor = await Donor.findOne({ _id: req.params.id });
        if (donor.author?._id != req.userId) return res.status(401).send({ error: 'Não autorizado' });

        const data = Object.assign(req.body, { author: req.userId });
        await donor.updateOne(data);

        const updatedDonor = await Donor.findOne({ _id: req.params.id });
        return res.send({ updatedDonor });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});
  
router.delete('/remove/:id', async (req, res) => {
    try {
        const donor = await Donor.findOne({ _id: req.params.id });
        if (donor.author?._id != req.userId) return res.status(401).send({ error: 'Não autorizado' });
        await donor.delete();
        return res.status(200).send({ success: true, message: "Doador deletado com sucesso" });
    } catch (error) {
        console.error(error)
        return res.status(400).send({ error: error });
    }
});

export default router;