import clipboardy from "clipboardy";

import { getFlows } from "@core/file-storages";
import { COMMAND_ACCEPT, COMMAND_VARIABLES } from "@core/constants";
import { askQuestion, consoleSuccessLog, extractVariables } from "@core/utils";

const suggestCommand = async (args: string[]) => {
  const variables = extractVariables(args, [COMMAND_VARIABLES.COMMAND]);
  const lastCommand = variables[COMMAND_VARIABLES.COMMAND];

  if (!lastCommand) return;

  const flows = getFlows();
  const flowKey = Object.keys(flows).find((key) => lastCommand.includes(key));

  if (!flowKey) return;

  const commandFlow = flows[flowKey];
  let command = commandFlow.rawCommand;

  const continueExecute = await askQuestion(
    `Command ${command} found, do you want to execute?(Y/y = yes, N/n = No)\nNote: an empty or invalid value will be considered as N\nResponse: `
  );

  if (
    !continueExecute ||
    continueExecute.toUpperCase() !== COMMAND_ACCEPT.YES
  ) {
    return;
  }

  for (const placeholder of commandFlow.placeHolders) {
    const value = await askQuestion(`Enter the value for ${placeholder}: `);
    command = command.replace(placeholder, value);
  }

  await clipboardy.write(command.trim());
  consoleSuccessLog(
    `\n👉 Next command suggestion is already in the clipboard:\n${command}\n`
  );
};

export { suggestCommand };
