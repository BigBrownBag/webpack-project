import ReactRefreshTypeScript from "react-refresh-typescript";
import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin  from "mini-css-extract-plugin";
import { BuildOptions } from "./type/types";
import babelConfig from "./babel/babel.config";

export default function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
    const isDevelopment: boolean = options.mode === "development";

    const cssLoader = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDevelopment ? "[path][name]__[local]" : "[hash:base64:8]"
            },
        }
    };

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          cssLoader,
          // Compiles Sass to CSS
          "sass-loader",
        ],
    };

    const tsLoader = {
        test: /\.tsx?$/,
        use: [
            {
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [isDevelopment && ReactRefreshTypeScript()].filter(Boolean),
                    }),
                },
            }
        ],
        exclude: /node_modules/,
    };

    const assetsLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    };

    const svgLoader = {
        test: /\.svg$/,
        use: {
            loader: "@svgr/webpack",
            options: {
                icon: true,
                svgConfig: {
                    plugins: [
                        {
                            name: "convertColors",
                            params: {
                                currentColor: true
                            }
                        }
                    ]
                }
            }
        },
    };

    const babelLoader = babelConfig(options);

    return [
        svgLoader,
        assetsLoader,
        scssLoader,
        tsLoader,
        //babelLoader
      ];
}
