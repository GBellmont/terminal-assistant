import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { COLORS } from "@core/constants";

const askQuestion = async (question: string): Promise<string> => {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(
    COLORS.PURPLE + question + COLORS.RESET_COLOR
  );
  rl.close();
  return answer;
};

export { askQuestion };
