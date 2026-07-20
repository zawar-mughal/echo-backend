// import express from "express";
// import { getDiscordToken } from "../controllers/discordControllers.js";

// const router = express.Router();

// router.get("/auth", getDiscordToken);

// export default router;

import express from "express";
import { authenticateDiscordUser } from "../controllers/discordControllers.js";

const router = express.Router();

router.post("/auth", authenticateDiscordUser); // now POST, takes { code } in body

export default router;