const bookshelf = require("../bookshelf");

const YardSale = bookshelf.model("YardSale", {
  tableName: "yard_sales",
  saleItems: function() {
    return this.hasMany("SaleItem");
  },

  user: function() {
    return this.belongsTo("User");
  }
});

module.exports = YardSale;
