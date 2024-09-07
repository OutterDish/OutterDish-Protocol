import "@stdlib/deploy";
import "./messages.tact";

contract OutterDishLedger with Deployable {

    outterdishVaultAddress: Address;
    arkMarketAddress: Address;
    owner: Address;


    init(_outterdishVaultAddress: Address, _arkMarketAddress: Address, _owner: Address) {
        self.outterdishVaultAddress = _outterdishVaultAddress;
        self.arkMarketAddress = _arkMarketAddress;
        self.owner = _owner;
    }


    receive(msg: ArkWithdraw) {
        require(context().sender == self.owner, "only owner can ark withdraw");
        send(SendParameters{
            to: self.arkMarketAddress,
            value: ton("2"),
            mode: 0,
            body: Withdraw{
                token: msg.token,
                amount: msg.amount
            }.toCell()
        })
    }

    receive(msg: JettonWithdraw) {
        require(context().sender == self.owner, "only owner can jetton withdraw");
        self.sendJetton(msg.tokenWallet, 0, msg.amount, msg.receiver, msg.receiver, SendRemainingValue);
    }

    receive(msg: JettonTransferNotification) {
        let ctx: Context = context();
        if (msg.sender == self.outterdishVaultAddress) {
            dump("~~~~~~~~~");  
            send(SendParameters{
                to: ctx.sender, // this jetton wallet
                value: ton("1.5"), 
                mode: 0,
                body: JettonTransfer{
                    query_id:0,
                    amount: msg.amount,
                    destination: self.arkMarketAddress,
                    response_destination: msg.sender,
                    custom_payload: null,
                    forward_ton_amount: ton("1"),
                    forward_payload: beginCell().endCell().asSlice(),
                }.toCell()
            });
        } else {
            dump("ark lack withdraw notification");
        }
    }

    receive("identify") {
        dump("======+++++======");
        dump(myAddress());
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
}
