enum COMMANDS {
  ADD = "add",
  HELP = "help",
  LIST = "list",
  REMOVE = "remove",
  SUGGEST = "suggest",
  TASS = "tass",
}

enum COMMAND_ACCEPT {
  YES = "Y",
  NO = "N",
}

enum COMMAND_VARIABLES {
  COMMAND = "command",
  SUCCESSOR_COMMAND = "successorCommand",
}

export { COMMANDS, COMMAND_ACCEPT, COMMAND_VARIABLES };
