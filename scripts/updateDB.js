import { updateTeams, updatePlayers } from "./extractionUtils.js";

export const updateDB = async (schedule) => {
    const ids = parseSchedule(schedule);
    await updateTeams(ids);
    for (const id of ids) {
        await updatePlayers(id);
    }
}
