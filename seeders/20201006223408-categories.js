'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [{
      id: 1,
      name: "fashion",
      createdAt: new Date
    }], {});
    await queryInterface.bulkInsert('Categories', [{
      id: 2,
      name: "beauty",
      createdAt: new Date
    }], {});
    await queryInterface.bulkInsert('Categories', [{
      id: 3,
      name: "design",
      createdAt: new Date
    }], {});
    await queryInterface.bulkInsert('Categories', [{
      id: 4,
      name: "health",
      createdAt: new Date
    }], {});
    await queryInterface.bulkInsert('Categories', [{
      id: 5,
      name: "travel",
      createdAt: new Date
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
