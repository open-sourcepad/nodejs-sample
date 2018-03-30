const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models').User;


module.exports = (passport) => {
  let opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBeareToken();
  opts.secretOrKey = CONFIG.jwt.encryption;

  passport.use(new JwtStrategy(opts, async(payload, done) => {
    let err, user;

    [err, user] = await to(User.findById(payload.user_id));
    console.log('User ID: ', user.id);

    if (err) return done(err, false);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }));
};
