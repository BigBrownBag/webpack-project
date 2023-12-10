import webpack from "webpack";
import buildDevServer from "./buildDevServer";
import buildLoaders from "./buildLoaders";
import buildPlugins from "./buildPlugins";
import buildResolvers from "./buildResolvers";
import { BuildOptions } from "./type/types";

export const buildWebpack = (options: BuildOptions): webpack.Configuration => {
    const isDevelopment: boolean = options.mode === "development";
    const isProduction: boolean = options.mode === "production";

    return {
        mode: options.mode ?? "development",
        entry: options.paths.entry,
        output: {
          filename: "[name].[contenthash].js",
          clean: true,
          path: options.paths.output,
        },
        plugins: buildPlugins(options),
        module: {
          rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        devServer: isDevelopment ? buildDevServer(options) : undefined,
        devtool: isDevelopment ? "eval-cheap-module-source-map" : "source-map",
      };
};