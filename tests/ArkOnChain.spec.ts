import {
    Blockchain,
    SandboxContract,
    TreasuryContract,
    printTransactionFees,
    prettyLogTransactions,
    RemoteBlockchainStorage,
    wrapTonClient4ForRemote,
} from '@ton/sandbox';
import { Address, exoticPruned, toNano, address } from '@ton/core';
import { JettonMaster, TonClient4,  } from "@ton/ton";
import { OutterDishVault } from '../wrappers/OutterDishVault';

import { MockJetton, JettonTransfer } from "../wrappers/tact_MockJetton"
import { ExampleJettonWallet } from "../wrappers/tact_ExampleJettonWallet"
import { ArkMarket, Withdraw } from "../wrappers/tact_ArkMarket"

import { SampleJetton, Mint, TokenTransfer } from "../wrappers/SampleJetton_SampleJetton";
import { JettonDefaultWallet, TokenBurn } from "../wrappers/SampleJetton_JettonDefaultWallet";

import '@ton/test-utils';

import { Dictionary, beginCell, Cell } from "@ton/core";
import { send } from 'process';

import { getHttpV4Endpoint } from '@orbs-network/ton-access'

describe('Ark', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let outterDishVault: SandboxContract<OutterDishVault>;

    let arkMarket: SandboxContract<ArkMarket>

    let token1: SandboxContract<SampleJetton>
    let jettonWallet1: SandboxContract<JettonDefaultWallet>;

    let jetton1: SandboxContract<MockJetton>

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        // outterDishVault = blockchain.openContract(await OutterDishVault.fromInit());

        deployer = await blockchain.treasury('deployer');

        let cell0 = beginCell().storeInt(1, 8).endCell()
        token1 = blockchain.openContract(await SampleJetton.fromInit(deployer.address, cell0, toNano(1234766689011)))
        const dres = await token1.send(
            deployer.getSender(),
            {
                value: toNano("10")
            },
            "Mint: 100"
        )
        expect(dres.transactions).toHaveTransaction({
            from: deployer.address,
            to: token1.address,
            deploy: true,
            success: true
        })

        const playerWallet = await token1.getGetWalletAddress(deployer.address)
        jettonWallet1 = blockchain.openContract(await JettonDefaultWallet.fromAddress(playerWallet))


        arkMarket = blockchain.openContract(await ArkMarket.fromInit())
        const arkMarketDeployRes = await arkMarket.send(
            deployer.getSender(),
            {
                value: toNano("50")
            },
            {
                $$type: "Deploy",
                queryId: 0n,
            }
        )
        expect(arkMarketDeployRes.transactions).toHaveTransaction({
            from: deployer.address,
            to: arkMarket.address,
            deploy: true,
            success: true
        })
    });

    it.skip('on chain', async () => {

        const depositAmont = toNano('200')
        const withdrawAmount = toNano('100')
        const remainAmount = toNano('100')



        const blkch = await Blockchain.create({
            storage: new RemoteBlockchainStorage(wrapTonClient4ForRemote(new TonClient4({
                endpoint: await getHttpV4Endpoint({
                    network: 'testnet'
                })
            })))
        })


        const master = blkch.openContract(await MockJetton.fromAddress(address('kQDkCnBGA7n_3ZR_s1gaTJQCUP0I5DxR1da9UMc9UQ4hvSfW')))
        let userWalletAddress = await master.getGetWalletAddress(address('0QBliaupXVR4h7gHuhXNfG23hJdvYL6Nsp_T6sMgHpqNOTrA'))
        console.log('user wallet address', userWalletAddress)

        const userWallet = blkch.openContract(await ExampleJettonWallet.fromAddress(userWalletAddress))
        let userData = await userWallet.getGetWalletData()
        console.log('user balance',userData.balance)

        ///
        const arkMarket = blkch.openContract(await ArkMarket.fromAddress(address('kQCGUX0374rxJY-v11-DubMeoYgjut-Uo9JzogNy8Im63372')))

        // const depositMessage : JettonTransfer = {
        //     $$type: 'JettonTransfer',
        //     query_id: 0n,
        //     amount: depositAmont,
        //     destination: arkMarket.address,
        //     response_destination: from.address,
        //     custom_payload: null,
        //     forward_ton_amount: toNano("1"),
        //     forward_payload: beginCell().endCell(),
        // }

        let pppp = await blkch.sender(address('0QBliaupXVR4h7gHuhXNfG23hJdvYL6Nsp_T6sMgHpqNOTrA'))


        console.log(pppp.address)


        // const player = await blkch.treasury('player')
        // const playerWallerAddres = await master.getGetWalletAddress(player.address)
        // const playerWaller = blkch.openContract(await ExampleJettonWallet.fromAddress(playerWallerAddres))
        // let playerData = await playerWaller.getGetWalletData()
        // console.log('user balance', playerData.balance)


    });

});
