'use strict';

const User = require('../models').User;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return User
            .create({
                fullName: 'admin',
                email: 'admin@gmail.com',
                code: 'abc123',
                expiredAt: Date.now() + 10*60*1000,
                isVerified: true,
            })
            .then(user => {
                console.log(user);
                User.update({rootId: user.id} , {
                    where: {
                        id: user.id
                    }
                });
                return true;
            })
            .catch(error => {
                console.log(error);
                return false;
            });
    },

    down: (queryInterface, Sequelize) => {
        try {
            User.destroy({where: {'username': 'admin'}})
                .then(user => {
                    return user;
                })
                .catch(error => {
                    console.log(error);
                    return false;
                });
        } catch (e) {
            return false;
        }
    }
};
