import express from "express";
import { getDiscordToken } from "../controllers/discordController.js";

const router = express.Router();

router.get("/auth", getDiscordToken);

export default router;