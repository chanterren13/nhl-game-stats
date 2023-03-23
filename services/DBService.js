import { sequelize } from "../datasource.js";
import { Team } from "../models/team.js";
import { Player } from "../models/player.js";

export class DBService {
    constructor() { };

    async addTeam(teamData) {
        return await Team.create(teamData);
    }

    async getTeamById(id) {
        return await Team.findByPk(id);
    }

    async updateTeam(id, info) {
        return await Team.update(info, {
            where: {
                apiId: id,
            }
        });
    }

    async addPlayer(playerData) {
        return await Player.create(playerData);
    }

    async getPlayer(id) {
        return await Player.findByPk(id);
    }

    async updatePlayer(id, info) {
        return await Player.update(info, {
            where: {
                apiId: id
            }
        });
    }

    async getRoster(teamId, order = [['goals', 'DESC']]) {
        return await Player.findAll({
            where: {
                TeamApiId: teamId,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'TeamApiId']
            },
            order: order
        });
    }

}