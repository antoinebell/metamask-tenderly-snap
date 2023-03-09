import { OnTransactionHandler } from '@metamask/snaps-types';
import { panel, text, heading, copyable } from '@metamask/snaps-ui';
import { getSimulation } from './tenderly';
import { TENDERLY_PROJECT, TENDERLY_USERNAME } from './config';

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
}) => {
  const simulatedTx = await getSimulation(transaction, chainId);
  let simulationHeader;
  let simulationText;

  const link = `https://dashboard.tenderly.co/${TENDERLY_USERNAME}/${TENDERLY_PROJECT}/simulator/${simulatedTx.id}`;

  if (simulatedTx === undefined) {
    simulationHeader = 'Error ❌';
    simulationText = 'Oops, something went wrong.';
    return {
      content: panel([heading(simulationHeader), text(simulationText)]),
    };
  }

  if (simulatedTx.status === false) {
    simulationHeader = 'Error ❌';
    simulationText = 'The simulation failed. It is available here:';
    return {
      content: panel([
        heading(simulationHeader),
        text(simulationText),
        copyable(link),
      ]),
    };
  }

  simulationHeader = 'Success ✅';
  simulationText = 'The simulation was successful. It is available here:';

  return {
    content: panel([
      heading(simulationHeader),
      text(simulationText),
      copyable(link),
    ]),
  };
};
