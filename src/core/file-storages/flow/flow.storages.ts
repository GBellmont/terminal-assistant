import fs from "fs";
import path from "path";

import {
  EMPTY_JSON,
  ENV_HOME_DIR,
  ENV_USER_PROFILE_DIR,
  FILE_DIRECTORIES,
  FILE_ENCODING,
  STORAGE_FILE_NAMES,
} from "@core/constants";
import { CommandStructureContract } from "./contracts";

const CONFIG_DIR_PATH = path.join(
  ENV_HOME_DIR || ENV_USER_PROFILE_DIR!,
  FILE_DIRECTORIES.SYSTEM_CONFIG_DIR,
  FILE_DIRECTORIES.TERMINAL_ASSISTANT_CONFIG_DIR
);

const FLOWS_FILE = path.join(CONFIG_DIR_PATH, STORAGE_FILE_NAMES.FLOWS);

const initStorage = () => {
  if (!fs.existsSync(CONFIG_DIR_PATH)) {
    fs.mkdirSync(CONFIG_DIR_PATH, { recursive: true });
  }

  if (!fs.existsSync(FLOWS_FILE)) {
    fs.writeFileSync(FLOWS_FILE, EMPTY_JSON);
  }
};

const getFlows = (): Record<string, CommandStructureContract> => {
  initStorage();

  const rawFile = fs.readFileSync(FLOWS_FILE, FILE_ENCODING);
  return JSON.parse(rawFile);
};

const saveFlows = (
  fileContent: Record<string, CommandStructureContract>
): void => {
  initStorage();

  fs.writeFileSync(FLOWS_FILE, JSON.stringify(fileContent, null, 2));
};

export { getFlows, saveFlows };
