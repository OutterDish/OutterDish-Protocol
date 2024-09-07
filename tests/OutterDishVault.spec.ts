import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano, address, beginCell } from '@ton/core';
// import { OutterDishLedger } from '../wrappers/OutterDishLedger';
import '@ton/test-utils';


import { ArkMarket, Withdraw } from "../wrappers/tact_ArkMarket"


import { SampleJetton, Mint, TokenTransfer } from "../wrappers/SampleJetton_SampleJetton";
import { JettonDefaultWallet, TokenBurn } from "../wrappers/SampleJetton_JettonDefaultWallet";
import { Ledger } from '../wrappers/tact_Ledger';

import { OutterDishVault, loadArkWithdraw } from '../wrappers/OutterDishVault';
import { OutterDishLedger } from '../wrappers/OutterDishLedger';

describe('OutterDishValue', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let user: SandboxContract<TreasuryContract>;


    // let outterDishLedger: SandboxContract<OutterDishLedger>;
    let outterDishVault: SandboxContract<OutterDishVault>;
    let arkMarket: SandboxContract<ArkMarket>
    let token1: SandboxContract<SampleJetton>


    beforeEach(async () => {
        blockchain = await Blockchain.create();

        user = await blockchain.treasury('user')
        deployer = await blockchain.treasury('deployer');

        // deploy token1
        let cell1 = beginCell().storeInt(1, 8).endCell()
        token1 = blockchain.openContract(await SampleJetton.fromInit(deployer.address, cell1, toNano(1234766689011)))
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


        // deploy ark market
        arkMarket = blockchain.openContract(await ArkMarket.fromInit())
        const arkMarketDeployRes = await arkMarket.send(
            deployer.getSender(),
            {
                value: toNano("10")
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
                baseRatePerYear: 100n,
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



        // deploy OutterDishVault
        outterDishVault = blockchain.openContract(await OutterDishVault.fromInit(deployer.address, arkMarket.address));
        const deployResult = await outterDishVault.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );
        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: outterDishVault.address,
            deploy: true,
            success: true,
        });


        // let aaa = await outterDishVault.getGetOutterDishVaultData()
        // console.log(aaa.pools)


        // deployer add pool
        const odvToken1WalletAddress = await token1.getGetWalletAddress(outterDishVault.address)
        const odvAddPool = await outterDishVault.send(
            deployer.getSender(),
            {
                value: toNano('5')
            },
            {
                $$type: 'AddPool',
                tokenAddress: odvToken1WalletAddress
            }
        )

        // aaa = await outterDishVault.getGetOutterDishVaultData()
        // console.log(aaa.pools)


    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and outterDishLedger are ready to use

        const depositAmont = toNano('200')


        // mint tokne1 to user
        const mintMessage: Mint = {
            $$type: 'Mint',
            amount: toNano(100000),
            receiver: user.address,
        }
        const mintRes = await token1.send(deployer.getSender(), { value: toNano("10") }, mintMessage)
        expect(mintRes.transactions).toHaveTransaction({
            from: deployer.address,
            to: token1.address,
            success: true
        })

        const userToken1WalletAddress = await token1.getGetWalletAddress(user.address)
        const userToken1Wallet = blockchain.openContract(JettonDefaultWallet.fromAddress(userToken1WalletAddress))


        // transfer token1 to outterdishvault
        const transferMessage: TokenTransfer = {
            $$type: "TokenTransfer",
            query_id: 0n,
            amount: depositAmont,
            sender: outterDishVault.address,
            response_destination: user.address,
            custom_payload: null,
            forward_ton_amount: toNano("3"),
            forward_payload: beginCell().endCell(),
        }

        const transferRes = await userToken1Wallet.send(user.getSender(), { value: toNano('4') }, transferMessage)
        expect(transferRes.transactions).toHaveTransaction({
            from: user.address,
            to: userToken1Wallet.address,
            success: true,
        })

        // console.log('user address', user.address)
        let userLedgerAddress = await outterDishVault.getGetOutterDishLedgerAddress(user.address)
        console.log('userLedgerAddress', userLedgerAddress)


        const userLedger = blockchain.openContract(OutterDishLedger.fromAddress(userLedgerAddress))

        // == user ledger token1 detail
        const userLedgerToken1WalletAddress = await token1.getGetWalletAddress(userLedger.address)
        const userLedgerToken1Wallet = blockchain.openContract(JettonDefaultWallet.fromAddress(userLedgerToken1WalletAddress))
        let userLedgerToken1WalletData = await userLedgerToken1Wallet.getGetWalletData()
        console.log('userLedgerToken1WalletBalance after deposit', userLedgerToken1WalletData.balance) //require 0


        // == ark token1 detail
        const arkMarketToken1WalletAddress = await token1.getGetWalletAddress(arkMarket.address)
        const arkMarketToken1Wallet = blockchain.openContract(JettonDefaultWallet.fromAddress(arkMarketToken1WalletAddress))
        let arkMarketToken1WalletData = await arkMarketToken1Wallet.getGetWalletData()
        console.log('arkMarketToken1WalletData after deposit', arkMarketToken1WalletData.balance) //require 0


        // =======
        await userLedger.send(user.getSender(), { value: toNano('3') }, { $$type: 'ArkWithdraw', token: token1.address, amount: toNano('112') })

        userLedgerToken1WalletData = await userLedgerToken1Wallet.getGetWalletData()
        console.log('userLedgerToken1WalletBalance after ark withdraw', userLedgerToken1WalletData.balance)


        // == ledger jetton withdraw
        await userLedger.send(user.getSender(), { value: toNano('2') }, { $$type: "JettonWithdraw", tokenWallet: userLedgerToken1WalletAddress, amount: toNano('30'), receiver: user.address })

        userLedgerToken1WalletData = await userLedgerToken1Wallet.getGetWalletData()
        console.log('userLedgerToken1WalletBalance after jetton withdraw', userLedgerToken1WalletData.balance)

    });

});
