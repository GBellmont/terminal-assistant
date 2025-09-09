import Table from "cli-table3";
import wrap from "wrap-ansi";

import { COLUMNS, COMMAND_VARIABLES, COMMANDS, NO_DATA } from "@core/constants";
import { consoleInfoLog } from "@core/utils";

const HELP_TABLE_ROWS = [
  [
    COMMANDS.ADD,
    `${COMMAND_VARIABLES.COMMAND}, ${COMMAND_VARIABLES.SUCCESSOR_COMMAND}`,
    `${COMMANDS.TASS} ${COMMANDS.ADD} ${COMMAND_VARIABLES.COMMAND}="my command" ${COMMAND_VARIABLES.SUCCESSOR_COMMAND}="my sucessor command with {{parameters}}"`,
    `The value within the variable '${COMMAND_VARIABLES.COMMAND}' does not need to be the complete command, but the more specific the better.`,
  ],
  [
    COMMANDS.LIST,
    NO_DATA,
    `${COMMANDS.TASS} ${COMMANDS.LIST}`,
    `Lists the commands registered so far.`,
  ],
  [
    COMMANDS.REMOVE,
    `${COMMAND_VARIABLES.COMMAND}`,
    `${COMMANDS.TASS} ${COMMANDS.REMOVE} ${COMMAND_VARIABLES.COMMAND}="command to remove"`,
    `Remove the given command.`,
  ],
  [
    COMMANDS.SUGGEST,
    `${COMMAND_VARIABLES.COMMAND}`,
    `${COMMANDS.TASS} ${COMMANDS.SUGGEST} ${COMMAND_VARIABLES.COMMAND}="command to search successor"`,
    `Searches for a successor command corresponding to the one entered.`,
  ],
];

const helpCommand = async () => {
  const table = new Table({
    head: [COLUMNS.NAME, COLUMNS.PARAMS, COLUMNS.EXAMPLE, COLUMNS.NOTE],
    colWidths: [15, 35, 55, 45],
  });

  table.push(
    ...HELP_TABLE_ROWS.map((element) => [
      wrap(element[0], 10),
      wrap(element[1], 30),
      wrap(element[2], 50),
      wrap(element[3], 40),
    ])
  );

  consoleInfoLog(table.toString());
};

export { helpCommand };
