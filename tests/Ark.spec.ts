import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { exoticPruned, toNano, address, Address } from '@ton/core';
import { OutterDishVault } from '../wrappers/OutterDishVault';

import { MockJetton } from "../wrappers/tact_MockJetton"
import { ExampleJettonWallet, JettonTransfer } from "../wrappers/tact_ExampleJettonWallet"
import { ArkMarket, Withdraw } from "../wrappers/tact_ArkMarket"


import { SampleJetton, Mint, TokenTransfer } from "../wrappers/SampleJetton_SampleJetton";
import { JettonDefaultWallet, TokenBurn } from "../wrappers/SampleJetton_JettonDefaultWallet";

import '@ton/test-utils';

import { Dictionary, beginCell, Cell } from "@ton/core";
import { send } from 'process';
import exp from 'constants';
import { Ledger } from '../wrappers/tact_Ledger';



describe('Ark', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let outterDishVault: SandboxContract<OutterDishVault>;

    let arkMarket: SandboxContract<ArkMarket>

    let token1: SandboxContract<SampleJetton>
    let jettonWallet1: SandboxContract<JettonDefaultWallet>;

    // let jetton1: SandboxContract<MockJetton>

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        blockchain.now = Math.floor(Date.now() / 1000);

        // outterDishVault = blockchain.openContract(await OutterDishVault.fromInit());

        deployer = await blockchain.treasury('deployer');

        // const deployResult = await outterDishVault.send(
        //     deployer.getSender(),
        //     {
        //         value: toNano('0.05'),
        //     },
        //     {
        //         $$type: 'Deploy',
        //         queryId: 0n,
        //     }
        // );

        // expect(deployResult.transactions).toHaveTransaction({
        //     from: deployer.address,
        //     to: outterDishVault.address,
        //     deploy: true,
        //     success: true,
        // });

        // jetton1 = blockchain.openContract(await MockJetton.fromInit(deployer.address, toNano(1234766689011)))
        // const depolyJetton1Res = await jetton1.send(
        //     deployer.getSender(),
        //     {
        //         value: toNano('10')
        //     },
        //     {
        //         $$type: 'Deploy',
        //         queryId: 0n,
        //     }
        // )
        // expect(depolyJetton1Res.transactions).toHaveTransaction({
        //     success: true,
        //     deploy: true,
        //     from: deployer.address,
        //     to: jetton1.address
        // })

        // const mintJetton1Res = await jetton1.send(deployer.getSender(), { value: toNano('5') }, 'Mint:100000')
        // expect(mintJetton1Res.transactions).toHaveTransaction({
        //     success: true
        // })
        // const mintJetton1Res2 = await jetton1.send(deployer.getSender(), { value: toNano('5') }, { 
        //     $$type: "JettonMint",
        //     origin: deployer.address,
        //     receiver: deployer.address,
        //     amount: toNano('1000'),
        //     custom_payload: null,
        //     forward_ton_amount: 2n,
        //     forward_payload: beginCell().endCell(),
        // })

        // const deployerWalletAddress = await jetton1.getGetWalletAddress(deployer.address)
        // const deployerWallet = await blockchain.openContract(await ExampleJettonWallet.fromAddress(deployerWalletAddress))
        // const deployerWalletData = await deployerWallet.getGetWalletData()
        // console.log('deployer after mint balance', deployerWalletData.balance)


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

        //// arkMarket init

        // 1 set pause
        const arkMarketSetPaused = await arkMarket.send(
            deployer.getSender(),
            {
                value: toNano('5')
            },
            {
                $$type: "SetPaused",
                paused: false
            }
        )

        // 2 add token
        const arkWallet = await token1.getGetWalletAddress(arkMarket.address)
        const arkMarketAddToken = await arkMarket.send(
            deployer.getSender(),
            {
                value: toNano('5')
            },
            {
                $$type: "AddToken",
                token: token1.address,
                walletAddress: arkWallet,
                reserveFactor: 10n,
                collateralFactor: 50n,
                baseRatePerYear: 1000n,
                multiplierPerYear: 0n,
                jumpMultiplierPerYear: 0n,
                kink: 0n,
            }
        )
        expect(arkMarketAddToken.transactions).toHaveTransaction({
            success: true
        })

        // 3 TokenValidityToggle
        const arkMarketTokenValidityToggle = await arkMarket.send(
            deployer.getSender(),
            {
                value: toNano('5')
            },
            {
                $$type: 'TokenValidityToggle',
                token: token1.address,
                valid: true
            }
        )
        expect(arkMarketTokenValidityToggle.transactions).toHaveTransaction({
            success: true
        })

        // 4 set price
        const arkMarketSetPrice = await arkMarket.send(
            deployer.getSender(),
            {
                value: toNano('5')
            },
            {
                $$type: 'SetPrice',
                token: token1.address,
                price: toNano('100')
            }
        )
        expect(arkMarketSetPrice.transactions).toHaveTransaction({
            success: true
        })
        ////



        // jetton1 = blockchain.openContract(await MockJetton.fromInit(deployer.address, toNano(1234766689011)))
        // const deployJetton1Res = await jetton1.send(
        //     deployer.getSender(),
        //     {
        //         value: toNano("10")
        //     },
        //     {
        //         $$type: "Deploy",
        //         queryId: 0n,
        //     }
        // )
        // expect(deployJetton1Res.transactions).toHaveTransaction({
        //     // from: deployer.address,
        //     // to: jetton1.address,
        //     deploy: true,
        //     success: true,
        // })

    });

    it.skip('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and outterDishVault are ready to use

    });

    it.skip('transfer', async () => {
        // console.log('arkmarket paused?', await arkMarket.getPaused())
        // console.log('token price', await arkMarket.getTokenPrice(token1.address))
        console.log('token info', await arkMarket.getTokenInfo(token1.address))

        const sender = await blockchain.treasury("sender")

        const depositAmont = toNano('200')
        const withdrawAmount = toNano('80')
        const remainAmount = toNano('100')

        // console.log('sender ledger state', await arkMarket.getLedgerState(sender.address))

        const mintMessage: Mint = {
            $$type: 'Mint',
            amount: toNano(100000),
            receiver: sender.address,
        }
        const mintRes = await token1.send(deployer.getSender(), { value: toNano("10") }, mintMessage)
        expect(mintRes.transactions).toHaveTransaction({
            from: deployer.address,
            to: token1.address,
            success: true
        })

        const senderWalletAddress = await token1.getGetWalletAddress(sender.address)
        const senderWallet = blockchain.openContract(JettonDefaultWallet.fromAddress(senderWalletAddress))

        const transferMessage: TokenTransfer = {
            $$type: "TokenTransfer",
            query_id: 0n,
            amount: depositAmont,
            sender: arkMarket.address,
            response_destination: sender.address,
            custom_payload: null,
            forward_ton_amount: toNano("1"),
            forward_payload: beginCell().endCell(),
        }

        const transferRes = await senderWallet.send(sender.getSender(), { value: toNano('1.5') }, transferMessage)
        expect(transferRes.transactions).toHaveTransaction({
            from: sender.address,
            to: senderWallet.address,
            success: true,
        })



        // arkmarket addresss EQCGUX0374rxJY-v11-DubMeoYgjut-Uo9JzogNy8Im638V8
        // arkMarket Wallet address EQDujnJzx9yNBQ4o7l0FrAwlY42vqYP3zmODCxh7YGcrkXmj
        // sender ledger look like to: EQC1cuhmzWZNJ2q-3xpF0-FXe1DqAaXbSW2pCpIRbPbsnwKQ
        // sender jetton waller EQC-9l2ONTICbCgkAZmnnW_kmuWlp0g0S0fHnoMjYZuhlsVf

        // deploy sender ledger
        expect(transferRes.transactions).toHaveTransaction({
            from: arkMarket.address,
            to: address('EQC1cuhmzWZNJ2q-3xpF0-FXe1DqAaXbSW2pCpIRbPbsnwKQ'),
            success: true,
            deploy: true
        })
        

        // console.log(transferRes.transactions)
        // for (let i=0; i< transferRes.transactions.length; i++) {
        //     console.log(i);
        //     console.log(transferRes.transactions[i].inMessage?.info)
        // }


        // check ledger detail
        // const senderLedger = blockchain.openContract(await Ledger.fromAddress(address('EQC1cuhmzWZNJ2q-3xpF0-FXe1DqAaXbSW2pCpIRbPbsnwKQ')))
        // let aa = await senderLedger.getSupplyLength()

        // console.log(aa)
        // console.log(await senderLedger.getAccountSupplys(token1.address))
        // console.log(await senderLedger.getBalance())


        ////////////////
        /////// check arkMarket token1 wallet address
        const arkMarketWalletAddress = await token1.getGetWalletAddress(arkMarket.address)
        const arkMarketWallet = blockchain.openContract(JettonDefaultWallet.fromAddress(arkMarketWalletAddress))
        const arkMarketWalletData = await arkMarketWallet.getGetWalletData()
        expect(arkMarketWalletData.balance).toEqual(depositAmont)



        console.log('xxx', blockchain.now)

        
        // check interest rate
        blockchain.now!! += 100000000
        const transferRes2 = await senderWallet.send(sender.getSender(), { value: toNano('1.5') }, transferMessage)

        // check ledger detail
        const senderLedger = blockchain.openContract(await Ledger.fromAddress(address('EQC1cuhmzWZNJ2q-3xpF0-FXe1DqAaXbSW2pCpIRbPbsnwKQ')))
        let aa = await senderLedger.getSupplyLength()

        console.log('sender ledger',await senderLedger.getAccountSupplys(token1.address))

        
        /////// withdraw from arkmarket
        console.log('token info after', await arkMarket.getTokenInfo(token1.address))
        const withdrawMessage: Withdraw = {
            $$type: "Withdraw",
            token: token1.address,
            amount: withdrawAmount,
        }

        const withdrawRes = await arkMarket.send(sender.getSender(), { value: toNano('2') }, withdrawMessage)
        expect(withdrawRes.transactions).toHaveTransaction({
            from: sender.address,
            to: arkMarket.address,
            success: true,
        })

        const arkMarketWalletData2 = await arkMarketWallet.getGetWalletData()
        console.log('arkMarketWallet balance', arkMarketWalletData2.balance)
        console.log('token info after2', await arkMarket.getTokenInfo(token1.address))


    })
});
