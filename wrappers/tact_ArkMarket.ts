import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    query_id: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Cell;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    token: Address;
    amount: bigint;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1418908493, 32);
        b_0.storeAddress(src.token);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1418908493) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'Withdraw' as const, token: _token, amount: _amount };
}

function loadTupleWithdraw(source: TupleReader) {
    let _token = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, token: _token, amount: _amount };
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type Borrow = {
    $$type: 'Borrow';
    token: Address;
    amount: bigint;
}

export function storeBorrow(src: Borrow) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2523322984, 32);
        b_0.storeAddress(src.token);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadBorrow(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2523322984) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'Borrow' as const, token: _token, amount: _amount };
}

function loadTupleBorrow(source: TupleReader) {
    let _token = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'Borrow' as const, token: _token, amount: _amount };
}

function storeTupleBorrow(source: Borrow) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserBorrow(): DictionaryValue<Borrow> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBorrow(src)).endCell());
        },
        parse: (src) => {
            return loadBorrow(src.loadRef().beginParse());
        }
    }
}

export type TokenInInfo = {
    $$type: 'TokenInInfo';
    from: Address;
    token: Address;
    amount: bigint;
}

export function storeTokenInInfo(src: TokenInInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1482701067, 32);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.token);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadTokenInInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1482701067) { throw Error('Invalid prefix'); }
    let _from = sc_0.loadAddress();
    let _token = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'TokenInInfo' as const, from: _from, token: _token, amount: _amount };
}

function loadTupleTokenInInfo(source: TupleReader) {
    let _from = source.readAddress();
    let _token = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'TokenInInfo' as const, from: _from, token: _token, amount: _amount };
}

function storeTupleTokenInInfo(source: TokenInInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.from);
    builder.writeAddress(source.token);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserTokenInInfo(): DictionaryValue<TokenInInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenInInfo(src)).endCell());
        },
        parse: (src) => {
            return loadTokenInInfo(src.loadRef().beginParse());
        }
    }
}

export type SetInterestRate = {
    $$type: 'SetInterestRate';
    token: Address;
    baseRatePerYear: bigint;
    multiplierPerYear: bigint;
    jumpMultiplierPerYear: bigint;
    kink: bigint;
}

export function storeSetInterestRate(src: SetInterestRate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1100673008, 32);
        b_0.storeAddress(src.token);
        b_0.storeInt(src.baseRatePerYear, 257);
        b_0.storeInt(src.multiplierPerYear, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.jumpMultiplierPerYear, 257);
        b_1.storeInt(src.kink, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSetInterestRate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1100673008) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadAddress();
    let _baseRatePerYear = sc_0.loadIntBig(257);
    let _multiplierPerYear = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _jumpMultiplierPerYear = sc_1.loadIntBig(257);
    let _kink = sc_1.loadIntBig(257);
    return { $$type: 'SetInterestRate' as const, token: _token, baseRatePerYear: _baseRatePerYear, multiplierPerYear: _multiplierPerYear, jumpMultiplierPerYear: _jumpMultiplierPerYear, kink: _kink };
}

function loadTupleSetInterestRate(source: TupleReader) {
    let _token = source.readAddress();
    let _baseRatePerYear = source.readBigNumber();
    let _multiplierPerYear = source.readBigNumber();
    let _jumpMultiplierPerYear = source.readBigNumber();
    let _kink = source.readBigNumber();
    return { $$type: 'SetInterestRate' as const, token: _token, baseRatePerYear: _baseRatePerYear, multiplierPerYear: _multiplierPerYear, jumpMultiplierPerYear: _jumpMultiplierPerYear, kink: _kink };
}

function storeTupleSetInterestRate(source: SetInterestRate) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token);
    builder.writeNumber(source.baseRatePerYear);
    builder.writeNumber(source.multiplierPerYear);
    builder.writeNumber(source.jumpMultiplierPerYear);
    builder.writeNumber(source.kink);
    return builder.build();
}

function dictValueParserSetInterestRate(): DictionaryValue<SetInterestRate> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetInterestRate(src)).endCell());
        },
        parse: (src) => {
            return loadSetInterestRate(src.loadRef().beginParse());
        }
    }
}

export type TokenValidityToggle = {
    $$type: 'TokenValidityToggle';
    token: Address;
    valid: boolean;
}

export function storeTokenValidityToggle(src: TokenValidityToggle) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3465633304, 32);
        b_0.storeAddress(src.token);
        b_0.storeBit(src.valid);
    };
}

export function loadTokenValidityToggle(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3465633304) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadAddress();
    let _valid = sc_0.loadBit();
    return { $$type: 'TokenValidityToggle' as const, token: _token, valid: _valid };
}

function loadTupleTokenValidityToggle(source: TupleReader) {
    let _token = source.readAddress();
    let _valid = source.readBoolean();
    return { $$type: 'TokenValidityToggle' as const, token: _token, valid: _valid };
}

function storeTupleTokenValidityToggle(source: TokenValidityToggle) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token);
    builder.writeBoolean(source.valid);
    return builder.build();
}

function dictValueParserTokenValidityToggle(): DictionaryValue<TokenValidityToggle> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenValidityToggle(src)).endCell());
        },
        parse: (src) => {
            return loadTokenValidityToggle(src.loadRef().beginParse());
        }
    }
}

export type LiquidateTonDebt = {
    $$type: 'LiquidateTonDebt';
    borrower: Address;
    collateral: Address;
}

export function storeLiquidateTonDebt(src: LiquidateTonDebt) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1408150853, 32);
        b_0.storeAddress(src.borrower);
        b_0.storeAddress(src.collateral);
    };
}

export function loadLiquidateTonDebt(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1408150853) { throw Error('Invalid prefix'); }
    let _borrower = sc_0.loadAddress();
    let _collateral = sc_0.loadAddress();
    return { $$type: 'LiquidateTonDebt' as const, borrower: _borrower, collateral: _collateral };
}

function loadTupleLiquidateTonDebt(source: TupleReader) {
    let _borrower = source.readAddress();
    let _collateral = source.readAddress();
    return { $$type: 'LiquidateTonDebt' as const, borrower: _borrower, collateral: _collateral };
}

function storeTupleLiquidateTonDebt(source: LiquidateTonDebt) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.borrower);
    builder.writeAddress(source.collateral);
    return builder.build();
}

function dictValueParserLiquidateTonDebt(): DictionaryValue<LiquidateTonDebt> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidateTonDebt(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidateTonDebt(src.loadRef().beginParse());
        }
    }
}

export type WithdrawInternal = {
    $$type: 'WithdrawInternal';
    account: Address;
    token: Address;
    amount: bigint;
    tokenLength: bigint;
    marketInfo: Dictionary<Address, MarketInfo>;
}

export function storeWithdrawInternal(src: WithdrawInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1482070737, 32);
        b_0.storeAddress(src.account);
        b_0.storeAddress(src.token);
        b_0.storeInt(src.amount, 257);
        b_0.storeUint(src.tokenLength, 32);
        b_0.storeDict(src.marketInfo, Dictionary.Keys.Address(), dictValueParserMarketInfo());
    };
}

export function loadWithdrawInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1482070737) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _tokenLength = sc_0.loadUintBig(32);
    let _marketInfo = Dictionary.load(Dictionary.Keys.Address(), dictValueParserMarketInfo(), sc_0);
    return { $$type: 'WithdrawInternal' as const, account: _account, token: _token, amount: _amount, tokenLength: _tokenLength, marketInfo: _marketInfo };
}

function loadTupleWithdrawInternal(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readAddress();
    let _amount = source.readBigNumber();
    let _tokenLength = source.readBigNumber();
    let _marketInfo = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserMarketInfo(), source.readCellOpt());
    return { $$type: 'WithdrawInternal' as const, account: _account, token: _token, amount: _amount, tokenLength: _tokenLength, marketInfo: _marketInfo };
}

function storeTupleWithdrawInternal(source: WithdrawInternal) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeAddress(source.token);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.tokenLength);
    builder.writeCell(source.marketInfo.size > 0 ? beginCell().storeDictDirect(source.marketInfo, Dictionary.Keys.Address(), dictValueParserMarketInfo()).endCell() : null);
    return builder.build();
}

function dictValueParserWithdrawInternal(): DictionaryValue<WithdrawInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawInternal(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawInternal(src.loadRef().beginParse());
        }
    }
}

export type WithdrawCorrection = {
    $$type: 'WithdrawCorrection';
    account: Address;
    token: Address;
    amount: bigint;
}

export function storeWithdrawCorrection(src: WithdrawCorrection) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1972229350, 32);
        b_0.storeAddress(src.account);
        b_0.storeAddress(src.token);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadWithdrawCorrection(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1972229350) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'WithdrawCorrection' as const, account: _account, token: _token, amount: _amount };
}

function loadTupleWithdrawCorrection(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'WithdrawCorrection' as const, account: _account, token: _token, amount: _amount };
}

function storeTupleWithdrawCorrection(source: WithdrawCorrection) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeAddress(source.token);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdrawCorrection(): DictionaryValue<WithdrawCorrection> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawCorrection(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawCorrection(src.loadRef().beginParse());
        }
    }
}

export type BorrowInternal = {
    $$type: 'BorrowInternal';
    account: Address;
    token: Address;
    amount: bigint;
    tokenLength: bigint;
    marketInfo: Dictionary<Address, MarketInfo>;
}

export function storeBorrowInternal(src: BorrowInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(743785013, 32);
        b_0.storeAddress(src.account);
        b_0.storeAddress(src.token);
        b_0.storeInt(src.amount, 257);
        b_0.storeUint(src.tokenLength, 32);
        b_0.storeDict(src.marketInfo, Dictionary.Keys.Address(), dictValueParserMarketInfo());
    };
}

export function loadBorrowInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 743785013) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _tokenLength = sc_0.loadUintBig(32);
    let _marketInfo = Dictionary.load(Dictionary.Keys.Address(), dictValueParserMarketInfo(), sc_0);
    return { $$type: 'BorrowInternal' as const, account: _account, token: _token, amount: _amount, tokenLength: _tokenLength, marketInfo: _marketInfo };
}

