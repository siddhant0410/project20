const ethers = require('ethers');

let ethersProvider;

if(typeof window!='undefined' && typeof window.web3!=='undefined'&& typeof window.ethereum!=='undefined')
{
   window.ethereum.enable()

    //const ethersProvider = new ethers.providers.Web3Provider(window.web3.currentProvider);
  //  var ethersProvider = new ethers.providers.Web3Provider(web3.currentProvider, ethers.providers.networks.ropsten);
   ethersProvider = new ethers.providers.Web3Provider(window.web3.currentProvider);

    console.log("Metamask is connected");
    
    
}

export default ethersProvider;
