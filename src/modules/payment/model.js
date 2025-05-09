const { fetch, fetchALL } = require('../../lib/postgres')

const foundPartner = (partner_id) => {
   const QUERY = `
      SELECT
         *
      FROM
         partners
      WHERE
         id = $1;
   `;

   return fetch(QUERY, partner_id)
}
const foundCheck = (check_id) => {
   const QUERY = `
      SELECT
         c.user_id,
         c.method,
         c.amount,
         c.create_at,
         u.source
      FROM
         checks c
      JOIN
         users u
      ON
         c.user_id = u.chat_id
      WHERE
         id = $1;
   `;

   return fetch(QUERY, check_id)
}


module.exports = {
   foundPartner,
   foundCheck
}