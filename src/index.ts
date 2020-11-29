import {
  getConfig,
  getManifest,
  setConfig,
  generateBasicConfig,
  delManifest,
} from "./helpers";
import { log, endProcess, startProcess } from "./logger";

// Start process
startProcess();

// Make sure the Sybury config file exists
// -----
// Manifest - package.json
const { isManifestExist, manifest } = getManifest();
// Config file is missing
if (!getConfig().isConfigExist) {
  // Generate Sybury config from package.json
  if (isManifestExist) {
    log("Generating new Config file from existing 'package.json'.");
    manifest && setConfig(manifest);
  } else {
    log("Generating new Config file from template.");
    setConfig(generateBasicConfig());
  }
}
isManifestExist && delManifest();

// Config - sybury.YAML
const { config } = getConfig();
config && log(config.name);

// End process
endProcess();
