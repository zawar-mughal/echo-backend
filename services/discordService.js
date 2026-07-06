import axios from "axios";

export const requestDiscordToken = async () => {

    const params = new URLSearchParams();

    params.append("grant_type", "client_credentials");
    params.append("scope", "identify connections");

    const response = await axios.post(
        "https://discord.com/api/v10/oauth2/token",
        params,
        {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded",
            },
            auth: {
                username: process.env.DISCORD_CLIENT_ID,
                password: process.env.DISCORD_CLIENT_SECRET,
            },
        }
    );

    return response.data;
};