function loadTupleBorrowInternal(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readAddress();
    let _amount = source.readBigNumber();
    let _tokenLength = source.readBigNumber();
    let _marketInfo = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserMarketInfo(), source.readCellOpt());
    return { $$type: 'BorrowInternal' as const, account: _account, token: _token, amount: _amount, tokenLength: _tokenLength, marketInfo: _marketInfo };
}

function storeTupleBorrowInternal(source: BorrowInternal) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeAddress(source.token);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.tokenLength);
    builder.writeCell(source.marketInfo.size > 0 ? beginCell().storeDictDirect(source.marketInfo, Dictionary.Keys.Address(), dictValueParserMarketInfo()).endCell() : null);
    return builder.build();
}

function dictValueParserBorrowInternal(): DictionaryValue<BorrowInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBorrowInternal(src)).endCell());
        },
        parse: (src) => {
            return loadBorrowInternal(src.loadRef().beginParse());
        }
    }
}

export type SupplyInternal = {
    $$type: 'SupplyInternal';
    account: Address;
    token: Address;
    amount: bigint;
    supplyIndex: bigint;
}

export function storeSupplyInternal(src: SupplyInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(284244079, 32);
        b_0.storeAddress(src.account);
        b_0.storeAddress(src.token);
        b_0.storeInt(src.amount, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.supplyIndex, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSupplyInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 284244079) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _supplyIndex = sc_1.loadIntBig(257);
    return { $$type: 'SupplyInternal' as const, account: _account, token: _token, amount: _amount, supplyIndex: _supplyIndex };
}

function loadTupleSupplyInternal(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readAddress();
    let _amount = source.readBigNumber();
    let _supplyIndex = source.readBigNumber();
    return { $$type: 'SupplyInternal' as const, account: _account, token: _token, amount: _amount, supplyIndex: _supplyIndex };
}

function storeTupleSupplyInternal(source: SupplyInternal) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeAddress(source.token);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.supplyIndex);
    return builder.build();
}

function dictValueParserSupplyInternal(): DictionaryValue<SupplyInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSupplyInternal(src)).endCell());
        },
        parse: (src) => {
            return loadSupplyInternal(src.loadRef().beginParse());
        }
    }
}

export type RepayInternal = {
    $$type: 'RepayInternal';
    account: Address;
    token: Address;
    amount: bigint;
    borrowIndex: bigint;
}

export function storeRepayInternal(src: RepayInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174710258, 32);
        b_0.storeAddress(src.account);
        b_0.storeAddress(src.token);
        b_0.storeInt(src.amount, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.borrowIndex, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRepayInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174710258) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _borrowIndex = sc_1.loadIntBig(257);
    return { $$type: 'RepayInternal' as const, account: _account, token: _token, amount: _amount, borrowIndex: _borrowIndex };
}

function loadTupleRepayInternal(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readAddress();
    let _amount = source.readBigNumber();
    let _borrowIndex = source.readBigNumber();
    return { $$type: 'RepayInternal' as const, account: _account, token: _token, amount: _amount, borrowIndex: _borrowIndex };
}

function storeTupleRepayInternal(source: RepayInternal) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeAddress(source.token);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.borrowIndex);
    return builder.build();
}

function dictValueParserRepayInternal(): DictionaryValue<RepayInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRepayInternal(src)).endCell());
        },
        parse: (src) => {
            return loadRepayInternal(src.loadRef().beginParse());
        }
    }
}

export type RepayTON = {
    $$type: 'RepayTON';
    query_id: bigint;
}

export function storeRepayTON(src: RepayTON) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4249146135, 32);
        b_0.storeInt(src.query_id, 257);
    };
}

export function loadRepayTON(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4249146135) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadIntBig(257);
    return { $$type: 'RepayTON' as const, query_id: _query_id };
}

function loadTupleRepayTON(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'RepayTON' as const, query_id: _query_id };
}

function storeTupleRepayTON(source: RepayTON) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserRepayTON(): DictionaryValue<RepayTON> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRepayTON(src)).endCell());
        },
        parse: (src) => {
            return loadRepayTON(src.loadRef().beginParse());
        }
    }
}

export type RepayNotification = {
    $$type: 'RepayNotification';
    account: Address;
    token: Address;
    repayAmount: bigint;
    leftAmount: bigint;
}

export function storeRepayNotification(src: RepayNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(261601112, 32);
        b_0.storeAddress(src.account);
        b_0.storeAddress(src.token);
        b_0.storeInt(src.repayAmount, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.leftAmount, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRepayNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 261601112) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadAddress();
    let _repayAmount = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _leftAmount = sc_1.loadIntBig(257);
    return { $$type: 'RepayNotification' as const, account: _account, token: _token, repayAmount: _repayAmount, leftAmount: _leftAmount };
}

function loadTupleRepayNotification(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readAddress();
    let _repayAmount = source.readBigNumber();
    let _leftAmount = source.readBigNumber();
    return { $$type: 'RepayNotification' as const, account: _account, token: _token, repayAmount: _repayAmount, leftAmount: _leftAmount };
}

function storeTupleRepayNotification(source: RepayNotification) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeAddress(source.token);
    builder.writeNumber(source.repayAmount);
    builder.writeNumber(source.leftAmount);
    return builder.build();
}

function dictValueParserRepayNotification(): DictionaryValue<RepayNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRepayNotification(src)).endCell());
        },
        parse: (src) => {
            return loadRepayNotification(src.loadRef().beginParse());
        }
    }
}

export type LiquidateInternal = {
    $$type: 'LiquidateInternal';
    liquidator: Address;
    repayToken: Address;
    collateral: Address;
    repayAmount: bigint;
    tokenLength: bigint;
    closeFactor: bigint;
    liquidationIncentive: bigint;
    marketInfo: Dictionary<Address, MarketInfo>;
}

export function storeLiquidateInternal(src: LiquidateInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4115848006, 32);
        b_0.storeAddress(src.liquidator);
        b_0.storeAddress(src.repayToken);
        b_0.storeAddress(src.collateral);
        let b_1 = new Builder();
        b_1.storeInt(src.repayAmount, 257);
        b_1.storeUint(src.tokenLength, 32);
        b_1.storeInt(src.closeFactor, 257);
        b_1.storeInt(src.liquidationIncentive, 257);
        b_1.storeDict(src.marketInfo, Dictionary.Keys.Address(), dictValueParserMarketInfo());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLiquidateInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4115848006) { throw Error('Invalid prefix'); }
    let _liquidator = sc_0.loadAddress();
    let _repayToken = sc_0.loadAddress();
    let _collateral = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _repayAmount = sc_1.loadIntBig(257);
    let _tokenLength = sc_1.loadUintBig(32);
    let _closeFactor = sc_1.loadIntBig(257);
    let _liquidationIncentive = sc_1.loadIntBig(257);
    let _marketInfo = Dictionary.load(Dictionary.Keys.Address(), dictValueParserMarketInfo(), sc_1);
    return { $$type: 'LiquidateInternal' as const, liquidator: _liquidator, repayToken: _repayToken, collateral: _collateral, repayAmount: _repayAmount, tokenLength: _tokenLength, closeFactor: _closeFactor, liquidationIncentive: _liquidationIncentive, marketInfo: _marketInfo };
}

function loadTupleLiquidateInternal(source: TupleReader) {
    let _liquidator = source.readAddress();
    let _repayToken = source.readAddress();
    let _collateral = source.readAddress();
    let _repayAmount = source.readBigNumber();
    let _tokenLength = source.readBigNumber();
    let _closeFactor = source.readBigNumber();
    let _liquidationIncentive = source.readBigNumber();
    let _marketInfo = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserMarketInfo(), source.readCellOpt());
    return { $$type: 'LiquidateInternal' as const, liquidator: _liquidator, repayToken: _repayToken, collateral: _collateral, repayAmount: _repayAmount, tokenLength: _tokenLength, closeFactor: _closeFactor, liquidationIncentive: _liquidationIncentive, marketInfo: _marketInfo };
}

function storeTupleLiquidateInternal(source: LiquidateInternal) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.liquidator);
    builder.writeAddress(source.repayToken);
    builder.writeAddress(source.collateral);
    builder.writeNumber(source.repayAmount);
    builder.writeNumber(source.tokenLength);
    builder.writeNumber(source.closeFactor);
    builder.writeNumber(source.liquidationIncentive);
    builder.writeCell(source.marketInfo.size > 0 ? beginCell().storeDictDirect(source.marketInfo, Dictionary.Keys.Address(), dictValueParserMarketInfo()).endCell() : null);
    return builder.build();
}

function dictValueParserLiquidateInternal(): DictionaryValue<LiquidateInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidateInternal(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidateInternal(src.loadRef().beginParse());
        }
    }
}

export type LiquidateNotification = {
    $$type: 'LiquidateNotification';
    liquidator: Address;
    repayToken: Address;
    collateral: Address;
    repayAmount: bigint;
    seizeAmount: bigint;
    borrower: Address;
    success: boolean;
}

export function storeLiquidateNotification(src: LiquidateNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(895529019, 32);
        b_0.storeAddress(src.liquidator);
        b_0.storeAddress(src.repayToken);
        b_0.storeAddress(src.collateral);
        let b_1 = new Builder();
        b_1.storeInt(src.repayAmount, 257);
        b_1.storeInt(src.seizeAmount, 257);
        b_1.storeAddress(src.borrower);
        b_1.storeBit(src.success);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLiquidateNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 895529019) { throw Error('Invalid prefix'); }
    let _liquidator = sc_0.loadAddress();
    let _repayToken = sc_0.loadAddress();
    let _collateral = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _repayAmount = sc_1.loadIntBig(257);
    let _seizeAmount = sc_1.loadIntBig(257);
    let _borrower = sc_1.loadAddress();
    let _success = sc_1.loadBit();
    return { $$type: 'LiquidateNotification' as const, liquidator: _liquidator, repayToken: _repayToken, collateral: _collateral, repayAmount: _repayAmount, seizeAmount: _seizeAmount, borrower: _borrower, success: _success };
}

