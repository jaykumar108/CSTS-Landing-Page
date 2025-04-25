const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Local strategy with email as username field
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        // Find user by email
        const user = await User.findOne({ email }).select('+password');

        // Check if user exists
        if (!user) {
          return done(null, false, { message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
          return done(null, false, { message: 'Invalid credentials' });
        }

        // Remove password from response
        user.password = undefined;

        // Return user if authenticated
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport; 