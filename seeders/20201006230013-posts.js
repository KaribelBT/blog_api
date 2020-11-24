'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Posts', [{
      id: 1,
      categoryId: 1,
      title: 'Test Post 1',
      content:'Content Text',
      img_url:'https://i.pinimg.com/564x/93/b0/a4/93b0a4d55bd15e6cebd18adba0b47f22.jpg',
      createdAt: new Date
    }], {});   
    await queryInterface.bulkInsert('Posts', [{
      id: 2,
      categoryId: 2,
      title: 'Test Post 2',
      content:'Content Text',
      img_url:'https://i.pinimg.com/564x/93/b0/a4/93b0a4d55bd15e6cebd18adba0b47f22.jpg',
      createdAt: new Date
    }], {});   
    await queryInterface.bulkInsert('Posts', [{
      id: 3,
      categoryId: 3,
      title: 'Test Post 3',
      content:'Content Text',
      img_url:'https://i.pinimg.com/564x/93/b0/a4/93b0a4d55bd15e6cebd18adba0b47f22.jpg',
      createdAt: new Date
    }], {});   
    await queryInterface.bulkInsert('Posts', [{
      id: 4,
      categoryId: 4,
      title: 'Test Post 4',
      content:'Content Text',
      img_url:'https://i.pinimg.com/564x/93/b0/a4/93b0a4d55bd15e6cebd18adba0b47f22.jpg',
      createdAt: new Date
    }], {});   
    await queryInterface.bulkInsert('Posts', [{
      id: 5,
      categoryId: 5,
      title: 'Test Post 5',
      content:'Content Text',
      img_url:'https://i.pinimg.com/564x/93/b0/a4/93b0a4d55bd15e6cebd18adba0b47f22.jpg',
      createdAt: new Date
    }], {});    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
