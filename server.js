require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();
const localText = require('./src/text/text.json')
const model = require('./model');
const { bot } = require('./src/lib/bot')
const {
   formatBalanceWithSpaces,
} = require('./src/lib/functions');
const router = require("./src/modules");


bot.onText(/\/start/, async (msg) => {
   const chatId = msg.chat.id;
   const foundPartner = await model.foundPartner(chatId)

   if (foundPartner) {
      if (foundPartner.bot_lang == 'uz') {
         bot.sendMessage(chatId, localText.menuTextUz, {
            parse_mode: "HTML",
            reply_markup: {
               keyboard: [
                  [
                     {
                        text: localText.balanceBtnUz
                     }
                  ]
               ]
            }
         })
      } else if (foundPartner.bot_lang == 'ru') {
         bot.sendMessage(chatId, localText.menuTextRu, {
            parse_mode: "HTML",
            reply_markup: {
               keyboard: [
                  [
                     {
                        text: localText.balanceBtnRu
                     }
                  ]
               ]
            }
         })
      } else if (foundPartner.bot_lang == 'eng') {
         bot.sendMessage(chatId, localText.menuTextEng, {
            parse_mode: "HTML",
            reply_markup: {
               keyboard: [
                  [
                     {
                        text: localText.balanceBtnEng
                     }
                  ]
               ]
            }
         })
      }
   } else {
      bot.sendMessage(chatId, localText.startText, {
         parse_mode: "HTML",
         reply_markup: {
            keyboard: [
               [
                  {
                     text: localText.sendContactBtn,
                     request_contact: true
                  }
               ]
            ],
            resize_keyboard: true
         }
      })
   }
})

bot.on('contact', async (msg) => {
   const chatId = msg.chat.id;
   let phoneNumber = msg.contact.phone_number;

   if (!phoneNumber.startsWith('+')) {
      phoneNumber = `+${phoneNumber}`;
   }

   if (msg.contact.user_id == msg.from.id) {
      const foundPartnerByPhone = await model.foundPartnerByPhone(phoneNumber)

      if (foundPartnerByPhone) {
         await model.addChatId(foundPartnerByPhone.id, chatId)
         bot.sendMessage(chatId, localText.chooseLangText, {
            parse_mode: "HTML",
            reply_markup: {
               keyboard: [
                  [
                     {
                        text: '🇺🇿 Uz',
                     },
                     {
                        text: '🇷🇺 Ру',
                     },
                     {
                        text: '🇬🇧 Eng',
                     },
                  ],
               ],
               resize_keyboard: true,
               one_time_keyboard: true,
            },
         })
      } else {
         bot.sendMessage(chatId, localText.notfoundPartnerText)
      }
   } else {
      bot.sendMessage(chatId, localText.incorrectContactText)
   }
})

bot.on('message', async (msg) => {
   const chatId = msg.chat.id;
   const text = msg.text;
   const foundPartner = await model.foundPartner(chatId)

   if (text == '🇺🇿 Uz') {
      bot.sendMessage(chatId, localText.startTextUz, {
         parse_mode: "HTML",
         reply_markup: {
            keyboard: [
               [
                  {
                     text: localText.balanceBtnUz
                  }
               ]
            ]
         }
      }).then(async () => {
         await model.addLang(foundPartner.id, 'uz')
      })
   } else if (text == '🇷🇺 Ру') {
      bot.sendMessage(chatId, localText.startTextRu, {
         parse_mode: "HTML",
         reply_markup: {
            keyboard: [
               [
                  {
                     text: localText.balanceBtnRu
                  }
               ]
            ]
         }
      }).then(async () => {
         await model.addLang(foundPartner.id, 'ru')
      })
   } else if (text == '🇬🇧 Eng') {
      bot.sendMessage(chatId, localText.startTextEng, {
         parse_mode: "HTML",
         reply_markup: {
            keyboard: [
               [
                  {
                     text: localText.balanceBtnEng
                  }
               ]
            ]
         }
      }).then(async () => {
         await model.addLang(foundPartner.id, 'eng')
      })
   } else if (text == localText.balanceBtnUz) {
      const balanceText = localText.balanceTextUz.replace(/%balance%/g, formatBalanceWithSpaces(foundPartner.balance))
      bot.sendMessage(chatId, balanceText)
   } else if (text == localText.balanceBtnRu) {
      const balanceText = localText.balanceTextRu.replace(/%balance%/g, formatBalanceWithSpaces(foundPartner.balance))
      bot.sendMessage(chatId, balanceText)
   } else if (text == localText.balanceBtnEng) {
      const balanceText = localText.balanceTextEng.replace(/%balance%/g, formatBalanceWithSpaces(foundPartner.balance))
      bot.sendMessage(chatId, balanceText)
   }
})

app.use(cors({
   origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({
   extended: true
}));
app.use("/api/v1", router);

app.listen(4145, console.log(4145))