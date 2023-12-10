export interface BuildPath {
    entry: string;
    html: string;
    output: string;
    src: string;
    public: string;
}

export type BuildMode = "development" | "production";
export type BuildPlatform = "mobile" | "desktop";

export interface BuildOptions {
    port: number;
    paths: BuildPath;
    mode: BuildMode;
    analyzer?: boolean;
    platform?: BuildPlatform;
}