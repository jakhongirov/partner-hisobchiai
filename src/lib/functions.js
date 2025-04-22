const formatBalanceWithSpaces = (balance) => {
   return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
   }).format(balance).replace(/,/g, ' ');
}

module.exports = {
   formatBalanceWithSpaces,
}