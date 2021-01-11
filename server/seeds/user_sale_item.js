const userData = require('../seed_data/01_user_data');
const saleData = require('../seed_data/02_yard_sale_data');
const itemData = require('../seed_data/03_sale_item_data');

const USER_TABLE = 'users';
const SALE_TABLE = 'yard_sales';
const ITEM_TABLE = 'sale_items';

const getRandomId = (IDArray => {
  return IDArray[Math.floor(Math.random() * IDArray.length)];
});

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(USER_TABLE)
    .del()
    .then(()=> {
      return knex(USER_TABLE).insert(userData);
    })
    .then(()=> {
      return knex(SALE_TABLE).del()
    })
    .then(()=> {
      // get user IDs
      return knex(USER_TABLE)
        .pluck("id")
        .then(userIds => {
          return userIds;
        })
    })
    .then(userIds => {
      // randomly add user ids to each yard sales record
      const saleDataWithUserIds = saleData.map(saleRow => {
        saleRow.user_id = getRandomId(userIds);
        // return each updated row in sale table
        return saleRow;
      });
      return knex(SALE_TABLE).insert(saleDataWithUserIds);
    })
    .then(() => {
      return knex(ITEM_TABLE).del()
    })
    .then(() => {
      // get sale IDs
      return knex(SALE_TABLE)
        .then(saleObjects => {
          return saleObjects;
        })
    })
    .then((saleObjects) => {


      // randomly add sale ids to each sale item record
      const itemDataWithSaleIds = itemData.map(itemRow => {
        // Select random sale
        const currentSale = getRandomId(saleObjects);
        // Assign sale id and seller id of sale to item
        itemRow.yard_sale_duration = currentSale.duration;
        itemRow.yard_sale_created_at = currentSale.created_at;
        itemRow.yard_sale_id = currentSale.id;
        itemRow.user_id = currentSale.user_id;
        // return each updated row in sale table
        return itemRow;
      });

      return knex(ITEM_TABLE).insert(itemDataWithSaleIds);
    })
};
