import { TENDERLY_PROJECT, TENDERLY_KEY, TENDERLY_ID } from './config';

export const getSimulation = async (
  transaction: Record<string, unknown>,
  chainId: string,
) => {
  const chainIdentifier = parseInt(chainId.replace('eip155:', ''), 16);

  const body = {
    save: true,
    save_if_fails: true,
    simulation_type: 'full',
    network_id: chainIdentifier,
    from: transaction.from,
    to: transaction.to,
    input: transaction.data,
    value: transaction.value,
  };

  const resp = await fetch(
    `https://api.tenderly.co/api/v1/account/${TENDERLY_ID}/project/${TENDERLY_PROJECT}/simulate`,
    {
      method: 'post',
      headers: { 'X-Access-Key': TENDERLY_KEY },
      body: JSON.stringify(body),
    },
  );
  const respBody = await resp.json();
  let simulation;

  if (resp.status === 200) {
    simulation = respBody.simulation;
  } else {
    simulation = undefined;
  }

  return simulation;
};
