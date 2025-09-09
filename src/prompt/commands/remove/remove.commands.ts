import { COMMAND_ACCEPT, COMMAND_VARIABLES, COMMANDS } from "@core/constants";
import { getFlows, saveFlows } from "@core/file-storages";
import {
  askQuestion,
  consoleErrorLog,
  consoleSuccessLog,
  extractVariables,
} from "@core/utils";

const ERROR_MESSAGE = `Check the command format: ${COMMANDS.TASS} ${COMMANDS.REMOVE} ${COMMAND_VARIABLES.COMMAND}="command to remove"`;
const NOT_FOUND_MESSAGE = `Check the command name and try again`;

const removeCommand = async (args: string[]) => {
  const variables = extractVariables(args, [COMMAND_VARIABLES.COMMAND]);
  const commandKey = variables[COMMAND_VARIABLES.COMMAND];

  if (!commandKey) {
    consoleErrorLog(ERROR_MESSAGE);
    process.exit(1);
  }

  const flows = getFlows();
  const commandFlow = flows[commandKey];

  if (!commandFlow) {
    consoleErrorLog(NOT_FOUND_MESSAGE);
    process.exit(1);
  }

  const continueExecute = await askQuestion(
    `Command ${commandFlow.rawCommand} found, are you sure you want to remove the command??(Y/y = yes, N/n = No)\nNote: an empty or invalid value will be considered as N\nResponse: `
  );

  if (
    !continueExecute ||
    continueExecute.toUpperCase() !== COMMAND_ACCEPT.YES
  ) {
    return;
  }

  const newFlows = Object.fromEntries(
    Object.entries(flows).filter(([key]) => key !== commandKey)
  );

  saveFlows(newFlows);
  consoleSuccessLog(`✅ Command(${commandKey}) was successfully removed.`);
};

export { removeCommand };
