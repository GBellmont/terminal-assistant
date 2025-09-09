import Table from "cli-table3";

import { getFlows } from "@core/file-storages";
import { COLUMNS, TABLE_MARGIN } from "@core/constants";
import { consoleInfoLog } from "@core/utils";

interface VerifyColumnLenghtsParams {
  flowKeyWidth: number;
  rawCommandWidth: number;
  currentFlowKey: string;
  currentRawCommand: string;
}

const listComand = async () => {
  const flows = getFlows();
  const tableData = Object.keys(flows).reduce(
    (acumulator, flowKey) => {
      const rawCommand = flows[flowKey].rawCommand;

      return {
        ...acumulator,
        rows: [...acumulator.rows, [flowKey, rawCommand]],
        colWidths: verifyColumnLenghts({
          flowKeyWidth: acumulator.colWidths[0],
          rawCommandWidth: acumulator.colWidths[1],
          currentFlowKey: flowKey,
          currentRawCommand: rawCommand,
        }),
      };
    },
    {
      rows: [],
      colWidths: [5, 15],
    }
  );

  const table = new Table({
    head: [COLUMNS.COMMAND, COLUMNS.SUCESSOR_COMMAND],
    colWidths: tableData.colWidths.map((width) => width + TABLE_MARGIN),
  });

  table.push(...tableData.rows);

  consoleInfoLog(table.toString());
};

const verifyColumnLenghts = ({
  flowKeyWidth,
  rawCommandWidth,
  currentFlowKey,
  currentRawCommand,
}: VerifyColumnLenghtsParams): number[] => {
  const newFlowKeyWidth =
    currentFlowKey.length > flowKeyWidth ? currentFlowKey.length : flowKeyWidth;
  const newRawCommandWidth =
    currentRawCommand.length > rawCommandWidth
      ? currentRawCommand.length
      : rawCommandWidth;

  return [newFlowKeyWidth, newRawCommandWidth];
};

export { listComand };
