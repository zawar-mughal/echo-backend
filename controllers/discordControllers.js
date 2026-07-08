import { requestDiscordToken } from "../services/discordService.js";

export const getDiscordToken = async (req, res) => {
    try {
        const tokenData = await requestDiscordToken();

        res.status(200).json(tokenData);
    } catch (error) {
        console.error("Error in getDiscordToken:", error.response?.data || error.message);

        res.status(error.response?.status || 500).json({
            error: "Failed to get Discord token",
            details: error.response?.data || error.message,
        });
    }
};
