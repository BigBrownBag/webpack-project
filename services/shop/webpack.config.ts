import path from "path";
import webpack from "webpack";
import {BuildMode, BuildPlatform, buildWebpack} from "@packages/build-config";
import packageJSON from "./package.json";

interface EnvironmentalVariables {
    mode: BuildMode;
    port: number;
    analyzer?: boolean;
    platform?: BuildPlatform;
};

const config: (env: EnvironmentalVariables) => webpack.Configuration = (env) => {
    const config: webpack.Configuration = buildWebpack({
        mode: env.mode ?? "development",
        paths: {
            entry: path.resolve(__dirname, "src", "index.tsx"),
            html: path.resolve(__dirname, "public", "index.html"),
            output: path.resolve(__dirname, "build"),
            src: path.resolve(__dirname, "src"),
            public: path.resolve(__dirname, "public")
        },
        port: env.port ?? 3001,
        analyzer: env.analyzer,
        platform: env.platform ?? "desktop"
    });

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: "shop",
        filename: "remoteEntry.js",
        exposes: {
            "./Router": "./src/router/Router.tsx"
        },
        shared: {
            ...packageJSON.dependencies,
            react: {
                eager: true
            },
            "react-router-dom": {
                eager: true
            },
            "react-dom": {
                eager: true
            }
        }
    }));

    return config;
};

export default config;
