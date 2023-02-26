const { model, Schema } = require("mongoose");

module.exports = model("ticketSystem", new Schema({

    GuildID: String,
    MemberID: String,
    TicketID: String,
    ChannelID: String,
    Type: String,

}));