const bookshelf = require("../bookshelf");

const Avatar = bookshelf.model("Avatar", {
  tableName: "users",
  user: function() {
    return this.belongsTo("User");
  }
});

module.exports = Avatar;
