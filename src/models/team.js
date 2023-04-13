import { sequelize } from "../../db/datasource.js";
import { DataTypes } from "sequelize";
import { Player } from "./player.js";

export const Team = sequelize.define("Team", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
});

Team.hasMany(Player);
Player.belongsTo(Team);
