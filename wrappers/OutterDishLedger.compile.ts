import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/outter_dish_ledger.tact',
    options: {
        debug: true,
    },
};
