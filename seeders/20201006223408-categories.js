'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [{
      id: 1,
      name: "fashion"
    }], {});
    await queryInterface.bulkInsert('categories', [{
      id: 2,
      name: "beauty"
    }], {});
    await queryInterface.bulkInsert('categories', [{
      id: 3,
      name: "design"
    }], {});
    await queryInterface.bulkInsert('categories', [{
      id: 4,
      name: "health"
    }], {});
    await queryInterface.bulkInsert('categories', [{
      id: 5,
      name: "travel"
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
