const bookshelf = require("../bookshelf");

const User = bookshelf.model("User", {
  tableName: "users",
  yardSales: function() {
    return this.hasMany("YardSale");
  },
  favourites: function() {
    return this.hasMany("Favourite");
  }
});

module.exports = User;
