const bookshelf = require("../bookshelf");

const SaleItem = bookshelf.model("SaleItem", {
  tableName: "sale_items",
  yardSale: function() {
    return this.belongsTo("YardSale");
  },

  user: function() {
    return this.belongsTo("User").through("YardSale");
  }
});

module.exports = SaleItem;