function loadTupleLiquidateNotification(source: TupleReader) {
    let _liquidator = source.readAddress();
    let _repayToken = source.readAddress();
    let _collateral = source.readAddress();
    let _repayAmount = source.readBigNumber();
    let _seizeAmount = source.readBigNumber();
    let _borrower = source.readAddress();
    let _success = source.readBoolean();
    return { $$type: 'LiquidateNotification' as const, liquidator: _liquidator, repayToken: _repayToken, collateral: _collateral, repayAmount: _repayAmount, seizeAmount: _seizeAmount, borrower: _borrower, success: _success };
}

function storeTupleLiquidateNotification(source: LiquidateNotification) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.liquidator);
    builder.writeAddress(source.repayToken);
    builder.writeAddress(source.collateral);
    builder.writeNumber(source.repayAmount);
    builder.writeNumber(source.seizeAmount);
    builder.writeAddress(source.borrower);
    builder.writeBoolean(source.success);
    return builder.build();
}

function dictValueParserLiquidateNotification(): DictionaryValue<LiquidateNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidateNotification(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidateNotification(src.loadRef().beginParse());
        }
    }
}

export type LiquidatorLedgerInternal = {
    $$type: 'LiquidatorLedgerInternal';
    token: Address;
    supplyIndex: bigint;
    seizeAmount: bigint;
}

export function storeLiquidatorLedgerInternal(src: LiquidatorLedgerInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3240150159, 32);
        b_0.storeAddress(src.token);
        b_0.storeInt(src.supplyIndex, 257);
        b_0.storeInt(src.seizeAmount, 257);
    };
}

export function loadLiquidatorLedgerInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3240150159) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadAddress();
    let _supplyIndex = sc_0.loadIntBig(257);
    let _seizeAmount = sc_0.loadIntBig(257);
    return { $$type: 'LiquidatorLedgerInternal' as const, token: _token, supplyIndex: _supplyIndex, seizeAmount: _seizeAmount };
}

function loadTupleLiquidatorLedgerInternal(source: TupleReader) {
    let _token = source.readAddress();
    let _supplyIndex = source.readBigNumber();
    let _seizeAmount = source.readBigNumber();
    return { $$type: 'LiquidatorLedgerInternal' as const, token: _token, supplyIndex: _supplyIndex, seizeAmount: _seizeAmount };
}

function storeTupleLiquidatorLedgerInternal(source: LiquidatorLedgerInternal) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token);
    builder.writeNumber(source.supplyIndex);
    builder.writeNumber(source.seizeAmount);
    return builder.build();
}

function dictValueParserLiquidatorLedgerInternal(): DictionaryValue<LiquidatorLedgerInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidatorLedgerInternal(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidatorLedgerInternal(src.loadRef().beginParse());
        }
    }
}

export type BorrowNotification = {
    $$type: 'BorrowNotification';
    account: Address;
    token: Address;
    amount: bigint;
    success: boolean;
}

export function storeBorrowNotification(src: BorrowNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(61810990, 32);
        b_0.storeAddress(src.account);
        b_0.storeAddress(src.token);
        b_0.storeInt(src.amount, 257);
        b_0.storeBit(src.success);
    };
}

export function loadBorrowNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 61810990) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _success = sc_0.loadBit();
    return { $$type: 'BorrowNotification' as const, account: _account, token: _token, amount: _amount, success: _success };
}

function loadTupleBorrowNotification(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readAddress();
    let _amount = source.readBigNumber();
    let _success = source.readBoolean();
    return { $$type: 'BorrowNotification' as const, account: _account, token: _token, amount: _amount, success: _success };
}

function storeTupleBorrowNotification(source: BorrowNotification) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeAddress(source.token);
    builder.writeNumber(source.amount);
    builder.writeBoolean(source.success);
    return builder.build();
}

function dictValueParserBorrowNotification(): DictionaryValue<BorrowNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBorrowNotification(src)).endCell());
        },
        parse: (src) => {
            return loadBorrowNotification(src.loadRef().beginParse());
        }
    }
}

export type WithdrawNotification = {
    $$type: 'WithdrawNotification';
    account: Address;
    token: Address;
    amount: bigint;
    success: boolean;
}

export function storeWithdrawNotification(src: WithdrawNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(718796426, 32);
        b_0.storeAddress(src.account);
        b_0.storeAddress(src.token);
        b_0.storeInt(src.amount, 257);
        b_0.storeBit(src.success);
    };
}

export function loadWithdrawNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 718796426) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _success = sc_0.loadBit();
    return { $$type: 'WithdrawNotification' as const, account: _account, token: _token, amount: _amount, success: _success };
}

function loadTupleWithdrawNotification(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readAddress();
    let _amount = source.readBigNumber();
    let _success = source.readBoolean();
    return { $$type: 'WithdrawNotification' as const, account: _account, token: _token, amount: _amount, success: _success };
}

function storeTupleWithdrawNotification(source: WithdrawNotification) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeAddress(source.token);
    builder.writeNumber(source.amount);
    builder.writeBoolean(source.success);
    return builder.build();
}

function dictValueParserWithdrawNotification(): DictionaryValue<WithdrawNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawNotification(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawNotification(src.loadRef().beginParse());
        }
    }
}

export type SupplyNotification = {
    $$type: 'SupplyNotification';
    account: Address;
    token: Address;
    amount: bigint;
}

export function storeSupplyNotification(src: SupplyNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3869345089, 32);
        b_0.storeAddress(src.account);
        b_0.storeAddress(src.token);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadSupplyNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3869345089) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'SupplyNotification' as const, account: _account, token: _token, amount: _amount };
}

function loadTupleSupplyNotification(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'SupplyNotification' as const, account: _account, token: _token, amount: _amount };
}

function storeTupleSupplyNotification(source: SupplyNotification) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeAddress(source.token);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserSupplyNotification(): DictionaryValue<SupplyNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSupplyNotification(src)).endCell());
        },
        parse: (src) => {
            return loadSupplyNotification(src.loadRef().beginParse());
        }
    }
}

export type AddToken = {
    $$type: 'AddToken';
    token: Address;
    walletAddress: Address;
    reserveFactor: bigint;
    collateralFactor: bigint;
    baseRatePerYear: bigint;
    multiplierPerYear: bigint;
    jumpMultiplierPerYear: bigint;
    kink: bigint;
}

export function storeAddToken(src: AddToken) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(600811363, 32);
        b_0.storeAddress(src.token);
        b_0.storeAddress(src.walletAddress);
        b_0.storeInt(src.reserveFactor, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.collateralFactor, 257);
        b_1.storeInt(src.baseRatePerYear, 257);
        b_1.storeInt(src.multiplierPerYear, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.jumpMultiplierPerYear, 257);
        b_2.storeInt(src.kink, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadAddToken(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 600811363) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadAddress();
    let _walletAddress = sc_0.loadAddress();
    let _reserveFactor = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _collateralFactor = sc_1.loadIntBig(257);
    let _baseRatePerYear = sc_1.loadIntBig(257);
    let _multiplierPerYear = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _jumpMultiplierPerYear = sc_2.loadIntBig(257);
    let _kink = sc_2.loadIntBig(257);
    return { $$type: 'AddToken' as const, token: _token, walletAddress: _walletAddress, reserveFactor: _reserveFactor, collateralFactor: _collateralFactor, baseRatePerYear: _baseRatePerYear, multiplierPerYear: _multiplierPerYear, jumpMultiplierPerYear: _jumpMultiplierPerYear, kink: _kink };
}

function loadTupleAddToken(source: TupleReader) {
    let _token = source.readAddress();
    let _walletAddress = source.readAddress();
    let _reserveFactor = source.readBigNumber();
    let _collateralFactor = source.readBigNumber();
    let _baseRatePerYear = source.readBigNumber();
    let _multiplierPerYear = source.readBigNumber();
    let _jumpMultiplierPerYear = source.readBigNumber();
    let _kink = source.readBigNumber();
    return { $$type: 'AddToken' as const, token: _token, walletAddress: _walletAddress, reserveFactor: _reserveFactor, collateralFactor: _collateralFactor, baseRatePerYear: _baseRatePerYear, multiplierPerYear: _multiplierPerYear, jumpMultiplierPerYear: _jumpMultiplierPerYear, kink: _kink };
}

function storeTupleAddToken(source: AddToken) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token);
    builder.writeAddress(source.walletAddress);
    builder.writeNumber(source.reserveFactor);
    builder.writeNumber(source.collateralFactor);
    builder.writeNumber(source.baseRatePerYear);
    builder.writeNumber(source.multiplierPerYear);
    builder.writeNumber(source.jumpMultiplierPerYear);
    builder.writeNumber(source.kink);
    return builder.build();
}

function dictValueParserAddToken(): DictionaryValue<AddToken> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddToken(src)).endCell());
        },
        parse: (src) => {
            return loadAddToken(src.loadRef().beginParse());
        }
    }
}

export type SetCollateralFactor = {
    $$type: 'SetCollateralFactor';
    token: Address;
    collateralFactor: bigint;
}

export function storeSetCollateralFactor(src: SetCollateralFactor) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1489134615, 32);
        b_0.storeAddress(src.token);
        b_0.storeInt(src.collateralFactor, 257);
    };
}

export function loadSetCollateralFactor(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1489134615) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadAddress();
    let _collateralFactor = sc_0.loadIntBig(257);
    return { $$type: 'SetCollateralFactor' as const, token: _token, collateralFactor: _collateralFactor };
}

function loadTupleSetCollateralFactor(source: TupleReader) {
    let _token = source.readAddress();
    let _collateralFactor = source.readBigNumber();
    return { $$type: 'SetCollateralFactor' as const, token: _token, collateralFactor: _collateralFactor };
}

function storeTupleSetCollateralFactor(source: SetCollateralFactor) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token);
    builder.writeNumber(source.collateralFactor);
    return builder.build();
}

