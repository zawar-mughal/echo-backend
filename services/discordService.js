// import axios from "axios";

// export const requestDiscordToken = async () => {

//     const params = new URLSearchParams();

//     params.append("grant_type", "client_credentials");
//     params.append("scope", "identify connections");

//     const response = await axios.post(
//         "https://discord.com/api/v10/oauth2/token",
//         params,
//         {
//             headers: {
//                 "Content-Type":
//                     "application/x-www-form-urlencoded",
//             },
//             auth: {
//                 username: process.env.DISCORD_CLIENT_ID,
//                 password: process.env.DISCORD_CLIENT_SECRET,
//             },
//         }
//     );

//     return response.data;
// };

import axios from "axios";

// Exchange the `code` from sdk.commands.authorize() for a USER access_token
export const exchangeDiscordCode = async (code) => {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  // Must match what's configured in the Discord Developer Portal for your app
  params.append("redirect_uri", process.env.DISCORD_REDIRECT_URI);

  const response = await axios.post(
    "https://discord.com/api/v10/oauth2/token",
    params,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      auth: {
        username: process.env.DISCORD_CLIENT_ID,
        password: process.env.DISCORD_CLIENT_SECRET,
      },
    }
  );

  return response.data; // { access_token, token_type, expires_in, refresh_token, scope }
};

// Verify the token by asking Discord who it belongs to (never trust client-claimed identity)
export const getDiscordUser = async (accessToken) => {
  const response = await axios.get("https://discord.com/api/v10/users/@me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data; // { id, username, global_name, avatar, ... }
};