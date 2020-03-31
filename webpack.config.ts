import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const configure = (): webpack.Configuration => {
    return {
        entry: path.join(__dirname, "src", "index.ts"),
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
        ],
    };
};

export default configure;
