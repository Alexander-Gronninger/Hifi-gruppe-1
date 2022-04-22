const path = require("path")

module.exports = {
    entry: {
        index: "./src/components/index.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "build")
    },
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, "build")
        },
        port: 8080
    },
    module: {
        rules: [
            {
                // \. is needed to have . - [] is placeholder, $ is end of filename, i means not case sensitive
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', "sass-loader"]
            },
            {
                test: /\.js$/i,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ["@babel/transform-runtime"]
                        ]
                    }
                }
            },
            {
                // (|) is a selection, little like placeholder but only for specefic words, seperated by |
                test: /\.(png|jpg|svg|gif|jpeg|webp)$/i,
                type: "asset/resource"
            }
        ]
    }
}