import Table from "cli-table3";

import { getFlows } from "@core/file-storages";
import { COLUMNS } from "@core/constants";
import { consoleInfoLog } from "@core/utils";
import { wrapText } from "@core/utils/wrap-text.utils";

const listComand = async () => {
  const flows = getFlows();
  const tableRows = Object.keys(flows).reduce((acumulator, flowKey) => {
    const rawCommand = flows[flowKey].rawCommand;

    return [...acumulator, [wrapText(flowKey, 45), wrapText(rawCommand, 65)]];
  }, []);

  const table = new Table({
    head: [COLUMNS.COMMAND, COLUMNS.SUCESSOR_COMMAND],
    colWidths: [50, 70],
  });

  table.push(...tableRows);

  consoleInfoLog(table.toString());
};

export { listComand };
