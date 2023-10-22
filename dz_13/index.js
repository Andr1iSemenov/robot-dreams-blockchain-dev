const { Web3} = require('web3');
const web3 = new Web3('http://127.0.0.1:7545');

const contactBookAbi = require('./abi.js');
const contractAddress = '0x3d12927D2b625FE07557C10B67D4425e83a5ee2B';
const ownerAddress = '0xef5c6f1e821B49A8e0bD83Dbc2EC067E43d18163';

const contract = new web3.eth.Contract(contactBookAbi, contractAddress);

const addContact = (contactName) => {
	return contract.methods.addContact(contactName).send({
    	from: ownerAddress,
    	gas: 300000,
	}).then((resp) => console.log(resp.transactionHash));
}

const callContact = (index) => {
	return contract.methods.callContact(index).call().then((resp) => {
		console.log(resp);
	});
};

const getContact = (index) => {
	return contract.methods.getContact(index).call().then((resp) => {
		console.log('Got contact: ', resp);
	});
};

const getLastIndex = () => {
	return contract.methods.getLastIndex().call().then((resp) => {
		return parseInt(resp);
	});
};

(async () => {
	await getContact(0);
	await addContact('Alice');
	await callContact(await getLastIndex() - 1);
})();