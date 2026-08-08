const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongodb = require("../db/connect");

const configurePassport = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const usersCollection = mongodb
            .getDb()
            .collection("users");

          let user = await usersCollection.findOne({
            googleId: profile.id
          });

          if (!user) {
            const newUser = {
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails?.[0]?.value || null,
              photo: profile.photos?.[0]?.value || null,
              createdAt: new Date()
            };

            const result = await usersCollection.insertOne(newUser);

            user = {
              _id: result.insertedId,
              ...newUser
            };
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.googleId);
  });

  passport.deserializeUser(async (googleId, done) => {
    try {
      const user = await mongodb
        .getDb()
        .collection("users")
        .findOne({ googleId });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });
};

module.exports = configurePassport;