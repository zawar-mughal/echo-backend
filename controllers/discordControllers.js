// import { requestDiscordToken } from "../services/discordService.js";

// export const getDiscordToken = async (req, res) => {
//     try {
//         const tokenData = await requestDiscordToken();

//         res.status(200).json(tokenData);
//     } catch (error) {
//         console.error("Error in getDiscordToken:", error.response?.data || error.message);

//         res.status(error.response?.status || 500).json({
//             error: "Failed to get Discord token",
//             details: error.response?.data || error.message,
//         });
//     }
// };

import { exchangeDiscordCode, getDiscordUser } from "../services/discordService.js";
import { upsertDiscordProfile, generateSupabaseLoginToken } from "../services/supabaseService.js";

// POST /api/discord/auth  — body: { code }
export const authenticateDiscordUser = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Missing authorization code" });
    }

    const tokenData = await exchangeDiscordCode(code);
    const discordUser = await getDiscordUser(tokenData.access_token);

    const email = await upsertDiscordProfile(discordUser);
    const token_hash = await generateSupabaseLoginToken(email);

    res.status(200).json({
      access_token: tokenData.access_token, // needed for sdk.commands.authenticate()
      email,
      token_hash,
    });
  } catch (error) {
    console.error("Error in authenticateDiscordUser:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: "Failed to authenticate Discord user",
      details: error.response?.data || error.message,
    });
  }
};
