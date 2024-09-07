import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano, address, beginCell } from '@ton/core';
import { OutterDishLedger } from '../wrappers/OutterDishLedger';
import '@ton/test-utils';


import { ArkMarket, Withdraw } from "../wrappers/tact_ArkMarket"


import { SampleJetton, Mint, TokenTransfer } from "../wrappers/SampleJetton_SampleJetton";
import { JettonDefaultWallet, TokenBurn } from "../wrappers/SampleJetton_JettonDefaultWallet";
import { Ledger } from '../wrappers/tact_Ledger';

describe('OutterDishLedger', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let user: SandboxContract<TreasuryContract>;


    let outterDishLedger: SandboxContract<OutterDishLedger>;
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



        // deploy outterdishledger
        outterDishLedger = blockchain.openContract(await OutterDishLedger.fromInit(arkMarket.address, arkMarket.address, user.address)); /////// wrong
        const deployResult = await outterDishLedger.send(
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
            to: outterDishLedger.address,
            deploy: true,
            success: true,
        });
    });

    it.skip('should deploy', async () => {
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


        // transfer token1 to outterdishledger
        const transferMessage: TokenTransfer = {
            $$type: "TokenTransfer",
            query_id: 0n,
            amount: depositAmont,
            sender: outterDishLedger.address,
            response_destination: user.address,
            custom_payload: null,
            forward_ton_amount: toNano("2"),
            forward_payload: beginCell().endCell(),
        }

        const transferRes = await userToken1Wallet.send(user.getSender(), { value: toNano('2.5') }, transferMessage)
        expect(transferRes.transactions).toHaveTransaction({
            from: user.address,
            to: userToken1Wallet.address,
            success: true,
        })

        // const deployerToken1WalletAddress = await token1.getGetWalletAddress(deployer.address)
        // const deployerToken1Wallet = blockchain.openContract(JettonDefaultWallet.fromAddress(deployerToken1WalletAddress))
        // console.log("deployer balance", (await deployerToken1Wallet.getGetWalletData()).balance)
        // const transferRes2 = await deployerToken1Wallet.send(deployer.getSender(), { value: toNano('2.5') }, {
        //     $$type: "TokenTransfer",
        //     query_id: 0n,
        //     amount: 12n,
        //     sender: outterDishLedger.address,
        //     response_destination: deployer.address,
        //     custom_payload: null,
        //     forward_ton_amount: toNano("2"),
        //     forward_payload: beginCell().endCell(),
        // })


        const odlToken1WalletAddress = await token1.getGetWalletAddress(outterDishLedger.address)
        const odlToken1Wallet = blockchain.openContract(JettonDefaultWallet.fromAddress(odlToken1WalletAddress))

        let odlWalletData = await odlToken1Wallet.getGetWalletData()
        console.log('odl token1 balance', odlWalletData.balance)
        expect(odlWalletData.balance).toEqual(0n)

        console.log('user address', user.address) //EQABEq658dLg1KxPhXZxj0vapZMNYevotqeINH786lpwwSnT
        console.log('user waller address', await token1.getGetWalletAddress(user.address)) //EQBrzhM0EGBhXgmeMY9nobv7SNrVoZ7rklgvF6vX-lVM3twC
        console.log('odlToken1WalletAddress', odlToken1WalletAddress) //EQCm7wryJdmEKkLE_PWEvYJ_1528Nvz2Q0l2CN9kCT8Ydnlu

        // ark token1 wallet create tx
        const arkToken1WalletAddress = await token1.getGetWalletAddress(arkMarket.address)
        expect(transferRes.transactions).toHaveTransaction({
            from: odlToken1WalletAddress,
            to: arkToken1WalletAddress, //ark token wallet  EQDujnJzx9yNBQ4o7l0FrAwlY42vqYP3zmODCxh7YGcrkXmj
            deploy: true,
            success: true
        })


        // ark ledger create for odl ledger tx
        // EQB17oKpiyGadPJHSrW4LBWuCCCABFIP6TiRVq7uelIQZDS6  odl ark ledger
        // const odlarkLedgerAddress = address("EQDPAHOgvy-UDVLDv41-O0Af_yoQG0Xs7AYKutLajdi2kXKM")
        // expect(transferRes.transactions).toHaveTransaction({
        //     from: arkMarket.address,
        //     to: odlarkLedgerAddress,
        //     deploy: true,
        //     success: true
        // })

        // const odlarkLedger = blockchain.openContract(Ledger.fromAddress(odlarkLedgerAddress))

        // const userSupplyToken1 = await odlarkLedger.getAccountSupplys(token1.address)
        // expect(userSupplyToken1).toEqual(depositAmont)



        //
        const withdrawRes = await outterDishLedger.send(user.getSender(), { value: toNano('6') }, { $$type: 'ArkWithdraw', token: token1.address, amount: toNano('112') })

        odlWalletData = await odlToken1Wallet.getGetWalletData()
        console.log('odl token1 balance', odlWalletData.balance)

        // expect(withdrawRes.transactions).toHaveTransaction({
        //     from: user.address,
        //     to: user.address,
        //     deploy: true,
        // })


    //     user address EQABEq658dLg1KxPhXZxj0vapZMNYevotqeINH786lpwwSnT

    //     user waller address EQBrzhM0EGBhXgmeMY9nobv7SNrVoZ7rklgvF6vX-lVM3twC

    //     odl ledger EQDgxcEQAs5MBL0uVXNqYGd7ohH-jWH2rlxqQFqsp6UtjqmS
    //     odlToken1WalletAddress EQBfdQtGvSMpvrdagxHWN_2Nd-lVGp0tFJQ3FHbDcI-8-22s

    //    ark market EQCGUX0374rxJY-v11-DubMeoYgjut-Uo9JzogNy8Im638V8

    //   EQC8BiE7P2R3Lrek1dXAuEN_iESOKuV6tzBl_BcAXUmZXT0x ???

    });
});
