import express from 'express'
import passport from 'passport'
import passportFacebook from 'passport-facebook'
import passportGoogle from 'passport-google-oauth'
import passportTwitter from 'passport-twitter'
import https from 'https'

import User from '../db/models/user'
import authRequired from '../middlewares/authRequired'

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  GOOGLE_KEY,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_CALLBACK_URL,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_CALLBACK_URL,
} from '../../shared/config'

import {
  AUTH_GOOGLE,
  AUTH_GOOGLE_CALLBACK,
  AUTH_TWITTER,
  AUTH_TWITTER_CALLBACK,
  AUTH_FACEBOOK,
  AUTH_FACEBOOK_CALLBACK,
  AUTH_ME,
  AUTH_LOGOUT,
  HOME_PAGE_ROUTE,
} from '../../shared/routes'

const FacebookStrategy = passportFacebook.Strategy
const TwitterStrategy = passportTwitter.Strategy
const GoogleStrategy = passportGoogle.OAuth2Strategy

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'displayName', 'emails', 'picture.type(large)'],
}, (accessToken, refreshToken, profile, done) => {
  User
    .findOneAndUpdate(
    { email: profile.emails[0].value },
    {
      facebook_uid: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      picture: profile.photos[0].value
    },
    { new: true, upsert: true },
    )
    .then(done.bind(null, null))
    .catch(done)
}))

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    User
      .findOneAndUpdate(
      { email: profile.emails[0].value },
      {
        google_id: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        picture: profile.photos[0].value.slice(0, -2) + '200'
      },
      { new: true, upsert: true },
      )
      .then(done.bind(null, null))
      .catch(done)
  }
))

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: TWITTER_CALLBACK_URL
  },
  function(token, tokenSecret, profile, done) {
    console.log(profile)
    User
      .findOneAndUpdate(
      { twitter_id: profile.id },
      {
        twitter_id: profile.id,
        email: profile.email,
        name: profile.displayName,
        picture: profile.photos[0].value
      },
      { new: true, upsert: true },
      )
      .then(done.bind(null, null))
      .catch(done)
  }
))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User
    .findById(id)
    .then((user) => {
      console.log('USER IS #################################### ', user)
      done(null, {
        _id: user._id,
        name: user.name || undefined,
        email: user.email || undefined,
        picture: user.picture
      })
    })
})

const router = express.Router()

router.get(AUTH_FACEBOOK, passport.authenticate('facebook', { authType: 'rerequest', scope: ['email', 'public_profile'] }))
router.get(AUTH_FACEBOOK_CALLBACK, passport.authenticate('facebook', { successRedirect: HOME_PAGE_ROUTE }))

router.get(AUTH_GOOGLE, passport.authenticate('google', { scope: ['email profile'] }))
router.get(AUTH_GOOGLE_CALLBACK, passport.authenticate('google', { successRedirect: HOME_PAGE_ROUTE }))

router.get(AUTH_TWITTER, passport.authenticate('twitter', {scope: ['profile']}));
router.get(AUTH_TWITTER_CALLBACK, passport.authenticate('twitter', { successRedirect: HOME_PAGE_ROUTE }))

router.get(AUTH_ME, authRequired, (req, res) => {
  res.json(req.user)
})

router.get(AUTH_LOGOUT, (req, res) => {
  const from = req.query.from
  req.logout()
  if (from) {
    res.redirect(from)
    return
  }
  res.redirect(HOME_PAGE_ROUTE)
})

export default router
