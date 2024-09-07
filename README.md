# OutterDishVault

- The `OutterDishVault` is the main contract, and the owner must first use the `AddPool` function to whitelist jetton, allowing users to deposit it.
- Users deposit jetton by transferring them to the `OutterDishVault`.
- To withdraw jetton, users must interact with the `OutterDishLedger` contract.

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

### Build 

`npx blueprint build` or `yarn blueprint build` or
`npm run build2`

### Test

`npx blueprint test` or `yarn blueprint test` or 
`npx blueprint test OutterDishVault`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

### Add a new contract

`npx blueprint create ContractName` or `yarn blueprint create ContractName`
