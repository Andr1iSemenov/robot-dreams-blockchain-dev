const Farmer = artifacts.require("Farmer");
const Wolf = artifacts.require("Wolf");
const Horse = artifacts.require("Horse");
const Cow = artifacts.require("Cow");

let farmer = null;
let horse = null;
let cow = null;
let wolf = null;

module.exports = async (deployer) => {
    try {
        await initFarmer(deployer);
        await initHorse(deployer);
        await initCow(deployer);
        await initWolf(deployer);

        await addAnimal(horse.address);
        await addAnimal(cow.address);
        await addAnimal(wolf.address);

        await callAnimal(cow.address);
        await callAnimal(horse.address);

        await feedAnimal(wolf.address, "plant");
        await feedAnimal(wolf.address, "meat");

    } catch (e) {
        console.error('Error: ', e);
    }
}

const addAnimal = async (address) => {
    const result = await farmer.addAddress(address);
    console.log(result);
}

const feedAnimal = async (address, food) => {
    try {
        const result = await farmer.feedByAddress(address, food);
        console.log(result);
    } catch (e) {
        console.error('While feed animal with contract address %s with food %s got:\n', address, food, e.message);
    }
}

const callAnimal = async (address) => {
    const result = await farmer.callByAddress(address);
    console.log(result);
}

const initFarmer = async (deployer) => {
    try {
        farmer = await Farmer.deployed();
    } catch (e) {
        await deployer.deploy(Farmer);
    }
    if (!farmer) farmer = await Farmer.deployed();
}

const initHorse = async (deployer) => {
    try {
        horse = await Horse.deployed();
    } catch (e) {
        await deployer.deploy(Horse, "Spirit");
    }
    if (!horse) horse = await Horse.deployed();
}

const initCow = async (deployer) => {
    try {
        cow = await Cow.deployed();
    } catch (e) {
        await deployer.deploy(Cow, "Flower");
    }
    if (!cow) cow = await Cow.deployed();
}

const initWolf = async (deployer) => {
    try {
        wolf = await Wolf.deployed();
    } catch (e) {
        await deployer.deploy(Wolf, "Akella");
    }
    if (!wolf) wolf = await Wolf.deployed();
}
