import "@stdlib/deploy";
import "./messages.tact";
import "./outter_dish_ledger.tact";

contract OutterDishVault with Deployable {

    owner: Address;
    pools: map<Address, PoolInfo>;
    arkMarketAddress: Address;

    // Initialize the contracts with owner and arkMarket address
    init(_ownerAddress: Address, _arkMarketAddress: Address) {
        self.owner = _ownerAddress;
        self.arkMarketAddress = _arkMarketAddress;
    }

    // Owner send AddPool message to add a new pool, so that users can deposit their tokens
    receive(msg: AddPool) {
        require(sender() == self.owner, "only owner can add pool");
        require(self.pools.get(msg.tokenAddress) == null , "pool already exist");

        let poolInfo: PoolInfo = PoolInfo{
            tokenSupply: 0,
            tokenAddress: msg.tokenAddress,
        };

        self.pools.set(msg.tokenAddress, poolInfo);
        self.sendTon(sender(), 0, SendRemainingValue);
    }

    // User send JettonTransferNotification to OutterDishVault to deposit their tokens
    receive(msg: JettonTransferNotification) {
        let ctx: Context = context();

        if (self.pools.get(ctx.sender) == null || ctx.value < ton("0.065")) {
            self.sendJetton(ctx.sender, 0, msg.amount, msg.sender, msg.sender, SendRemainingValue);
            return
        }

        self.userDeposit(msg, ctx);
    }


    // Deploy OutterDishLedger Contract for the user
    inline fun userDeposit(msg: JettonTransferNotification, ctx: Context) {
        require(self.pools.get(ctx.sender) != null, "pool not exists");
        let pool: PoolInfo = self.pools.get(ctx.sender)!!;

        pool.tokenSupply = pool.tokenSupply + msg.amount;

        self.pools.set(ctx.sender, pool);
        // let sendBackTon: Int = ctx.value - GAS_CONSUMPTION;

        // Get the OutterDishLedger init code for the user
        let initCode: StateInit = self._calculateOutterDishLedgerInit(msg.sender);

        send(SendParameters{
                to: contractAddress(initCode),
                value: ton("0.1"), // ~~
                mode: 0,
                body: "identify".asComment(),
                code: initCode.code,
                data: initCode.data
            }
        );

        // send msg to Jetton wallet
        send(SendParameters{
            to: ctx.sender,
            value: ton("2"), // ~~
            mode: 0,
            body: JettonTransfer{
                query_id: 0,
                amount: msg.amount,
                destination: contractAddress(initCode), // user ledger
                response_destination: myAddress(),
                custom_payload: null,
                forward_ton_amount: ton("1.5"),
                forward_payload: beginCell().endCell().asSlice(),
            }.toCell()
        })
    }

    // Check if the sender is the OutterDishLedger
    inline fun requireOutterDishLedger(sender: Address) {
        let initCode: StateInit = self._calculateOutterDishLedgerInit(sender);
        let expectedSender: Address = contractAddress(initCode);
        require(expectedSender == sender(), "unexpected sender");
    }


    // Calculate OutterDishLedger init code
    inline fun _calculateOutterDishLedgerInit(userAddress: Address): StateInit {
        return initOf OutterDishLedger(myAddress(), self.arkMarketAddress, userAddress);
    }


    // Send Jetton
    inline fun sendJetton(_to: Address, _tonValue: Int, _amount: Int, _destination: Address, _response_destination: Address, _mode: Int) {
        // Send Jetton back to the sender        
        send(SendParameters{
            to: _to,
            value: _tonValue,
            mode: _mode,
            body: JettonTransfer{
                query_id: 0,
                amount: _amount,
                destination: _destination,
                response_destination: _response_destination,
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: beginCell().storeUint(0,1).endCell().asSlice() // Have to put 1 bit, so that we can pass jetton minter exit code 708
            }.toCell()    
        });
    }

    // Send TON
    inline fun sendTon(_to: Address, _value: Int, _mode: Int) {
        send(SendParameters{
            to: _to,
            value: _value,
            mode: _mode,
            body: "MasterChef Send Back TON".asComment()
        });
    }


    // Get OutterDishLedger address by user address
    get fun getOutterDishLedgerAddress(userAddress: Address): Address {
        let initCode: StateInit = self._calculateOutterDishLedgerInit(userAddress);
        return contractAddress(initCode);
    }

    get fun getOutterDishVaultData(): OutterDishVaultData {
        return OutterDishVaultData{
            owner: self.owner,
            pools: self.pools,
            arkMarketAddress: self.arkMarketAddress,
        };
    }

}
