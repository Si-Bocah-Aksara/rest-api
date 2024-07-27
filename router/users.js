const express = require('express')
const router = express.Router()
const User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');//input ke variable biar bisa jadi bentuk json
const uuid = require('uuid');//bikin UUID

router.use(bodyParser.json());

/**router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    const hideThePass = users.map(user => {
      const userWithoutPassword = Object.assign({}, user.toJSON());
      delete userWithoutPassword.pass;
      return userWithoutPassword;
    });
    res.json(hideThePass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mengambil data user' });
  }
});**/
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
    const userWithoutPassword = Object.assign({}, user.toJSON());
    delete userWithoutPassword.pass
    res.json({ message: 'Login Berhasil', user: userWithoutPassword });
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
router.put('/:UUID/passwordChange', async (req, res) => {
  const { UUID } = req.params;
  const { passLama, passBaru } = req.body;
  const hashedPass = await bcrypt.hash(passBaru, 10);
  try {
    const user = await User.findOne({ where: { UUID } });
    if (!user) {
      return res.status(404).json({ message: 'Username tidak ditemukan' });
    }
    const isPasswordValid = await bcrypt.compare(passLama, user.pass);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password lama salah, Harap cek kembali' });
    }

    await User.update({ pass: hashedPass }, { where: { UUID } });
    res.json({ message: 'Password berhasil diubah' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mengubah password' });
  }
});
router.put('/:UUID/nama_lengkap', async (req, res) => {
    const { UUID } = req.params;
    const { nama_lengkap } = req.body;
    try {
      await User.update({ nama_lengkap }, { where: { UUID } });
      res.json({ message: 'Nama lengkap berhasil diubah' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal mengubah nama lengkap' });
    }
  });
  router.put('/:UUID/gantiUsername', async (req, res) => {
    const { UUID } = req.params;
    const { username } = req.body;
  
    try {
      console.log(req.body.username);
      const userCharLength = req.body.username.length;
      console.log(userCharLength)
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser && existingUser.UUID !== UUID) {
        return res.status(400).json({ message: 'Username sudah digunakan' });
      }
      if (userCharLength <=5){
        return res.status(400).json({ message: 'Harap mengisi username anda minimal 6 karakter' });
      }
      
      await User.update({ username }, { where: { UUID } });
      res.json({ message: 'Username berhasil diubah' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal mengubah username' });
    }
  });
router.delete('/:UUID', async (req, res) => {
    const { UUID } = req.params;
  
    try {
      await User.destroy({ where: { UUID } });
      res.json({ message: 'Akun berhasil dihapus' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal menghapus akun' });
    }
  });

module.exports = router
