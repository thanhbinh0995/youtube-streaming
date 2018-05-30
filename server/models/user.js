'use strict';

const UserRole = {
    admin: 'admin',
    normal: 'normal'
};

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            fullName: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING,
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
                type: DataTypes.ENUM(Object.values(UserRole)),
                defaultValue: UserRole.normal,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            deletedAt: {
                type: DataTypes.DATE
            }
        },
        {
            paranoid: true,
            freezeTableName: true,
            indexes: [
                {
                    fields: ['email']
                }
            ]
        }
    );
    User.associate = (models) => {
    };
    User.Role = UserRole;
    User.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());
        delete values.code;
        return values;
    };
    return User;
};