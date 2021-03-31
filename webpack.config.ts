import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import webpack, { WebpackPluginInstance } from "webpack";

class LangPlugin {
    public static readonly Name = "LangPlugin";

    private lang: string;

    constructor(lang: string) {
        this.lang = lang;
    }

    apply(compiler: webpack.Compiler) {
        compiler.hooks.compilation.tap(LangPlugin.Name, (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tap(
                LangPlugin.Name,
                (data) => {
                    data.html = data.html.replace(
                        "<html",
                        `<html lang="${this.lang}"`
                    );
                    return data;
                }
            );
        });
    }
}

const config: webpack.Configuration = {
    entry: [
        path.join(__dirname, "src", "index.css"),
        path.join(__dirname, "src", "index.tsx"),
    ],
    output: {
        filename: "[name].[chunkhash].js",
        publicPath: "/",
    },
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
                            postcssOptions: {
                                plugins: [
                                    require("tailwindcss")({
                                        future: {
                                            removeDeprecatedGapUtilities: true,
                                        },
                                        important: true,
                                        purge: [
                                            path.join(
                                                __dirname,
                                                "src",
                                                "**",
                                                "*.tsx"
                                            ),
                                        ],
                                        theme: {
                                            extend: {
                                                screens: {
                                                    dark: {
                                                        raw:
                                                            "(prefers-color-scheme: dark)",
                                                    },
                                                },
                                                boxShadow: {
                                                    outline:
                                                        "0 0 0 0.25rem rgba(56,178,172,0.5)",
                                                },
                                            },
                                        },
                                    }),
                                    require("autoprefixer"),
                                ],
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
            meta: {
                description:
                    "Dungeons & Dragons 5E Encounter Builder for Avrae",
            },
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
        new LangPlugin("en"),
    ],
    optimization: {
        minimizer: [
            "...",
            (new CssMinimizerPlugin() as unknown) as WebpackPluginInstance,
        ],
    },
};

export default config;
