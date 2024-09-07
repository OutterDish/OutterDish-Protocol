import { toNano } from '@ton/core';
import { OutterDishVault } from '../wrappers/OutterDishVault';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const outterDishVault = provider.open(await OutterDishVault.fromInit());

    await outterDishVault.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(outterDishVault.address);

    // run methods on `outterDishVault`
}
