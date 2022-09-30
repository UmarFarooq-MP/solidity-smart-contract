const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');


const web3 = new Web3(ganache.provider());
const {abi, evm} = require('../compile');


let accounts;
let inbox;

beforeEach (async () => {

    //get list of all the accounts
    accounts = await web3.eth.getAccounts();
 
    //use one of thoese account to deploy the contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object, 
            arguments : ['Hi there!']
        })
        .send({
            from : accounts[0],
            gas : '1000000'
        });
});


describe ('Inbox', () => {
    
    it('deploy a contract', () => {
        assert.ok(inbox.options.address);
    });

    it ('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message , 'Hi there!');
    });

    it ('has updated the value', async () => {
        await inbox.methods.setMessage('Bye').send({
            from : accounts[0]
        });

        const message = await inbox.methods.message().call();
        assert.equal(message , 'Bye');
    });

});