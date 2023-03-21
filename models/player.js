import { sequelize } from "sequelize";
import { DataTypes } from "sequelize";

export const Player = sequelize.define("Player", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  assists: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shotPct: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ptStrk: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  gStrk: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  apiId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

Team.hasMany(Player);
