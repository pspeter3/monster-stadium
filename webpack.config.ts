import glob from "fast-glob";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import path from "path";
import PurgecssPlugin from "purgecss-webpack-plugin";
import TerserJSPlugin from "terser-webpack-plugin";
import webpack from "webpack";

type Mode = "production" | "development";

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

const plugins = async (production: boolean): Promise<webpack.Plugin[]> => {
    const plugins = [
        new HtmlWebpackPlugin({
            title: "Monster Stadium",
            scriptLoading: "defer",
            meta: {
                "description": "Dungeons & Dragons 5E Encounter Builder for Avrae"
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
        new LangPlugin("en"),
    ];
    if (production) {
        const paths = await glob(path.join(__dirname, "src", "**", "*.tsx"), {
            ignore: [path.join(__dirname, "src", "**", "*.test.tsx")],
        });
        plugins.push(
            new PurgecssPlugin({
                paths,
                defaultExtractor: (content) =>
                    content.match(/[\w-/.:]+(?<!:)/g) || [],
            })
        );
    }
    return plugins;
};

const configure = async (
    _: unknown,
    { mode }: { mode?: Mode }
): Promise<webpack.Configuration> => {
    return {
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
                                ident: "postcss",
                                plugins: [
                                    require("tailwindcss")({
                                        theme: {
                                            extend: {
                                                screens: {
                                                    dark: {
                                                        raw:
                                                            "(prefers-color-scheme: dark)",
                                                    },
                                                },
                                            },
                                        },
                                        plugins: [require("@tailwindcss/ui")],
                                    }),
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
        plugins: await plugins(mode === "production"),
        optimization: {
            minimizer: [
                new TerserJSPlugin({}),
                new OptimizeCSSAssetsPlugin({}),
            ],
            runtimeChunk: true,
            splitChunks: {
                chunks: "all",
            },
        },
    };
};

export default configure;
