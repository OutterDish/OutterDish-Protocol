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

 type Ledger_init_args = {
    $$type: 'Ledger_init_args';
    market: Address;
    account: Address;
}

function initLedger_init_args(src: Ledger_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.market);
        b_0.storeAddress(src.account);
    };
}

async function Ledger_init(market: Address, account: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initLedger_init_args({ $$type: 'Ledger_init_args', market, account })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Ledger_errors: { [key: number]: { message: string } } = {
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

const Ledger_types: ABIType[] = [
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

const Ledger_getters: ABIGetter[] = [
    {"name":"accountSupplys","arguments":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"accountBorrows","arguments":[{"name":"token","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"supplyLength","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"borrowLength","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getLiquidity","arguments":[{"name":"marketInfo","type":{"kind":"dict","key":"address","value":"MarketInfo","valueFormat":"ref"}}],"returnType":{"kind":"simple","type":"Liquidity","optional":false}},
    {"name":"forTest1","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const Ledger_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"SupplyInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RepayInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"BorrowInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawCorrection"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LiquidateInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LiquidatorLedgerInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"StorageFeeExcesses"}},
]

export class Ledger implements Contract {
    
    static async init(market: Address, account: Address) {
        return await Ledger_init(market, account);
    }
    
    static async fromInit(market: Address, account: Address) {
        const init = await Ledger_init(market, account);
        const address = contractAddress(0, init);
        return new Ledger(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Ledger(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Ledger_types,
        getters: Ledger_getters,
        receivers: Ledger_receivers,
        errors: Ledger_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SupplyInternal | RepayInternal | BorrowInternal | WithdrawInternal | WithdrawCorrection | LiquidateInternal | LiquidatorLedgerInternal | StorageFeeExcesses) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SupplyInternal') {
            body = beginCell().store(storeSupplyInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RepayInternal') {
            body = beginCell().store(storeRepayInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BorrowInternal') {
            body = beginCell().store(storeBorrowInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawInternal') {
            body = beginCell().store(storeWithdrawInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawCorrection') {
            body = beginCell().store(storeWithdrawCorrection(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LiquidateInternal') {
            body = beginCell().store(storeLiquidateInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LiquidatorLedgerInternal') {
            body = beginCell().store(storeLiquidatorLedgerInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'StorageFeeExcesses') {
            body = beginCell().store(storeStorageFeeExcesses(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getAccountSupplys(provider: ContractProvider, token: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(token);
        let source = (await provider.get('accountSupplys', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getAccountBorrows(provider: ContractProvider, token: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(token);
        let source = (await provider.get('accountBorrows', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getSupplyLength(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('supplyLength', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getBorrowLength(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('borrowLength', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetLiquidity(provider: ContractProvider, marketInfo: Dictionary<Address, MarketInfo>) {
        let builder = new TupleBuilder();
        builder.writeCell(marketInfo.size > 0 ? beginCell().storeDictDirect(marketInfo, Dictionary.Keys.Address(), dictValueParserMarketInfo()).endCell() : null);
        let source = (await provider.get('getLiquidity', builder.build())).stack;
        const result = loadTupleLiquidity(source);
        return result;
    }
    
    async getForTest1(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('forTest1', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}