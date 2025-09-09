import { COMMAND_VARIABLES } from "@core/constants";

const extractVariables = (
  args: string[],
  expectedVariables: COMMAND_VARIABLES[]
): Record<string, string> => {
  return args.reduce((acumulator, arg) => {
    const [key, value] = arg.split("=");

    const variableEnum = expectedVariables.find((variable) => variable === key);
    if (!variableEnum) return acumulator;

    return {
      ...acumulator,
      [variableEnum]: value,
    };
  }, {});
};

export { extractVariables };
