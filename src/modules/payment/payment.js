const model = require('./model')
const { bot } = require('../../lib/bot')
const localText = require('../../text/text.json')
const {
   formatBalanceWithSpaces,
   formatDateAdvanced
} = require('../../lib/functions')

module.exports = {
   GET: async (req, res) => {
      try {
         const { partner_id, check_id, profit } = req.params
         const foundPartner = await model.foundPartner(partner_id)
         const foundCheck = await model.foundCheck(check_id)

         if (foundPartner.bot_lang == 'uz' && foundPartner.chat_id) {
            const text = localText.profitInfoTextUz
               .replace(/%method%/g, foundCheck.method)
               .replace(/%user_id%/g, foundCheck.user_id)
               .replace(/%source%/g, foundCheck.source)
               .replace(/%amount%/g, formatBalanceWithSpaces(foundCheck.amount))
               .replace(/%profit%/g, formatBalanceWithSpaces(profit))
               .replace(/%date%/g, formatDateAdvanced(foundCheck.create_at))

            bot.sendMessage(foundPartner.chat_id, text, { parse_mode: "HTML" })
         } else if (foundPartner.bot_lang == 'ru' && foundPartner.chat_id) {
            const text = localText.profitInfoTextRu
               .replace(/%method%/g, foundCheck.method)
               .replace(/%user_id%/g, foundCheck.user_id)
               .replace(/%source%/g, foundCheck.source)
               .replace(/%amount%/g, formatBalanceWithSpaces(foundCheck.amount))
               .replace(/%profit%/g, formatBalanceWithSpaces(profit))
               .replace(/%date%/g, formatDateAdvanced(foundCheck.create_at))

            bot.sendMessage(foundPartner.chat_id, text, { parse_mode: "HTML" })
         } else if (foundPartner.bot_lang == 'eng' && foundPartner.chat_id) {
            const text = localText.profitInfoTextEng
               .replace(/%method%/g, foundCheck.method)
               .replace(/%user_id%/g, foundCheck.user_id)
               .replace(/%source%/g, foundCheck.source)
               .replace(/%amount%/g, formatBalanceWithSpaces(foundCheck.amount))
               .replace(/%profit%/g, formatBalanceWithSpaces(profit))
               .replace(/%date%/g, formatDateAdvanced(foundCheck.create_at))

            bot.sendMessage(foundPartner.chat_id, text, { parse_mode: "HTML" })
         }

         return res.status(200).json({ message: "OK" })

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   }
}