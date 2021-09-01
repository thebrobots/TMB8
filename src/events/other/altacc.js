const ms = require("ms")

module.exports = async (member) => {

    const timeSpan = ms(days)
    const createdAt = new Date(member.user.createdAt).getTime()

    const diff = Date.now() - createdAt

    if(diff < timeSpan) {
        member.send(`The server staff has set thee minimum account age to join to ${days}\n Try to join again when your account passes the required days`)
        member.kick("Account age is lower than the required age to join the server")
    }
}