import { BuildOptions } from "../type/types";
import { removeDataTestIdBabelPlugin } from "./removeDataTestIdBabelPlugin";

export default function babelConfig(options: BuildOptions) {
    const isDevelopment: boolean = options.mode === "development";
    const isProduction: boolean = options.mode === "production";

    const plugins = [];

    if (isProduction) {
        plugins.push([
            removeDataTestIdBabelPlugin,
            {
                props: ["data-testid"]
            }
        ]);
    }

    return {
        test: /\.tsx?$/,
        use: [
            {
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-typescript",
                        ["@babel/preset-react", {
                            runtime: isDevelopment ? "automatic" : "classic"
                        }]
                    ],
                    plugins: plugins.length ? plugins : undefined
                },
            }
        ],
        exclude: /node_modules/,
    };
}