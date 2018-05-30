'use strict';
const UserRole = {
    admin: 'admin',
    normal: 'normal'
};

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('User', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            fullName: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        args: true,
                        msg: 'Email is not valid'
                    }
                }
            },
            role: {
                type: Sequelize.ENUM(Object.values(UserRole)),
                defaultValue: UserRole.normal,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                allowNull: false
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                type: Sequelize.DATE
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('User', 'cascade');
    }
};