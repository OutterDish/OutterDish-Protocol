import { toNano } from '@ton/core';
import { OutterDishLedger } from '../wrappers/OutterDishLedger';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const outterDishLedger = provider.open(await OutterDishLedger.fromInit());

    await outterDishLedger.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(outterDishLedger.address);

    // run methods on `outterDishLedger`
}
