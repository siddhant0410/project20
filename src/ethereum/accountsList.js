import ethersProvider from '../ethereum/ether';

// eslint-disable-next-line no-undef
export let accountsList = ethersProvider.listAccounts();

// var secondAccountList = [];
// secondAccountList = ethersProvider.listAccounts();
// console.log('list',secondAccountList);

console.log('accountsOfMetamask',accountsList);
