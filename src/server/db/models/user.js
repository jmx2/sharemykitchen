const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  twitter_id: String,
  google_id: String,
  facebook_uid: String,
  picture: String,
  name: String,
  email: String,
  guest: Boolean,
  host: Boolean,
  guest_info: Object,
  host_info: Object,
})

const User = mongoose.model('User', UserSchema)

export default User
