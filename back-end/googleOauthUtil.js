const { google } = require('googleapis');

const oauthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/auth/google/callback',
);

const getGoogleOauthUrl = () => {
  const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
  ];

  return oauthClient.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes,
  });
}

const getGoogleUser = async(code) => {
    const { tokens } = await oauthClient.getToken(code);
    const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.accessToken}`,
        { headers: { Authorization: `Bearer ${tokens.id_token}` } },
    );
    return response.data;
}

module.exports = { getGoogleOauthUrl, getGoogleUser };