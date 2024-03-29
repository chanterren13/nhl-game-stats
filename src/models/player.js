import { sequelize } from "../../db/datasource.js";
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
    gamesPlayed: {
      type: DataTypes.INTEGER,
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
        if (player.changed("goals")) {
          console.log(`${player.name} scored`);
        }
        player.gStrk = player.changed("goals") && player.changed("gamesPlayed") ? player.gStrk + 1 : 0;
        player.ptStrk = player.changed("points") && player.changed("gamesPlayed") ? player.ptStrk + 1 : 0;
      },
    },
  }
);
