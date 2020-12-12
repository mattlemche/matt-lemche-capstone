const bookshelf = require("../bookshelf");

const Favourite = bookshelf.model("Favourite", {
  tableName: "favourites",
  user: function() {
    return this.belongsTo("User");
  }
});

module.exports = Favourite;
