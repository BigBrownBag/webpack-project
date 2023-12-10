import { Configuration, DefinePlugin } from "webpack";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin  from "mini-css-extract-plugin";
import { BuildOptions } from "./type/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from 'path';

export default function buildPlugins(options: BuildOptions): Configuration["plugins"] {
    const isDevelopment: boolean = options.mode === "development";
    const isProduction: boolean = options.mode === "production";

    const plugins: Configuration["plugins"] = [
        new HtmlWebpackPlugin({
            template: options.paths.html,
            favicon: path.resolve(options.paths.public, "favicon.ico"),
            publicPath: "/"
        }),
        new DefinePlugin({
            __ENVIRONMENT__: JSON.stringify(options.mode)
        })
    ];

    if (isDevelopment) {
        plugins.push(new webpack.ProgressPlugin());
        //plugins.push(new ForkTsCheckerWebpackPlugin());
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    if (isProduction) {
        plugins.push(new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css"
        }));
    }

    if (options.analyzer) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    return plugins;
}