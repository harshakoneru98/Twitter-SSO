require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || '8080',
    FRONTEND_URL: process.env.FRONTEND_URL,
    TWITTER_KEY: process.env.TWITTER_KEY,
    TWITTER_SECRET: process.env.TWITTER_SECRET
};
