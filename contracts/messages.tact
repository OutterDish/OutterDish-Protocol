// Messages

// For Jetton
message(0x0f8a7ea5) JettonTransfer {
    query_id: Int as uint64;                // arbitrary request number
    amount: Int as coins;                   // amount of jettons to transfer
    destination: Address;                   // address of the new owner of the jettons
    response_destination: Address;          // address where to send a response with confirmation of a successful transfer and the rest of the incoming message Toncoins.
    custom_payload: Cell?;                  // optional custom payload
    forward_ton_amount: Int as coins;       // the amount of nanotons to be sent to the destination address.
    forward_payload: Slice as remaining;    // optional custom data that should be sent to the destination address.
}

message(0x7362d09c) JettonTransferNotification {
    query_id: Int as uint64;                // arbitrary request number
    amount: Int as coins;                   // amount of jettons to transfer
    sender: Address;                        // address of the sender of the jettons
    forward_payload: Slice as remaining;    // optional custom payload
}


// OutterDish
message AddPool{
    tokenAddress: Address;        // jetton wallet address
}

struct PoolInfo {
    tokenSupply: Int as coins;     // total supply
    tokenAddress: Address;         // jetton wallet address
}

struct OutterDishVaultData {
    owner: Address;                 // vault owner
    pools: map<Address, PoolInfo>;  // jetton wallet address => Pool Info
    arkMarketAddress: Address;      // ark market address
}

message ArkWithdraw {
    token: Address;                 // jetton master address
    amount: Int;                    // withdraw amount
}

message JettonWithdraw {
    tokenWallet: Address;           // jetton wallet address
    amount: Int;                    // withdraw amount
    receiver: Address;              // jetton receiver
}


// Ark
message(0x5492d34d) Withdraw {
    token: Address;
    amount: Int;
}

