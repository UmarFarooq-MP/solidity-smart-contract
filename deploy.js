//https://goerli.infura.io/v3/3c5e7fabd2224cae861b877dbe719ce1
//short post wheel wreck try cousin movie tree master cannon ticket skill


const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {abi, evm} = require('./compile');

const provider = new HDWalletProvider (
    'short post wheel wreck try cousin movie tree master cannon ticket skill',
    'https://goerli.infura.io/v3/3c5e7fabd2224cae861b877dbe719ce1'
);


const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy from account ', accounts[0]);
    const result = await new web3.eth.Contract(abi)
        .deploy(
            {
                data: evm.bytecode.object,
                arguments: ['Hi there umar!']
            })
        .send({
            gas : '1000000',
            from : accounts[0]
        });
    
    console.log('Contract deployed to ', result.options.address);
    provider.engine.stop();
};
deploy();