function dictValueParserSetCollateralFactor(): DictionaryValue<SetCollateralFactor> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetCollateralFactor(src)).endCell());
        },
        parse: (src) => {
            return loadSetCollateralFactor(src.loadRef().beginParse());
        }
    }
}

export type SetPendingAdmin = {
    $$type: 'SetPendingAdmin';
    pendingAdmin: Address;
}

export function storeSetPendingAdmin(src: SetPendingAdmin) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(841220655, 32);
        b_0.storeAddress(src.pendingAdmin);
    };
}

export function loadSetPendingAdmin(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 841220655) { throw Error('Invalid prefix'); }
    let _pendingAdmin = sc_0.loadAddress();
    return { $$type: 'SetPendingAdmin' as const, pendingAdmin: _pendingAdmin };
}

function loadTupleSetPendingAdmin(source: TupleReader) {
    let _pendingAdmin = source.readAddress();
    return { $$type: 'SetPendingAdmin' as const, pendingAdmin: _pendingAdmin };
}

function storeTupleSetPendingAdmin(source: SetPendingAdmin) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.pendingAdmin);
    return builder.build();
}

function dictValueParserSetPendingAdmin(): DictionaryValue<SetPendingAdmin> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetPendingAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadSetPendingAdmin(src.loadRef().beginParse());
        }
    }
}

export type SetPendingPriceAdmin = {
    $$type: 'SetPendingPriceAdmin';
    pendingPriceAdmin: Address;
}

export function storeSetPendingPriceAdmin(src: SetPendingPriceAdmin) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2150538457, 32);
        b_0.storeAddress(src.pendingPriceAdmin);
    };
}

export function loadSetPendingPriceAdmin(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2150538457) { throw Error('Invalid prefix'); }
    let _pendingPriceAdmin = sc_0.loadAddress();
    return { $$type: 'SetPendingPriceAdmin' as const, pendingPriceAdmin: _pendingPriceAdmin };
}

function loadTupleSetPendingPriceAdmin(source: TupleReader) {
    let _pendingPriceAdmin = source.readAddress();
    return { $$type: 'SetPendingPriceAdmin' as const, pendingPriceAdmin: _pendingPriceAdmin };
}

function storeTupleSetPendingPriceAdmin(source: SetPendingPriceAdmin) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.pendingPriceAdmin);
    return builder.build();
}

function dictValueParserSetPendingPriceAdmin(): DictionaryValue<SetPendingPriceAdmin> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetPendingPriceAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadSetPendingPriceAdmin(src.loadRef().beginParse());
        }
    }
}

export type SetPrice = {
    $$type: 'SetPrice';
    token: Address;
    price: bigint;
}

export function storeSetPrice(src: SetPrice) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499041869, 32);
        b_0.storeAddress(src.token);
        b_0.storeInt(src.price, 257);
    };
}

export function loadSetPrice(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499041869) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadAddress();
    let _price = sc_0.loadIntBig(257);
    return { $$type: 'SetPrice' as const, token: _token, price: _price };
}

function loadTupleSetPrice(source: TupleReader) {
    let _token = source.readAddress();
    let _price = source.readBigNumber();
    return { $$type: 'SetPrice' as const, token: _token, price: _price };
}

function storeTupleSetPrice(source: SetPrice) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token);
    builder.writeNumber(source.price);
    return builder.build();
}

function dictValueParserSetPrice(): DictionaryValue<SetPrice> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetPrice(src)).endCell());
        },
        parse: (src) => {
            return loadSetPrice(src.loadRef().beginParse());
        }
    }
}

export type SetLock = {
    $$type: 'SetLock';
    token: Address;
    lock: boolean;
}

export function storeSetLock(src: SetLock) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4057564729, 32);
        b_0.storeAddress(src.token);
        b_0.storeBit(src.lock);
    };
}

export function loadSetLock(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4057564729) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadAddress();
    let _lock = sc_0.loadBit();
    return { $$type: 'SetLock' as const, token: _token, lock: _lock };
}

function loadTupleSetLock(source: TupleReader) {
    let _token = source.readAddress();
    let _lock = source.readBoolean();
    return { $$type: 'SetLock' as const, token: _token, lock: _lock };
}

function storeTupleSetLock(source: SetLock) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token);
    builder.writeBoolean(source.lock);
    return builder.build();
}

function dictValueParserSetLock(): DictionaryValue<SetLock> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetLock(src)).endCell());
        },
        parse: (src) => {
            return loadSetLock(src.loadRef().beginParse());
        }
    }
}

export type SetLiquidationIncentive = {
    $$type: 'SetLiquidationIncentive';
    liquidationIncentive: bigint;
}

export function storeSetLiquidationIncentive(src: SetLiquidationIncentive) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1706731932, 32);
        b_0.storeInt(src.liquidationIncentive, 257);
    };
}

export function loadSetLiquidationIncentive(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1706731932) { throw Error('Invalid prefix'); }
    let _liquidationIncentive = sc_0.loadIntBig(257);
    return { $$type: 'SetLiquidationIncentive' as const, liquidationIncentive: _liquidationIncentive };
}

function loadTupleSetLiquidationIncentive(source: TupleReader) {
    let _liquidationIncentive = source.readBigNumber();
    return { $$type: 'SetLiquidationIncentive' as const, liquidationIncentive: _liquidationIncentive };
}

function storeTupleSetLiquidationIncentive(source: SetLiquidationIncentive) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.liquidationIncentive);
    return builder.build();
}

function dictValueParserSetLiquidationIncentive(): DictionaryValue<SetLiquidationIncentive> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetLiquidationIncentive(src)).endCell());
        },
        parse: (src) => {
            return loadSetLiquidationIncentive(src.loadRef().beginParse());
        }
    }
}

export type SetCloseFactor = {
    $$type: 'SetCloseFactor';
    closeFactor: bigint;
}

export function storeSetCloseFactor(src: SetCloseFactor) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3897040102, 32);
        b_0.storeInt(src.closeFactor, 257);
    };
}

export function loadSetCloseFactor(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3897040102) { throw Error('Invalid prefix'); }
    let _closeFactor = sc_0.loadIntBig(257);
    return { $$type: 'SetCloseFactor' as const, closeFactor: _closeFactor };
}

function loadTupleSetCloseFactor(source: TupleReader) {
    let _closeFactor = source.readBigNumber();
    return { $$type: 'SetCloseFactor' as const, closeFactor: _closeFactor };
}

function storeTupleSetCloseFactor(source: SetCloseFactor) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.closeFactor);
    return builder.build();
}

function dictValueParserSetCloseFactor(): DictionaryValue<SetCloseFactor> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetCloseFactor(src)).endCell());
        },
        parse: (src) => {
            return loadSetCloseFactor(src.loadRef().beginParse());
        }
    }
}

export type SetPaused = {
    $$type: 'SetPaused';
    paused: boolean;
}

export function storeSetPaused(src: SetPaused) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3408208098, 32);
        b_0.storeBit(src.paused);
    };
}

export function loadSetPaused(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3408208098) { throw Error('Invalid prefix'); }
    let _paused = sc_0.loadBit();
    return { $$type: 'SetPaused' as const, paused: _paused };
}

function loadTupleSetPaused(source: TupleReader) {
    let _paused = source.readBoolean();
    return { $$type: 'SetPaused' as const, paused: _paused };
}

function storeTupleSetPaused(source: SetPaused) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.paused);
    return builder.build();
}

function dictValueParserSetPaused(): DictionaryValue<SetPaused> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetPaused(src)).endCell());
        },
        parse: (src) => {
            return loadSetPaused(src.loadRef().beginParse());
        }
    }
}

export type AcceptAdmin = {
    $$type: 'AcceptAdmin';
    query_id: bigint;
}

export function storeAcceptAdmin(src: AcceptAdmin) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(211306820, 32);
        b_0.storeInt(src.query_id, 257);
    };
}

export function loadAcceptAdmin(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 211306820) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadIntBig(257);
    return { $$type: 'AcceptAdmin' as const, query_id: _query_id };
}

function loadTupleAcceptAdmin(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'AcceptAdmin' as const, query_id: _query_id };
}

function storeTupleAcceptAdmin(source: AcceptAdmin) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserAcceptAdmin(): DictionaryValue<AcceptAdmin> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAcceptAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadAcceptAdmin(src.loadRef().beginParse());
        }
    }
}

export type AcceptPriceAdmin = {
    $$type: 'AcceptPriceAdmin';
    query_id: bigint;
}

export function storeAcceptPriceAdmin(src: AcceptPriceAdmin) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(44600279, 32);
        b_0.storeInt(src.query_id, 257);
    };
}

export function loadAcceptPriceAdmin(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 44600279) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadIntBig(257);
    return { $$type: 'AcceptPriceAdmin' as const, query_id: _query_id };
}

function loadTupleAcceptPriceAdmin(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'AcceptPriceAdmin' as const, query_id: _query_id };
}

function storeTupleAcceptPriceAdmin(source: AcceptPriceAdmin) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserAcceptPriceAdmin(): DictionaryValue<AcceptPriceAdmin> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAcceptPriceAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadAcceptPriceAdmin(src.loadRef().beginParse());
        }
    }
}

export type ReduceReserves = {
    $$type: 'ReduceReserves';
    token: Address;
    amount: bigint;
}

export function storeReduceReserves(src: ReduceReserves) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(128682389, 32);
        b_0.storeAddress(src.token);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadReduceReserves(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 128682389) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'ReduceReserves' as const, token: _token, amount: _amount };
}

function loadTupleReduceReserves(source: TupleReader) {
    let _token = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'ReduceReserves' as const, token: _token, amount: _amount };
}

function storeTupleReduceReserves(source: ReduceReserves) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserReduceReserves(): DictionaryValue<ReduceReserves> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReduceReserves(src)).endCell());
        },
        parse: (src) => {
            return loadReduceReserves(src.loadRef().beginParse());
        }
    }
}

export type StorageFeeExcesses = {
    $$type: 'StorageFeeExcesses';
    query_id: bigint;
}

