import { COMMAND_VARIABLES, COMMANDS } from "@core/constants";
import { getFlows, saveFlows } from "@core/file-storages";
import {
  cleanCommand,
  consoleErrorLog,
  consoleSuccessLog,
  extractVariables,
} from "@core/utils";

const ERROR_MESSAGE = `Check the command format: ${COMMANDS.TASS} ${COMMANDS.ADD} ${COMMAND_VARIABLES.COMMAND}="your command" ${COMMAND_VARIABLES.SUCCESSOR_COMMAND}="your sucessor command  with {{place-holder}}"`;

const addComand = async (args: string[]) => {
  const variables = extractVariables(args, [
    COMMAND_VARIABLES.COMMAND,
    COMMAND_VARIABLES.SUCCESSOR_COMMAND,
  ]);

  if (
    !variables[COMMAND_VARIABLES.COMMAND] ||
    !variables[COMMAND_VARIABLES.SUCCESSOR_COMMAND]
  ) {
    consoleErrorLog(ERROR_MESSAGE);
    process.exit(1);
  }

  const command = cleanCommand(variables[COMMAND_VARIABLES.COMMAND]);
  const successorCommand = cleanCommand(
    variables[COMMAND_VARIABLES.SUCCESSOR_COMMAND]
  );
  const regex = new RegExp(/\{\{(.*?)\}\}/g);

  const placeHolders = Array.from(
    successorCommand.matchAll(regex),
    (match) => match[0]
  );

  const storedFlows = getFlows();

  const newFlows = {
    ...storedFlows,
    [command]: {
      rawCommand: successorCommand,
      placeHolders,
    },
  };

  saveFlows(newFlows);
  consoleSuccessLog(
    `✅ Successor(${successorCommand}) for command "${command}" was successfully registered.`
  );
};

export { addComand };
