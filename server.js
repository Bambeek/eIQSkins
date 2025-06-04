const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const axios = require('axios');
const path = require('path');
require('dotenv').config();

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new SteamStrategy({
  returnURL: process.env.RETURN_URL || 'http://localhost:3000/auth/steam/return',
  realm: process.env.REALM || 'http://localhost:3000/',
  apiKey: process.env.STEAM_API_KEY || ''
}, function(identifier, profile, done) {
  process.nextTick(() => {
    profile.identifier = identifier;
    return done(null, profile);
  });
}));

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || 'changeme',
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/steam', passport.authenticate('steam'), (req, res) => {});

app.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

app.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.get('/user', (req, res) => {
  res.json({ user: req.user || null });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.status(401).json({ error: 'Not authenticated' });
}

app.get('/inventory', ensureAuthenticated, async (req, res) => {
  try {
    const url = `https://steamcommunity.com/inventory/${req.user.id}/730/2?l=english&count=5000`;
    const { data } = await axios.get(url);
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
