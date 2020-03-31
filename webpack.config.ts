import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const configure = (): webpack.Configuration => {
    return {
        entry: path.join(__dirname, "src", "index.tsx"),
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                compilerOptions: {
                                    module: "esnext",
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.css?$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        { loader: "css-loader", options: { importLoaders: 1 } },
                        {
                            loader: "postcss-loader",
                            options: {
                                ident: "postcss",
                                plugins: [
                                    require("tailwindcss"),
                                    require("autoprefixer"),
                                ],
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Monster Stadium",
                scriptLoading: "defer",
            }),
            new MiniCssExtractPlugin(),
        ],
    };
};

export default configure;
