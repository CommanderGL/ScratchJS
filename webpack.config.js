module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader"
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};