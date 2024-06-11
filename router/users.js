const express = require('express')
const router = express.Router()
const User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');//input ke variable biar bisa jadi bentuk json
const uuid = require('uuid');//bikin UUID

router.use(bodyParser.json());

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mengambil data user' });
  }
});
router.post('/login', async (req, res) => {
  const { username, pass } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'Username tidak ditemukan' });
    }

    const isPasswordValid = await bcrypt.compare(pass, user.pass);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password salah' });
    }

    res.json({ message: 'Login berhasil', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal login' });
  }
});
router.post('/login', async (req, res) => {
  const { username, pass } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'Username tidak ditemukan' });
    }

    const isPasswordValid = await bcrypt.compare(pass, user.pass);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password salah' });
    }

    res.json({ message: 'Login berhasil', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal login' });
  }
});
router.post('/register', async (req, res) => {
  const { nama_lengkap, username, pass} = req.body;
  const hashedPass = await bcrypt.hash(pass, 10);
  const buatUUID = uuid.v4();
  try {
    await User.create({ nama_lengkap, username, pass: hashedPass, UUID: buatUUID});
    res.json({ message: 'Daftar akun berhasil' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mendaftar akun' });
  }
});
router.put('/:id/password', async (req, res) => {
  const { id } = req.params;
  const { pass } = req.body;
  const hashedPass = await bcrypt.hash(pass, 10);
  try {
    await User.update({ pass: hashedPass }, { where: { id } });
    res.json({ message: 'Password berhasil diubah' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mengubah password' });
  }
});
router.put('/:id/nama_lengkap', async (req, res) => {
    const { id } = req.params;
    const { nama_lengkap } = req.body;
  
    try {
      await User.update({ nama_lengkap }, { where: { id } });
      res.json({ message: 'Nama lengkap berhasil diubah' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal mengubah nama lengkap' });
    }
  });
  router.put('/:id/username', async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;
  
    try {
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser && existingUser.id !== id) {
        return res.status(400).json({ message: 'Username sudah digunakan' });
      }
      await User.update({ username }, { where: { id } });
      res.json({ message: 'Username berhasil diubah' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal mengubah username' });
    }
  });
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await User.destroy({ where: { id } });
      res.json({ message: 'Akun berhasil dihapus' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal menghapus akun' });
    }
  });

module.exports = router
