const cleanCommand = (command: string) => {
  return command.replace(/^\u001c+|\u001c+$/g, "");
};

export { cleanCommand };
