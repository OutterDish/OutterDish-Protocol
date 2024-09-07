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
    let deployer2: SandboxContract<TreasuryContract>;

    let outterDishVault: SandboxContract<OutterDishVault>;

    let arkMarket: SandboxContract<ArkMarket>

    let token1: SandboxContract<SampleJetton>
    let token2: SandboxContract<SampleJetton>

    let jettonWallet1: SandboxContract<JettonDefaultWallet>;
    let jettonWallet2: SandboxContract<JettonDefaultWallet>;



    beforeEach(async () => {
        blockchain = await Blockchain.create();
        blockchain.now = Math.floor(Date.now() / 1000);

        deployer = await blockchain.treasury('deployer');
        deployer2 = await blockchain.treasury('deployer2');


        //
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


        ///
        let cell1 = beginCell().storeInt(1, 8).endCell()
        token2 = blockchain.openContract(await SampleJetton.fromInit(deployer2.address, cell1, toNano(112123489011)))
        const dres2 = await token2.send(
            deployer2.getSender(),
            {
                value: toNano("10")
            },
            "Mint: 100"
        )
        expect(dres2.transactions).toHaveTransaction({
            from: deployer2.address,
            to: token2.address,
            deploy: true,
            success: true
        })

        const playerWallet2 = await token2.getGetWalletAddress(deployer2.address)
        jettonWallet2 = blockchain.openContract(await JettonDefaultWallet.fromAddress(playerWallet2))

        // let aaa = await jettonWallet2.getGetWalletData()
        // console.log('aaaà', aaa.balance)

        // const transferMessage: TokenTransfer = {
        //     $$type: "TokenTransfer",
        //     query_id: 0n,
        //     amount: toNano('100'),
        //     sender: deployer.address,
        //     response_destination: deployer2.address,
        //     custom_payload: null,
        //     forward_ton_amount: toNano("1"),
        //     forward_payload: beginCell().endCell(),
        // }
        // const senderWalletAddress2 = await token2.getGetWalletAddress(deployer2.address)
        // const senderWallet2 = blockchain.openContract(JettonDefaultWallet.fromAddress(senderWalletAddress2))
        // const transferRes = await senderWallet2.send(deployer2.getSender(), { value: toNano('1.5') }, transferMessage)


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


        const arkWallet2 = await token2.getGetWalletAddress(arkMarket.address)
        const arkMarketAddToken2 = await arkMarket.send(
            deployer.getSender(),
            {
                value: toNano('5')
            },
            {
                $$type: "AddToken",
                token: token2.address,
                walletAddress: arkWallet2,
                reserveFactor: 10n,
                collateralFactor: 50n,
                baseRatePerYear: 1000n,
                multiplierPerYear: 0n,
                jumpMultiplierPerYear: 0n,
                kink: 0n,
            }
        )
        expect(arkMarketAddToken2.transactions).toHaveTransaction({
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

        const arkMarketTokenValidityToggle2 = await arkMarket.send(
            deployer.getSender(),
            {
                value: toNano('5')
            },
            {
                $$type: 'TokenValidityToggle',
                token: token2.address,
                valid: true
            }
        )
        expect(arkMarketTokenValidityToggle2.transactions).toHaveTransaction({
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


        const arkMarketSetPrice2 = await arkMarket.send(
            deployer.getSender(),
            {
                value: toNano('5')
            },
            {
                $$type: 'SetPrice',
                token: token2.address,
                price: toNano('10000')
            }
        )
        expect(arkMarketSetPrice2.transactions).toHaveTransaction({
            success: true
        })


    });


    it.skip('transfer', async () => {
        // console.log('arkmarket paused?', await arkMarket.getPaused())
        // console.log('token price', await arkMarket.getTokenPrice(token1.address))
        // console.log('token info', await arkMarket.getTokenInfo(token1.address))

        const sender = await blockchain.treasury("sender")
        const borrower = await blockchain.treasury("borrower")

        const depositAmont = toNano('200')
        const withdrawAmount = toNano('80')
        const remainAmount = toNano('100')


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


        const mintMessage2: Mint = {
            $$type: 'Mint',
            amount: toNano(100000),
            receiver: borrower.address,
        }
        const mintRes2 = await token1.send(deployer.getSender(), { value: toNano("10") }, mintMessage2)
        const mintRes3 = await token2.send(deployer2.getSender(), { value: toNano("10") }, mintMessage2)


        const borrowerWalletAddress2 = await token2.getGetWalletAddress(borrower.address)
        const borrowerWallet2 = blockchain.openContract(JettonDefaultWallet.fromAddress(borrowerWalletAddress2))
        const bbbbb = await borrowerWallet2.getGetWalletData()
        console.log('after mint borrower token2 balance', bbbbb.balance)



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



        const transferMessage2: TokenTransfer = {
            $$type: "TokenTransfer",
            query_id: 0n,
            amount: toNano('1000'),
            sender: arkMarket.address,
            response_destination: borrower.address,
            custom_payload: null,
            forward_ton_amount: toNano("1"),
            forward_payload: beginCell().endCell(),
        }
        // const borrowerWalletAddress = await token1.getGetWalletAddress(borrower.address)
        // const borrowerWallet = blockchain.openContract(JettonDefaultWallet.fromAddress(borrowerWalletAddress))
        // const transferRes01 = await borrowerWallet.send(borrower.getSender(), { value: toNano('1.5') }, transferMessage2)



        const transferRes02 = await borrowerWallet2.send(borrower.getSender(), { value: toNano('1.5') }, transferMessage2)
        // expect(transferRes02.transactions).toHaveTransaction({
        //     from: borrower.address,
        //     to: arkMarket.address,
        //     deploy: true
        // })
        const bbbbb2 = await borrowerWallet2.getGetWalletData()
        console.log('after deposit borrower token2 balance', bbbbb2.balance)


        const arkMarketToken2Address = await token2.getGetWalletAddress(arkMarket.address)
        console.log('arkmarket 2 token address', arkMarketToken2Address)
        // EQDSlCLoKvEHW-Tyg3qBktu6rCXPDbm2ajoFmIy0SRND9BiQ  arkmarket token02


        //  borrower ledger EQCP1kSPDof6wue5wersx_Gng5YINOHG32pqfcZBxBxAVpxU

        const borrowerLedger = blockchain.openContract(Ledger.fromAddress(address('EQCP1kSPDof6wue5wersx_Gng5YINOHG32pqfcZBxBxAVpxU')))
        const userInfo0 = await borrowerLedger.getAccountSupplys(token2.address)
        console.log('borrower info supply', userInfo0)


        const borrowRes = await arkMarket.send(
            borrower.getSender(),
            {
                value: toNano('5')
            },
            {
                $$type: 'Borrow',
                token: token1.address,
                amount: toNano('30')
            }
        )
        // console.log('token2 info before', await arkMarket.getTokenInfo(token2.address))
        // expect(borrowRes.transactions).toHaveTransaction({
        //     // from: arkMarket.address,
        //     // to: address('EQC1cuhmzWZNJ2q-3xpF0-FXe1DqAaXbSW2pCpIRbPbsnwKQ'),
        //     // success: true,
        //     deploy: true
        // })

        console.log('token1 info before', await arkMarket.getTokenInfo(token2.address))

        const userInfo1 = await borrowerLedger.getAccountBorrows(token1.address)
        console.log('borrower info after borrower', userInfo1)





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




        // check interest rate
        blockchain.now!! += 100000000
        const transferRes2 = await senderWallet.send(sender.getSender(), { value: toNano('1.5') }, transferMessage)

        // check ledger detail
        const senderLedger = blockchain.openContract(await Ledger.fromAddress(address('EQC1cuhmzWZNJ2q-3xpF0-FXe1DqAaXbSW2pCpIRbPbsnwKQ')))
        let aa = await senderLedger.getSupplyLength()

        console.log('sender ledger', await senderLedger.getAccountSupplys(token1.address))





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
            success: true
        })

        const arkMarketWalletData2 = await arkMarketWallet.getGetWalletData()
        console.log('arkMarketWallet balance', arkMarketWalletData2.balance)
        console.log('token info after2', await arkMarket.getTokenInfo(token1.address))


    })
});
