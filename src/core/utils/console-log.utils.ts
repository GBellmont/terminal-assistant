import { COLORS } from "@core/constants";

const consoleWithColorLog = (message: string, color: COLORS) => {
  console.log(color + message + COLORS.RESET_COLOR);
};

const consoleErrorLog = (message: string) => {
  consoleWithColorLog(message, COLORS.RED);
};

const consoleInfoLog = (message: string) => {
  consoleWithColorLog(message, COLORS.YELLOW);
};

const consoleSuccessLog = (message: string) => {
  consoleWithColorLog(message, COLORS.GREEN);
};

export {
  consoleErrorLog,
  consoleInfoLog,
  consoleSuccessLog,
  consoleWithColorLog,
};
