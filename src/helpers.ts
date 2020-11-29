import fs from "fs";
import YAML from "yaml";

type JsonType = { [key: string]: any };

export const projectPath = process.cwd();

/** Read config - sybury.yml */
export const getConfig = () => {
  const configBasePath = projectPath + "/sybury.";
  let configExtension = "yml";
  let isConfigExist: boolean = false;
  ["yml", "yaml"].forEach((ext) => {
    if (fs.existsSync(configBasePath + ext)) {
      isConfigExist = true;
      configExtension = ext;
    }
  });
  const configPath = configBasePath + configExtension;
  const configString = isConfigExist
    ? fs.readFileSync(configPath, "utf-8")
    : null;
  const config: JsonType | null = configString
    ? YAML.parse(configString)
    : null;
  return { configPath, isConfigExist, config, configString };
};

/** Write config - sybury.yml  */
export const setConfig = (value: string | JsonType) => {
  const { configPath } = getConfig();
  const configString =
    typeof value !== "string" ? YAML.stringify(value) : value;
  fs.writeFileSync(configPath, configString);
};

/** Read manifest - package.json */
export const getManifest = () => {
  const manifestPath = projectPath + "/package.json";
  const isManifestExist = fs.existsSync(manifestPath);
  const manifestString = isManifestExist
    ? fs.readFileSync(manifestPath, "utf-8")
    : null;
  const manifest: null | JsonType = manifestString
    ? JSON.parse(manifestString)
    : null;
  return { manifestPath, isManifestExist, manifest, manifestString };
};

/** Remove manifest - package.json */
export const delManifest = () => {
  const { manifestPath } = getManifest();
  fs.unlinkSync(manifestPath);
};

/** Generate basic config file object */
export const generateBasicConfig = () => {
  // parent folder name
  const name = projectPath.match(/([^\/]*)\/*$/)?.[1] || "sybury-project";
  return {
    name,
    version: "0.0.0",
    author: "",
    main: "",
    license: "MIT",
    repository: { type: "git", url: "" },
    keywords: [""],
    scripts: {
      start: "",
      build: "",
      test: "",
    },
    dependencies: {
      sybury: "sybury/framework",
    },
    devDependencies: {
      "sybury-cli": "sybury/cli",
    },
  };
};
