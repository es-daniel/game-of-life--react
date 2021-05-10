import api from "./api";

const startGame = (pattern = "rand") => api.get(`start?pattern=${pattern}`);

const updateGame = () => api.get("update");

export default { startGame, updateGame };