export function storeStorageFeeExcesses(src: StorageFeeExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(152944321, 32);
        b_0.storeInt(src.query_id, 257);
    };
}

export function loadStorageFeeExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 152944321) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadIntBig(257);
    return { $$type: 'StorageFeeExcesses' as const, query_id: _query_id };
}

function loadTupleStorageFeeExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'StorageFeeExcesses' as const, query_id: _query_id };
}

function storeTupleStorageFeeExcesses(source: StorageFeeExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserStorageFeeExcesses(): DictionaryValue<StorageFeeExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStorageFeeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadStorageFeeExcesses(src.loadRef().beginParse());
        }
    }
}

export type JettonTransfer = {
    $$type: 'JettonTransfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeJettonTransfer(src: JettonTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonTransfer(source: JettonTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer(src.loadRef().beginParse());
        }
    }
}

export type MarketInfo = {
    $$type: 'MarketInfo';
    price: bigint;
    supplyIndex: bigint;
    borrowIndex: bigint;
    collateralFactor: bigint;
    valid: boolean;
}

export function storeMarketInfo(src: MarketInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.price, 257);
        b_0.storeInt(src.supplyIndex, 257);
        b_0.storeInt(src.borrowIndex, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.collateralFactor, 257);
        b_1.storeBit(src.valid);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMarketInfo(slice: Slice) {
    let sc_0 = slice;
    let _price = sc_0.loadIntBig(257);
    let _supplyIndex = sc_0.loadIntBig(257);
    let _borrowIndex = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _collateralFactor = sc_1.loadIntBig(257);
    let _valid = sc_1.loadBit();
    return { $$type: 'MarketInfo' as const, price: _price, supplyIndex: _supplyIndex, borrowIndex: _borrowIndex, collateralFactor: _collateralFactor, valid: _valid };
}

function loadTupleMarketInfo(source: TupleReader) {
    let _price = source.readBigNumber();
    let _supplyIndex = source.readBigNumber();
    let _borrowIndex = source.readBigNumber();
    let _collateralFactor = source.readBigNumber();
    let _valid = source.readBoolean();
    return { $$type: 'MarketInfo' as const, price: _price, supplyIndex: _supplyIndex, borrowIndex: _borrowIndex, collateralFactor: _collateralFactor, valid: _valid };
}

function storeTupleMarketInfo(source: MarketInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.price);
    builder.writeNumber(source.supplyIndex);
    builder.writeNumber(source.borrowIndex);
    builder.writeNumber(source.collateralFactor);
    builder.writeBoolean(source.valid);
    return builder.build();
}

function dictValueParserMarketInfo(): DictionaryValue<MarketInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMarketInfo(src)).endCell());
        },
        parse: (src) => {
            return loadMarketInfo(src.loadRef().beginParse());
        }
    }
}

export type PriceInfo = {
    $$type: 'PriceInfo';
    token: Address;
    price: bigint;
}

export function storePriceInfo(src: PriceInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.token);
        b_0.storeInt(src.price, 257);
    };
}

export function loadPriceInfo(slice: Slice) {
    let sc_0 = slice;
    let _token = sc_0.loadAddress();
    let _price = sc_0.loadIntBig(257);
    return { $$type: 'PriceInfo' as const, token: _token, price: _price };
}

function loadTuplePriceInfo(source: TupleReader) {
    let _token = source.readAddress();
    let _price = source.readBigNumber();
    return { $$type: 'PriceInfo' as const, token: _token, price: _price };
}

function storeTuplePriceInfo(source: PriceInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token);
    builder.writeNumber(source.price);
    return builder.build();
}

function dictValueParserPriceInfo(): DictionaryValue<PriceInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePriceInfo(src)).endCell());
        },
        parse: (src) => {
            return loadPriceInfo(src.loadRef().beginParse());
        }
    }
}

export type InterestRate = {
    $$type: 'InterestRate';
    baseRatePerSecond: bigint;
    multiplierPerSecond: bigint;
    jumpMultiplierPerSecond: bigint;
    kink: bigint;
}

export function storeInterestRate(src: InterestRate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.baseRatePerSecond, 257);
        b_0.storeInt(src.multiplierPerSecond, 257);
        b_0.storeInt(src.jumpMultiplierPerSecond, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.kink, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadInterestRate(slice: Slice) {
    let sc_0 = slice;
    let _baseRatePerSecond = sc_0.loadIntBig(257);
    let _multiplierPerSecond = sc_0.loadIntBig(257);
    let _jumpMultiplierPerSecond = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _kink = sc_1.loadIntBig(257);
    return { $$type: 'InterestRate' as const, baseRatePerSecond: _baseRatePerSecond, multiplierPerSecond: _multiplierPerSecond, jumpMultiplierPerSecond: _jumpMultiplierPerSecond, kink: _kink };
}

function loadTupleInterestRate(source: TupleReader) {
    let _baseRatePerSecond = source.readBigNumber();
    let _multiplierPerSecond = source.readBigNumber();
    let _jumpMultiplierPerSecond = source.readBigNumber();
    let _kink = source.readBigNumber();
    return { $$type: 'InterestRate' as const, baseRatePerSecond: _baseRatePerSecond, multiplierPerSecond: _multiplierPerSecond, jumpMultiplierPerSecond: _jumpMultiplierPerSecond, kink: _kink };
}

function storeTupleInterestRate(source: InterestRate) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.baseRatePerSecond);
    builder.writeNumber(source.multiplierPerSecond);
    builder.writeNumber(source.jumpMultiplierPerSecond);
    builder.writeNumber(source.kink);
    return builder.build();
}

function dictValueParserInterestRate(): DictionaryValue<InterestRate> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInterestRate(src)).endCell());
        },
        parse: (src) => {
            return loadInterestRate(src.loadRef().beginParse());
        }
    }
}

export type SupplySnapshot = {
    $$type: 'SupplySnapshot';
    principal: bigint;
    interestIndex: bigint;
}

export function storeSupplySnapshot(src: SupplySnapshot) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.principal, 257);
        b_0.storeInt(src.interestIndex, 257);
    };
}

export function loadSupplySnapshot(slice: Slice) {
    let sc_0 = slice;
    let _principal = sc_0.loadIntBig(257);
    let _interestIndex = sc_0.loadIntBig(257);
    return { $$type: 'SupplySnapshot' as const, principal: _principal, interestIndex: _interestIndex };
}

function loadTupleSupplySnapshot(source: TupleReader) {
    let _principal = source.readBigNumber();
    let _interestIndex = source.readBigNumber();
    return { $$type: 'SupplySnapshot' as const, principal: _principal, interestIndex: _interestIndex };
}

function storeTupleSupplySnapshot(source: SupplySnapshot) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.principal);
    builder.writeNumber(source.interestIndex);
    return builder.build();
}

function dictValueParserSupplySnapshot(): DictionaryValue<SupplySnapshot> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSupplySnapshot(src)).endCell());
        },
        parse: (src) => {
            return loadSupplySnapshot(src.loadRef().beginParse());
        }
    }
}

export type BorrowSnapshot = {
    $$type: 'BorrowSnapshot';
    principal: bigint;
    interestIndex: bigint;
}

export function storeBorrowSnapshot(src: BorrowSnapshot) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.principal, 257);
        b_0.storeInt(src.interestIndex, 257);
    };
}

export function loadBorrowSnapshot(slice: Slice) {
    let sc_0 = slice;
    let _principal = sc_0.loadIntBig(257);
    let _interestIndex = sc_0.loadIntBig(257);
    return { $$type: 'BorrowSnapshot' as const, principal: _principal, interestIndex: _interestIndex };
}

function loadTupleBorrowSnapshot(source: TupleReader) {
    let _principal = source.readBigNumber();
    let _interestIndex = source.readBigNumber();
    return { $$type: 'BorrowSnapshot' as const, principal: _principal, interestIndex: _interestIndex };
}

function storeTupleBorrowSnapshot(source: BorrowSnapshot) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.principal);
    builder.writeNumber(source.interestIndex);
    return builder.build();
}

function dictValueParserBorrowSnapshot(): DictionaryValue<BorrowSnapshot> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBorrowSnapshot(src)).endCell());
        },
        parse: (src) => {
            return loadBorrowSnapshot(src.loadRef().beginParse());
        }
    }
}

export type Market = {
    $$type: 'Market';
    totalSupply: bigint;
    totalBorrows: bigint;
    supplyIndex: bigint;
    borrowIndex: bigint;
    totalReserves: bigint;
    reserveFactor: bigint;
    timestamp: bigint;
    collateralFactor: bigint;
    valid: boolean;
}

export function storeMarket(src: Market) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.totalSupply, 257);
        b_0.storeInt(src.totalBorrows, 257);
        b_0.storeInt(src.supplyIndex, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.borrowIndex, 257);
        b_1.storeInt(src.totalReserves, 257);
        b_1.storeInt(src.reserveFactor, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.timestamp, 257);
        b_2.storeInt(src.collateralFactor, 257);
        b_2.storeBit(src.valid);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMarket(slice: Slice) {
    let sc_0 = slice;
    let _totalSupply = sc_0.loadIntBig(257);
    let _totalBorrows = sc_0.loadIntBig(257);
    let _supplyIndex = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _borrowIndex = sc_1.loadIntBig(257);
    let _totalReserves = sc_1.loadIntBig(257);
    let _reserveFactor = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _timestamp = sc_2.loadIntBig(257);
    let _collateralFactor = sc_2.loadIntBig(257);
    let _valid = sc_2.loadBit();
    return { $$type: 'Market' as const, totalSupply: _totalSupply, totalBorrows: _totalBorrows, supplyIndex: _supplyIndex, borrowIndex: _borrowIndex, totalReserves: _totalReserves, reserveFactor: _reserveFactor, timestamp: _timestamp, collateralFactor: _collateralFactor, valid: _valid };
}

