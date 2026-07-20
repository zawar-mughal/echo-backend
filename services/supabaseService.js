import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // service role key — server only, never expose
);

export const upsertDiscordProfile = async (discordUser) => {
  const placeholderEmail = `discord-${discordUser.id}@users.echo.app`;

  const { data: existingProfile } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("discord_id", discordUser.id)
    .maybeSingle();

  let userId = existingProfile?.id;

  if (!userId) {
    const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
      email: placeholderEmail,
      email_confirm: true,
      user_metadata: {
        username: discordUser.username,
        discord_id: discordUser.id,
      },
    });
    if (createErr) throw createErr;
    userId = created.user.id;

    const avatarUrl = discordUser.avatar
      ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
      : null;

    const { error: profileErr } = await supabaseAdmin.from("profiles").upsert({
      id: userId,
      username: discordUser.username,
      display_name: discordUser.global_name || discordUser.username,
      discord_id: discordUser.id,
      avatar_url: avatarUrl,
    });
    if (profileErr) throw profileErr;
  }

  return placeholderEmail;
};

export const generateSupabaseLoginToken = async (email) => {
  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: "magiclink",
    email,
  });
  if (error) throw error;

  return data.properties.hashed_token;
};