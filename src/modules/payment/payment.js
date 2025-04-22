const model = require('./model')
const { bot } = require('../../lib/bot')
const localText = require('../../text/text.json')
const { formatBalanceWithSpaces } = require('../../lib/functions')

module.exports = {
   GET: async (req, res) => {
      try {
         const { partner_id, check_id, profit } = req.params
         const foundPartner = await model.foundPartner(partner_id)
         const foundCheck = await model.foundCheck(check_id)

         if (foundPartner.bot_lang == 'uz') {
            const text = localText.profitInfoTextUz
               .replace(/%method%/g, foundCheck.method)
               .replace(/%user_id%/g, foundCheck.user_id)
               .replace(/%amount%/g, formatBalanceWithSpaces(foundCheck.amount))
               .replace(/%profit%/g, formatBalanceWithSpaces(profit))
               .replace(/%date%/g, foundCheck.date)

            bot.sendMessage(foundPartner.chat_id, text)
         } else if (foundPartner.bot_lang == 'ru') {
            const text = localText.profitInfoTextRu
               .replace(/%method%/g, foundCheck.method)
               .replace(/%user_id%/g, foundCheck.user_id)
               .replace(/%amount%/g, formatBalanceWithSpaces(foundCheck.amount))
               .replace(/%profit%/g, formatBalanceWithSpaces(profit))
               .replace(/%date%/g, foundCheck.date)

            bot.sendMessage(foundPartner.chat_id, text)
         } else if (foundPartner.bot_lang == 'eng') {
            const text = localText.profitInfoTextEng
               .replace(/%method%/g, foundCheck.method)
               .replace(/%user_id%/g, foundCheck.user_id)
               .replace(/%amount%/g, formatBalanceWithSpaces(foundCheck.amount))
               .replace(/%profit%/g, formatBalanceWithSpaces(profit))
               .replace(/%date%/g, foundCheck.date)

            bot.sendMessage(foundPartner.chat_id, text)
         }

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   }
}