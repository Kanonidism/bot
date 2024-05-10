const { model, Schema } = require('mongoose');

const mp3Schema = new Schema({
    GuildId: String,
    YtSongs: Number,
    SpotifySongs: Number
})

module.exports = model('mp3Schema', mp3Schema);