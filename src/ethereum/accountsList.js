import ethersProvider from '../ethereum/ether';

// eslint-disable-next-line no-undef
export let accountsList = ethersProvider.listAccounts();

// var secondAccountList = [];
// secondAccountList = ethersProvider.listAccounts();
// console.log('list',secondAccountList);
//this is accountList
console.log('accountsOfMetamask',accountsList);
