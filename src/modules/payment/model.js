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
         *
      FROM
         checks
      WHERE
         id = $1;
   `;

   return fetch(QUERY, check_id)
}


module.exports = {
   foundPartner,
   foundCheck
}