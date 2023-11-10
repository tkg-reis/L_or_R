/** @type {import('next').NextConfig} */
const nextConfig = {

    webpack(config, options) {
        config.module.rules.push({
            test: /\.mp3$/,
            use: {
            loader: "url-loader",
            options: {
                limit: 8192,
            },
            },
        });
        return config;
    },
    // publicRuntimeConfig: {
    //     PIXABAY_API_KEY: process.env.PIXABAY_API_KEY | undefined
    // },
};

module.exports = nextConfig

