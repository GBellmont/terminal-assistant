#!/usr/bin/env node

import {
  addComand,
  helpCommand,
  listComand,
  removeCommand,
  suggestCommand,
} from "@prompt/commands";
import { COMMANDS } from "@core/constants";
import { consoleInfoLog } from "@core/utils";

const COMMANDS_MAPPER = {
  [COMMANDS.ADD]: async (args: string[]) => await addComand(args),
  [COMMANDS.HELP]: async (_: string[]) => await helpCommand(),
  [COMMANDS.LIST]: async (_: string[]) => await listComand(),
  [COMMANDS.REMOVE]: async (args: string[]) => await removeCommand(args),
  [COMMANDS.SUGGEST]: async (args: string[]) => await suggestCommand(args),
};

const main = async () => {
  const [, , cmd, ...args] = process.argv;

  if (!!COMMANDS_MAPPER[cmd]) return COMMANDS_MAPPER[cmd](args);

  consoleInfoLog(
    `Unknown command, try running "${COMMANDS.TASS} ${COMMANDS.HELP}" for more information about the commands`
  );
};

main();
