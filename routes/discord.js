import express from "express";
import { getDiscordToken } from "../controllers/discordControllers.js";

const router = express.Router();

router.get("/auth", getDiscordToken);

export default router;