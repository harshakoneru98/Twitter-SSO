const config = require('../../config');
const oauthCallback = config.FRONTEND_URL;
const oauth = require('../lib/oauth-promise')(oauthCallback);

//our in-memory secrets database.
//Can be a key-value store or a relational database
let tokens = {};
const COOKIE_NAME = 'oauth_token';

exports.request_token = async (req, res, next) => {
    try {
        const { oauth_token, oauth_token_secret } =
            await oauth.getOAuthRequestToken();

        res.cookie(COOKIE_NAME, oauth_token, {
            maxAge: 15 * 60 * 1000 // 15 minutes
            // secure: true,
            // httpOnly: false,
            // sameSite: true
        });

        tokens[oauth_token] = { oauth_token_secret };

        res.status(200).json({ oauth_token });
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

exports.access_token = async (req, res, next) => {
    try {
        const { oauth_token: req_oauth_token, oauth_verifier } = req.body;
        const oauth_token = req.cookies[COOKIE_NAME];
        const oauth_token_secret = tokens[oauth_token].oauth_token_secret;

        if (oauth_token !== req_oauth_token) {
            res.status(403).json({ message: 'Request tokens do not match' });
            return;
        }

        const { oauth_access_token, oauth_access_token_secret } =
            await oauth.getOAuthAccessToken(
                oauth_token,
                oauth_token_secret,
                oauth_verifier
            );
        tokens[oauth_token] = {
            ...tokens[oauth_token],
            oauth_access_token,
            oauth_access_token_secret
        };
        res.json({ success: true });
    } catch (error) {
        res.status(403).json({ message: 'Missing access token' });
    }
};

exports.logout = async (req, res, next) => {
    try {
        const oauth_token = req.cookies[COOKIE_NAME];
        delete tokens[oauth_token];
        res.cookie(COOKIE_NAME, {}, { maxAge: -1 });
        res.json({ success: true });
    } catch (error) {
        res.status(403).json({
            message: 'Missing, invalid, or expired tokens'
        });
    }
};
