import { Configuration } from "webpack";
import { BuildOptions } from "./type/types";

export default function buildResolvers(options: BuildOptions): Configuration["resolve"] {
    return {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@": options.paths.src
        }
      };
}