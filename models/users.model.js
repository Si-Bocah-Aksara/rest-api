const Sequelize = require('sequelize');
const sequelize = require('../db'); // Import koneksi database

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  UUID: {
    type: Sequelize.UUID,
    allowNull: false
  },
  nama_lengkap: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  username: {
    type: Sequelize.STRING(25),
    allowNull: false,
    unique: true
  },
  pass: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  fk_data_anak: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'u_akun', // Nama tabel database
  timestamps: false // Kolom createdAt dan updatedAt
});

module.exports = User;