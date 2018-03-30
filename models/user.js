const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');


module.exports = (sequelize, DataTypes) => {


  const Model = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Model.associate = (models) => {
    // associations can be defined here
  };


  Model.beforeSave(async (obj, opts) => {
    let err;

    if (obj.changed('password')) {
      let salt, hash;

      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) throwError(err.message, true);

      [err, hash] = await to(bcrypt.hash(obj.password, salt));
      if (err) throwError(err.message, true);

      user.password = hash;
    }
  });


  Model.prototype.comparePassword = async (pw) => {
    if (!this.password) throwError('password not set');

    let err, pass;
    [err,pass] = await to(bcrypt_p.compare(pw, this.password));
    if (err) throwError(err);
    if (!pass) throwError('Invalid credentials');

    return this;
  };


  Model.prototype.getJWT = () => {
    let expTime =  CONFIG.jwt.expiration >> 0;
    return "Bearer " + jwt.sign({ user_id: this.id });
  };


  Model.prototype.toWeb = (pw) => {
    this.toJson();
  };


  return Model;
};