function loadTupleMarket(source: TupleReader) {
    let _totalSupply = source.readBigNumber();
    let _totalBorrows = source.readBigNumber();
    let _supplyIndex = source.readBigNumber();
    let _borrowIndex = source.readBigNumber();
    let _totalReserves = source.readBigNumber();
    let _reserveFactor = source.readBigNumber();
    let _timestamp = source.readBigNumber();
    let _collateralFactor = source.readBigNumber();
    let _valid = source.readBoolean();
    return { $$type: 'Market' as const, totalSupply: _totalSupply, totalBorrows: _totalBorrows, supplyIndex: _supplyIndex, borrowIndex: _borrowIndex, totalReserves: _totalReserves, reserveFactor: _reserveFactor, timestamp: _timestamp, collateralFactor: _collateralFactor, valid: _valid };
}

function storeTupleMarket(source: Market) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeNumber(source.totalBorrows);
    builder.writeNumber(source.supplyIndex);
    builder.writeNumber(source.borrowIndex);
    builder.writeNumber(source.totalReserves);
    builder.writeNumber(source.reserveFactor);
    builder.writeNumber(source.timestamp);
    builder.writeNumber(source.collateralFactor);
    builder.writeBoolean(source.valid);
    return builder.build();
}

function dictValueParserMarket(): DictionaryValue<Market> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMarket(src)).endCell());
        },
        parse: (src) => {
            return loadMarket(src.loadRef().beginParse());
        }
    }
}

export type InterestIndexSnapshot = {
    $$type: 'InterestIndexSnapshot';
    supplyIndex: bigint;
    borrowIndex: bigint;
}

export function storeInterestIndexSnapshot(src: InterestIndexSnapshot) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.supplyIndex, 257);
        b_0.storeInt(src.borrowIndex, 257);
    };
}

export function loadInterestIndexSnapshot(slice: Slice) {
    let sc_0 = slice;
    let _supplyIndex = sc_0.loadIntBig(257);
    let _borrowIndex = sc_0.loadIntBig(257);
    return { $$type: 'InterestIndexSnapshot' as const, supplyIndex: _supplyIndex, borrowIndex: _borrowIndex };
}

function loadTupleInterestIndexSnapshot(source: TupleReader) {
    let _supplyIndex = source.readBigNumber();
    let _borrowIndex = source.readBigNumber();
    return { $$type: 'InterestIndexSnapshot' as const, supplyIndex: _supplyIndex, borrowIndex: _borrowIndex };
}

function storeTupleInterestIndexSnapshot(source: InterestIndexSnapshot) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.supplyIndex);
    builder.writeNumber(source.borrowIndex);
    return builder.build();
}

function dictValueParserInterestIndexSnapshot(): DictionaryValue<InterestIndexSnapshot> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInterestIndexSnapshot(src)).endCell());
        },
        parse: (src) => {
            return loadInterestIndexSnapshot(src.loadRef().beginParse());
        }
    }
}

export type Liquidity = {
    $$type: 'Liquidity';
    supplySum: bigint;
    borrowSum: bigint;
}

export function storeLiquidity(src: Liquidity) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.supplySum, 257);
        b_0.storeInt(src.borrowSum, 257);
    };
}

export function loadLiquidity(slice: Slice) {
    let sc_0 = slice;
    let _supplySum = sc_0.loadIntBig(257);
    let _borrowSum = sc_0.loadIntBig(257);
    return { $$type: 'Liquidity' as const, supplySum: _supplySum, borrowSum: _borrowSum };
}

function loadTupleLiquidity(source: TupleReader) {
    let _supplySum = source.readBigNumber();
    let _borrowSum = source.readBigNumber();
    return { $$type: 'Liquidity' as const, supplySum: _supplySum, borrowSum: _borrowSum };
}

function storeTupleLiquidity(source: Liquidity) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.supplySum);
    builder.writeNumber(source.borrowSum);
    return builder.build();
}

function dictValueParserLiquidity(): DictionaryValue<Liquidity> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidity(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidity(src.loadRef().beginParse());
        }
    }
}

 type ArkMarket_init_args = {
    $$type: 'ArkMarket_init_args';
}

