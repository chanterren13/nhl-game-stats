import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";

export const Player = sequelize.define(
  "Player",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
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
      type: DataTypes.DOUBLE,
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
      primaryKey: true,
    },
  },
  {
    hooks: {
        //check if goals and points have been updated, then update streaks
      beforeUpdate: (player) => {
        player.gStrk = player.changed("goals") ? player.gStrk++ : 0;
        player.ptStrk = player.changed("points") ? player.ptStrk++ : 0;
      },
    },
  }
);
