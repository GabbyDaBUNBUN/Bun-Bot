const { model, Schema } = require("mongoose");

module.exports = model("characterCreation", new Schema({

    GuildID: String,
    MemberID: String,
    Name: String,
    Avatar: String,
    Proxy: String,

}));