function initArkMarket_init_args(src: ArkMarket_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function ArkMarket_init() {
    const __code = Cell.fromBase64('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gQELERSCEDuaygCoggnhM4CpBBETghA7msoAqIIJ4TOAqQQREoIQO5rKAKiCCeEzgKkEERGCEDuaygCoPgMREgMCERECAREQAQ2XAfjIVTBQNIEBAc8AgQEBzwCBAQHPAAHIgQEBzwDJAczJAhETAgEREAFWFAEgbpUwWfRZMJRBM/QT4ieBAQtwIIIwDeC2s6dkAABTAREQEREREA8REQ8QfhB9EHwQexB6EHkQeAYRGAYFERUFBBEUBAMREwMCERICARERAREXmAL+ghA7msoAqA8REA8OERAODREQDQwREAwLERALChEQCgkREAkREAgHBlVA+CMRF4IQO5rKAKg9BxEUBwYREwYFERIFBBERBAMRFwMCERACAREWAQxwyFWA2zzJAxERAxAuARESASBulTBZ9FkwlEEz9BPiEF8QThA9ULwQShkQWLqZAAgQR0YGAuYPEREPXj0MERAMCxERCwoREAoJEREJCBEQCAcREQcGERAGBRERBQQREAQDEREDAhEQAgEREQEREPhCUlDHBfLn0iyBAQtWE1n0C2+hkjBt3yBukjBtjofQ2zxsGW8J4m6z8uPqLIEBC1YTWfQLb6GSMG3f6Z0C8g8REQ9ePQwREAwLERELChEQCgkREQkIERAIBxERBwYREAYFEREFBBEQBAMREQMCERACARERAREQ+EJSQMcF8ufTVhGBAQsuAln0C2+hkjBt3yBukjBtjofQ2zxsGW8J4m6z8uPqVhDCAPLj9ikPERAPDhEQDg0REA3pnwTm4CCCEDIkAi+64wIgghCALpzZuuMCIIIQyyUg4rqOQjDTHwGCEMslIOK68uCB0gABMQ8REA8OERAODREQDQwREAwLERALChEQCgkREAkREAgHBlVA+EJSUMcF8ufSMFUOf+AgghAMmElEuuMCIIIKqIvXuqChoqMC/CBukjBtjofQ2zxsGW8J4iBu8tCAbykxERARFxEQDxEWDw4RFQ4NERQNDBETDAsREgsKEREKCREXCQgRFggHERUHBhEUBgUREwUEERIEAxERAwIRFwIBERYBERiCEDuaygCoBxEVBwYRFAYFERMFBBESBAMREQMCERcCAREWAemeAWaBAQsRGchVgNs8yRA2AhERAgEREgEgbpUwWfRZMJRBM/QT4hBvEF4QTUusEDleJUZQExS6AcoMERAMCxEQCwoR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');
    const __system = Cell.fromBase64('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RDMBDACNAfhYVhUBbDH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMPoAMXHXIfoAMfoAMKcDqwCqAYIQC+vCAKCCEATEtACgghAL68IAoAEREwG7k/LD894PERAPDhEQDg0REA0MERAMCxEQCwoREAoJERAJERAIBwZVQFYWAI4B/hyBAQsBf3EhbpVbWfRZMJjIAc8AQTP0QeILERX6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQw0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxDxEQDw4REA4NERANDBEQDAsREAsKERAKCREQCQgREAgAjwFABxEQBwYREAYFERAFBBEQBAMREAMCERACAREQAREWVhYAkAHi+EP4KFgC0PQEMG0BgXyqAYAQ9A9vofLghwGBfKoiAoAQ9BfIAcj0AMkBzHABygBAA1kg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyVwAkQT6cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgvgQELVhVZ9AtvoZIwbd8gbpIwbY6H0Ns8bBlvCeIgbpIwf5ogbvLQgG8pbIGz4pF/4w6WERlWFccF4w0BPgCSAJQAlQGQVhNWG8cFs44VERICERECAREQAU4fS9xIqUV2UENw4w0REBETERAPERIPDhERDg0REA0QzxC+EK0QnBCLEHoQaRBYEEcQNkVAAJMAxA8REg8OEREODREQDQwREgwLERELChEQCgkREgkIEREIBxEQBwYREgYFEREFBBEQBAMREgMCERECAREQARESVhOBAQstAnFBM/QKb6GUAdcAMJJbbeIgbrOVIG7y0ICSMHDiAAZXGX8D8I6jW1cQVxBXEFcTVxMKERIKCRERCQgREAhVd0cGUSCAQts82zHgVxVXFVcVL1YXxwWz4wBwgEJUeHYPERMPDhESDg0REQ0MERAMCxETCwoREgoJEREJCBEQCAcREwcGERIGBRERBQQREAQDERMDAhESAgEREQERGQEMAJYAlwL4KYEBC1YRgQEBQTP0Cm+hlAHXADCSW23iIG6zlSBu8tCAkjBw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3hDNELwQqxCaEIkQeBBnEFYQRRA0QwB/AOww0x8BghCALpzZuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxDxEQDw4REA4NERANDBEQDAsREAsKERAKCREQCREQCAcGVUD4QlJAxwXy59MxEO8Q3hDNELwQqxCaEIkQeBBnEFYQRRA0QTB/AKQw0x8BghAMmElEuvLggYEBAdcAATEwNPhCEscF8ufUcCDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiPhCUCR/BPCOTzDTHwGCCqiL17ry4IGBAQHXAAExMDP4QscF8ufVcCDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiPhCA3/gIIIQQZrv8LrjAiCCEGW6qZy64wIgghDoSBzmuuMCIIIQzpFeGLoA8wD3APgA+QGiMNMfAYIQQZrv8Lry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQI2wV2zx/APQC8A8RFA8OERMODRESDQwREQwLERALChEUCgkREwkIERIIBxERBwYREAYFERQFBBETBAMREgMCERECAREQAREU+EJSUMcF8ufSVhOBAQsuAln0C2+hkjBt3yBukjBtjofQ2zxsGW8J4m6z8uPqLQ8REA8OERAODREQDQE+APUBwgwREAwLERALChEQCgkREAkREAgHBlVAgQELERSCEDuaygCoggnhM4CpBBETghA7msoAqIIJ4TOAqQQREoIQO5rKAKiCCeEzgKkEERaCEDuaygCoPgMREgMCERECAREVAQ0A9gCayFUwUDSBAQHPAIEBAc8AgQEBzwAByIEBAc8AyQHMyRA9AhEQAgEREQEgbpUwWfRZMJRBM/QT4hCfEI4NEGwQWxBKEDlIcBBGRRUEUDMAoDDTHwGCEGW6qZy68uCBgQEB1wABMQ8REA8OERAODREQDQwREAwLERALChEQCgkREAkREAgHBlVA+EJSUMcF8ufSDxEQD1UOghA7msoAqDZ/ANQw0x8BghDoSBzmuvLggYEBAdcAATEPERAPDhEQDg0REA0MERAMCxEQCwoREAoJERAJERAIBwZVQPhCUlDHBfLn0lYQggr68IC5kX+ZVhCCEDWk6QC84pPyw+/eDxEQD1UOghA7msoAqDd/A/6OtjDTHwGCEM6RXhi68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAFlsEts8f+AgghDx2YY5uo6zMNMfAYIQ8dmGObry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIAWWwS4CCCEAeriZW6APoA/AD9AugPEREPXj0MERAMCxERCwoREAoJEREJCBEQCAcREQcGERAGBRERBQQREAQDEREDAhEQAgEREQEREPhCUlDHBfLn0lYRgQELLgJZ9AtvoZIwbd8gbpIwbY6H0Ns8bBlvCeJus/Lj6iyBAQtWE1n0C2+hkjBt3wE+APsCoiBukjBtjofQ2zxsGW8J4iBu8tCAbykwgQELERnIVYDbPMkQPQIREQIBERIBIG6VMFn0WTCUQTP0E+IQ3xDOEL0MEJsQihB5EGgQVxBGEDVEAwE+AQgA8g8REQ9ePQwREAwLERELChEQCgkREQkIERAIBxERBwYREAYFEREFBBEQBAMREQMCERACARERAREQ+EJSUMcF8ufSECuBAQsCARESARERcSFulVtZ9FkwmMgBzwBBM/RB4hDfEM4QvRCsCxCKEHkQaBBXEEYQNUQwEn8C3o65MNMfAYIQB6uJlbry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAWWwS2zx/4IIQlGqYtrqOp9MfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AwcAD+AQ4C6A8REQ9ePQwREAwLERELChEQCgkREQkIERAIBxERBwYREAYFEREFBBEQBAMREQMCERACARERAREQ+EJSUMcF8ufSLIEBC1YTWfQLb6GSMG3fIG6SMG2Oh9DbPGwZbwnibrPy4+pWEMIA8uPsKoEBC1YTgQEBAT4A/wHeQTP0Cm+hlAHXADCSW23iIG6zlSBu8tCAkjBw4g8REA8OERAODREQDQwREAwLERALChEQCgkREAkREAgHBlVAVhGCEDuaygCoDxEQDw4REA4NERANDBEQDAsREAsKERAKCREQCREQCAcGVUBWE1YSAQAE4C6BAQsjWfQLb6GSMG3fIG6SMG2Oh9DbPGwZbwniIG7y0IBvKfgjUwO6kl8M4w4REVYQuZPyw/LeK4EBC1YUWfQLb6GSMG3fIG6SMG2Oh9DbPGwZbwniIG7y0IBvKSRWGbmT8sP33hEYFKEDgQELERgBPgEBAT4BBwH8VhmBAQstWfQLb6GSMG3fIG6SMG2OINCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXADAUQzBsFG8E4iBu8tCAbyQRExEfERMREhEeERIREREdEREREBEcERAPERsPDhEaDg0RGQ0MERgMCxEXCwoRFgoJERUJCBEUCAcRHwcGER4GAQIBJgURHQUEERwEVhoEVhkEVhdBRAMBAwPwERIRFhESERERFRERERARFBEQDxETDw4RFg4NERUNDBEUDAsREwsKERYKCREVCQgRFAgHERMHBhEWBgURFQUEERQEAxETAwIRFgIBERUBERQhwACTXwNwjhIhgjAN4Lazp2QAAKhaoFihqQTiIFYTu+MPLoEBC1YaATUBNgEEAvxZ9AtvoZIwbd8gbpIwbY4g0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAMBRDMGwUbwTiIG7y0IBvJAQRGwRWGQRWFwRWF0FEA9s8VhkBER2hERdWF6ggVhaogjAN4Lazp2QAAKkEIBEXoFYSAREXqIIwDeC2s6dkAACpBAERE6ABMwEFAv4RElYTqIIwDeC2s6dkAACpBAERE6ABERsBERaoIFYVqIIwDeC2s6dkAACpBAERFaARFFYSqIIwDeC2s6dkAACpBAEREqAHERMHBhESBgUEERQEED8QLgERFgERGIEBCxEYyFWA2zzJAhEQAh4gbpUwWfRZMJRBM/QT4hA/TtwbAQgBBgAIR6NQBgPayFWA2zzJECwBERABVhMBIG6VMFn0WTCUQTP0E+KNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARWEscFjqRXEfhCDRERDQwREAwQvxDeEJ0QjBB7EGoQWRBIEDdGUEQDAnPjDgEIAQkBCwB2UImBAQHPABaBAQHPABSBAQHPAALIgQEBzwCBAQHPABKBAQHPAALIgQEBzwATgQEBzwATygDJWMzJAcwC2HCIFEMwbW3IcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAEKARAAOAAAAABBcmsgTWFya2V0IFNlbmQgQmFjayBUT04BioEBCy0CERNZ9ApvoZIwbd8gbvLQgPhC+EIPERMPDhESDg0REQ0PERAPEL8QrhCdEIwQexBqEFkQSF4zEDUQNBAjgELbPAEMAjJwIG0hyMnQEDYQWBBHyFVg2zzJEn9VMG1tAQ0BDwDIghAPin6lUAjLHxbLP1AE+gJYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFiFus5V/AcoAzJRwMsoA4gH6AgHPFgE2bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAjAQ8ByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAARAAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwB1BEQH/QAHfQAC8j0ABr0ABj0AAbI9AAV9AAT9ADLH4EBAc8AgQEBzwBYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAQBEgCUINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYUygDJWMzJAczJAcwCASABFAEnAgEgARUBHQIBIAEWARoCAUgBFwEZAkmtDbeSbZ4HiIsHhwiKhwaIigaGCImGBYiJBYUIiIUEiIgEqrRAAU0BGALsERIRFhESERERFRERERARFBEQDxETDw4RFg4NERUNDBEUDAsREwsKERYKCREVCQgRFAgHERMHBhEWBgURFQUEERQEAxETAwIRFgIBERUBERQhwACTXwNwjhIhgjAN4Lazp2QAAKhaoFihqQTiIFYTu+MPVxBfDwE1ATYBE66abZ4Qq4gvh8ABTQIBIAEbARwBw7DxiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPA8REA9VDiyBAQsicUEz9ApvoZQB1wAwkltt4m6zjhqBAQstAnFBM/QKb6GUAdcAMJJbbeIgbvLQgJIwcOJXEF8PgAU0By7P8ts8VH/tVH/tVH/tVH/tVH/tLw8RHw8OER4ODREdDQwRHAwLERsLChEaCgkRGQkIERgIBxEXB1YWBwYRFgYFERUFBBEUBAMREwMCERICARERAREXghA7msoAqQRXEF8PVxBfD4AFNAgEgAR4BIwIBIAEfASAC3bAViDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPA8REA9VDoEBCy4CWfQLb6GSMG3fIG6SMG2Oh9DbPGwZbwnicFMBbrOOGlsgIG7y0IBvKRBoXwgBIG7y0IBvKRBYXwgBkTLiAVcQVxBfDoAFNAT4CASABIQEiAROswm2eECuIL4fAAU0BmazbkGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRG2eB4iIB6qHQICFloE4oJn6BTfQygDrgBhJLbbxEDdZypA3eWhASRg4cSuIL4fAAU0CWbYKRBrpMCAhd15cEQQa4WFEECCf915aETBhN15cERtngeIiAeqh22eNky2PMAFNASQD9g8REA8OERAODREQDQwREAwLERALChEQCgkREAkREAgHBlVAVhCBAQsuAln0C2+hkjBt3yBukjBtjofQ2zxsGW8J4m6z8uPqgQELLQIREln0C2+hkjBt3yBukjBtjofQ2zxsGW8J4iBu8tCAbylWF1YXVhdWF1YXVhdWFwE+AT4BJQH8VhdWF1YXVhdWF1YXVhdWF1YnERARJxEQDxEmDw4RJQ4NESQNDBEjDAsRIgsKESEKCREgCQgRHwgHER4HBhEdBgURHAUEERsEAxEaAwIRGQIBESgBERiCEDuaygCpBBEXghA7msoAqQQRFoIQO5rKAKkEERWCEDuaygCpBBEUASYA0oIQO5rKAKkEEROCEDuaygCpBBERghA7msoAqQRXEF8PEHgQZxBWEEVQAwQRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmwIBIAEoAUACASABKQExAgEgASoBLQJZsF7INdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8DxEQD1UO2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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initArkMarket_init_args({ $$type: 'ArkMarket_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const ArkMarket_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
}

const ArkMarket_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Withdraw","header":1418908493,"fields":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Borrow","header":2523322984,"fields":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"TokenInInfo","header":1482701067,"fields":[{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SetInterestRate","header":1100673008,"fields":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"baseRatePerYear","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"multiplierPerYear","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"jumpMultiplierPerYear","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"kink","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"TokenValidityToggle","header":3465633304,"fields":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"valid","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"LiquidateTonDebt","header":1408150853,"fields":[{"name":"borrower","type":{"kind":"simple","type":"address","optional":false}},{"name":"collateral","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WithdrawInternal","header":1482070737,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenLength","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"marketInfo","type":{"kind":"dict","key":"address","value":"MarketInfo","valueFormat":"ref"}}]},
    {"name":"WithdrawCorrection","header":1972229350,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"BorrowInternal","header":743785013,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenLength","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"marketInfo","type":{"kind":"dict","key":"address","value":"MarketInfo","valueFormat":"ref"}}]},
    {"name":"SupplyInternal","header":284244079,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"supplyIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RepayInternal","header":2174710258,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"borrowIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RepayTON","header":4249146135,"fields":[{"name":"query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RepayNotification","header":261601112,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"repayAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"leftAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LiquidateInternal","header":4115848006,"fields":[{"name":"liquidator","type":{"kind":"simple","type":"address","optional":false}},{"name":"repayToken","type":{"kind":"simple","type":"address","optional":false}},{"name":"collateral","type":{"kind":"simple","type":"address","optional":false}},{"name":"repayAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenLength","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"closeFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationIncentive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marketInfo","type":{"kind":"dict","key":"address","value":"MarketInfo","valueFormat":"ref"}}]},
    {"name":"LiquidateNotification","header":895529019,"fields":[{"name":"liquidator","type":{"kind":"simple","type":"address","optional":false}},{"name":"repayToken","type":{"kind":"simple","type":"address","optional":false}},{"name":"collateral","type":{"kind":"simple","type":"address","optional":false}},{"name":"repayAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"seizeAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"borrower","type":{"kind":"simple","type":"address","optional":false}},{"name":"success","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"LiquidatorLedgerInternal","header":3240150159,"fields":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"supplyIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"seizeAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"BorrowNotification","header":61810990,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"success","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"WithdrawNotification","header":718796426,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"success","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"SupplyNotification","header":3869345089,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AddToken","header":600811363,"fields":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"walletAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserveFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collateralFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"baseRatePerYear","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"multiplierPerYear","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"jumpMultiplierPerYear","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"kink","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SetCollateralFactor","header":1489134615,"fields":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"collateralFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SetPendingAdmin","header":841220655,"fields":[{"name":"pendingAdmin","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetPendingPriceAdmin","header":2150538457,"fields":[{"name":"pendingPriceAdmin","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetPrice","header":1499041869,"fields":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SetLock","header":4057564729,"fields":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"lock","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"SetLiquidationIncentive","header":1706731932,"fields":[{"name":"liquidationIncentive","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SetCloseFactor","header":3897040102,"fields":[{"name":"closeFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SetPaused","header":3408208098,"fields":[{"name":"paused","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"AcceptAdmin","header":211306820,"fields":[{"name":"query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AcceptPriceAdmin","header":44600279,"fields":[{"name":"query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ReduceReserves","header":128682389,"fields":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StorageFeeExcesses","header":152944321,"fields":[{"name":"query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"MarketInfo","header":null,"fields":[{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"supplyIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"borrowIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collateralFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"valid","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"PriceInfo","header":null,"fields":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"InterestRate","header":null,"fields":[{"name":"baseRatePerSecond","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"multiplierPerSecond","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"jumpMultiplierPerSecond","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"kink","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SupplySnapshot","header":null,"fields":[{"name":"principal","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"interestIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"BorrowSnapshot","header":null,"fields":[{"name":"principal","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"interestIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Market","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"totalBorrows","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"supplyIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"borrowIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"totalReserves","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserveFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"timestamp","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collateralFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"valid","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"InterestIndexSnapshot","header":null,"fields":[{"name":"supplyIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"borrowIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Liquidity","header":null,"fields":[{"name":"supplySum","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"borrowSum","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const ArkMarket_getters: ABIGetter[] = [
    {"name":"locked","arguments":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"admin","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"priceAdmin","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"pendingAdmin","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"pendingPriceAdmin","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"paused","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"marketInfo","arguments":[],"returnType":{"kind":"dict","key":"address","value":"MarketInfo","valueFormat":"ref"}},
    {"name":"tokenInfo","arguments":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"Market","optional":false}},
    {"name":"ip","arguments":[{"name":"number","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"dp","arguments":[{"name":"number","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"borrowRate","arguments":[{"name":"cash","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"borrows","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserves","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"interestRate","type":{"kind":"simple","type":"InterestRate","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"supplyRate","arguments":[{"name":"cash","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"borrows","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserves","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserveFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"interestRate","type":{"kind":"simple","type":"InterestRate","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"ledgerState","arguments":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"tokenPrice","arguments":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"closeFactor","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"tokenLocked","arguments":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"liquidationIncentive","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"interestIndex","arguments":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"InterestIndexSnapshot","optional":false}},
    {"name":"forTest1","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const ArkMarket_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RepayTON"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LiquidateTonDebt"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Borrow"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"BorrowNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RepayNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LiquidateNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AddToken"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetCollateralFactor"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetPrice"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetPendingAdmin"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetPendingPriceAdmin"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetPaused"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AcceptAdmin"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AcceptPriceAdmin"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetInterestRate"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetLiquidationIncentive"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetCloseFactor"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenValidityToggle"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetLock"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ReduceReserves"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class ArkMarket implements Contract {
    
    static async init() {
        return await ArkMarket_init();
    }
    
    static async fromInit() {
        const init = await ArkMarket_init();
        const address = contractAddress(0, init);
        return new ArkMarket(address, init);
    }
    
    static fromAddress(address: Address) {
        return new ArkMarket(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  ArkMarket_types,
        getters: ArkMarket_getters,
        receivers: ArkMarket_receivers,
        errors: ArkMarket_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | RepayTON | LiquidateTonDebt | TokenNotification | Borrow | Withdraw | BorrowNotification | WithdrawNotification | RepayNotification | LiquidateNotification | AddToken | SetCollateralFactor | SetPrice | SetPendingAdmin | SetPendingPriceAdmin | SetPaused | AcceptAdmin | AcceptPriceAdmin | SetInterestRate | SetLiquidationIncentive | SetCloseFactor | TokenValidityToggle | SetLock | ReduceReserves | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RepayTON') {
            body = beginCell().store(storeRepayTON(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LiquidateTonDebt') {
            body = beginCell().store(storeLiquidateTonDebt(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenNotification') {
            body = beginCell().store(storeTokenNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Borrow') {
            body = beginCell().store(storeBorrow(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BorrowNotification') {
            body = beginCell().store(storeBorrowNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawNotification') {
            body = beginCell().store(storeWithdrawNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RepayNotification') {
            body = beginCell().store(storeRepayNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LiquidateNotification') {
            body = beginCell().store(storeLiquidateNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddToken') {
            body = beginCell().store(storeAddToken(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetCollateralFactor') {
            body = beginCell().store(storeSetCollateralFactor(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetPrice') {
            body = beginCell().store(storeSetPrice(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetPendingAdmin') {
            body = beginCell().store(storeSetPendingAdmin(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetPendingPriceAdmin') {
            body = beginCell().store(storeSetPendingPriceAdmin(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetPaused') {
            body = beginCell().store(storeSetPaused(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AcceptAdmin') {
            body = beginCell().store(storeAcceptAdmin(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AcceptPriceAdmin') {
            body = beginCell().store(storeAcceptPriceAdmin(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetInterestRate') {
            body = beginCell().store(storeSetInterestRate(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetLiquidationIncentive') {
            body = beginCell().store(storeSetLiquidationIncentive(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetCloseFactor') {
            body = beginCell().store(storeSetCloseFactor(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenValidityToggle') {
            body = beginCell().store(storeTokenValidityToggle(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetLock') {
            body = beginCell().store(storeSetLock(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ReduceReserves') {
            body = beginCell().store(storeReduceReserves(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getLocked(provider: ContractProvider, token: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(token);
        let source = (await provider.get('locked', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getAdmin(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('admin', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getPriceAdmin(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('priceAdmin', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getPendingAdmin(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('pendingAdmin', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getPendingPriceAdmin(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('pendingPriceAdmin', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getPaused(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('paused', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getMarketInfo(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('marketInfo', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserMarketInfo(), source.readCellOpt());
        return result;
    }
    
    async getTokenInfo(provider: ContractProvider, token: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(token);
        let source = (await provider.get('tokenInfo', builder.build())).stack;
        const result = loadTupleMarket(source);
        return result;
    }
    
    async getIp(provider: ContractProvider, number: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(number);
        let source = (await provider.get('ip', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getDp(provider: ContractProvider, number: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(number);
        let source = (await provider.get('dp', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getBorrowRate(provider: ContractProvider, cash: bigint, borrows: bigint, reserves: bigint, interestRate: InterestRate) {
        let builder = new TupleBuilder();
        builder.writeNumber(cash);
        builder.writeNumber(borrows);
        builder.writeNumber(reserves);
        builder.writeTuple(storeTupleInterestRate(interestRate));
        let source = (await provider.get('borrowRate', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getSupplyRate(provider: ContractProvider, cash: bigint, borrows: bigint, reserves: bigint, reserveFactor: bigint, interestRate: InterestRate) {
        let builder = new TupleBuilder();
        builder.writeNumber(cash);
        builder.writeNumber(borrows);
        builder.writeNumber(reserves);
        builder.writeNumber(reserveFactor);
        builder.writeTuple(storeTupleInterestRate(interestRate));
        let source = (await provider.get('supplyRate', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getLedgerState(provider: ContractProvider, owner: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner);
        let source = (await provider.get('ledgerState', builder.build())).stack;
        const result = loadTupleStateInit(source);
        return result;
    }
    
    async getTokenPrice(provider: ContractProvider, token: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(token);
        let source = (await provider.get('tokenPrice', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getCloseFactor(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('closeFactor', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getTokenLocked(provider: ContractProvider, token: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(token);
        let source = (await provider.get('tokenLocked', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getLiquidationIncentive(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('liquidationIncentive', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getInterestIndex(provider: ContractProvider, token: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(token);
        let source = (await provider.get('interestIndex', builder.build())).stack;
        const result = loadTupleInterestIndexSnapshot(source);
        return result;
    }
    
    async getForTest1(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('forTest1', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}