export const getDiscordToken = async (req, res) => {
    try {
        // TODO: Implement Discord OAuth token exchange
        res.status(200).json({ message: "Discord token endpoint" });
    } catch (error) {
        console.error("Error in getDiscordToken:", error);
        res.status(500).json({ error: "Failed to get Discord token" });
    }
};
