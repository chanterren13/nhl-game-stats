import { sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import Player from "./player";

export const Team = sequelize.define("Team", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    wins: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    losses: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    otLosses: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    apiId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

Team.hasMany(Player);
Player.belongsTo(Team);