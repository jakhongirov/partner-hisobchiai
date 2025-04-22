const { fetch, fetchALL } = require('./src/lib/postgres')

const foundPartner = (chat_id) => {
   const QUERY = `
      SELECT
         *
      FROM
         partners
      WHERE
         chat_id = $1;
   `;

   return fetch(QUERY, chat_id)
}
const foundPartnerByPhone = (phoneNumber) => {
   const QUERY = `
      SELECT
         *
      FROM
         partners
      WHERE
         phone_number = $1;
   `;

   return fetch(QUERY, phoneNumber)
}
const addChatId = (id, chatId) => {
   const QUERY = `
      UPDATE
         partners
      SET
         chat_id = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, chatId)
}
const addLang = (id, lang) => {
   const QUERY = `
      UPDATE
         partners
      SET
         bot_lang = $2
      WHERE
         id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, lang)
}

module.exports = {
   foundPartner,
   foundPartnerByPhone,
   addChatId,
   addLang
}