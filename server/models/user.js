const bookshelf = require("../bookshelf");

const User = bookshelf.model("User", {
  tableName: "users",
  yardSales: function() {
    return this.hasMany("YardSale");
  }
});

module.exports = User;
