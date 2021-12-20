const config = require('../../config');
const oauthCallback = config.FRONTEND_URL;
const oauth = require('../lib/oauth-promise')(oauthCallback);

//our in-memory secrets database.
//Can be a key-value store or a relational database
let tokens = {};

exports.request_token = async (req, res, next) => {
    try {
        const { oauth_token, oauth_token_secret } =
            await oauth.getOAuthRequestToken();

        tokens[oauth_token] = { oauth_token_secret };

        res.json({ oauth_token });
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};
