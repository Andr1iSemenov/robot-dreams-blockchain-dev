const Farmer = artifacts.require("Farmer");
const Wolf = artifacts.require("Wolf");
const Horse = artifacts.require("Horse");
const Dog = artifacts.require("Dog");

/*FOOD CONSTANTS*/
const PLANT = "plant";
const MEAT = "meat";
const CHOCOLATE = "chocolate";
const FINGERS = "fingers";
const PLASTIC = "plastic";
const NOT_FOOD = "not-food";

/*NAME CONSTANTS*/
const HORSE_NAME = "Spirit";
const DOG_NAME = 'Ice'

/*ACTION CONSTANTS*/
const ANIMAL_SLEEP = 'Z-z-z';
const ANIMAL_EAT = 'Non-nom';
const CALL_HORSE = 'Igogo!';
const CALL_DOG = 'Woof';


contract("Horse and Farmer", async (accounts) => {
    let farmer, horse;
    before(async () => {
        farmer = await Farmer.deployed();
        horse = await Horse.deployed();
    });

    it(`Horse has the correct name ${HORSE_NAME}`, async () => {
        let name = await horse.getName();
        assert.equal(name, HORSE_NAME, "Horse has incorrect name");
    });

    it("Horse can sleep", async () => {
        let sleep = await horse.sleep();
        assert.equal(sleep, ANIMAL_SLEEP, "Horse can't sleep");
    });

    it("Horse can eat plant", async () => {
        let eatPlant = await horse.eat(PLANT);
        assert.equal(eatPlant, ANIMAL_EAT, "Horse can't eat plant");
    });

    it("Horse can't eat ”meat”, ”not-food”, ”plastic”", async () => {
        let eatMeat, eatNotFood, eatPlastic;
        try {
            eatMeat = await horse.eat(MEAT);
        } catch (ignored) {}

        try {
            eatNotFood = await horse.eat(NOT_FOOD);
        } catch (ignored) {}

        try {
            eatPlastic = await horse.eat(PLASTIC);
        } catch (ignored) {}

        assert.notEqual(eatMeat, ANIMAL_EAT, "Horse eats meat");
        assert.notEqual(eatNotFood, ANIMAL_EAT, "Horse eats not-food");
        assert.notEqual(eatPlastic, ANIMAL_EAT, "Horse eats plastic");
    });

    it("Farmer can call Horse, Horse responds correctly", async () => {
        const result = await farmer.callByAddress(horse.address);
        assert.equal(result, CALL_HORSE, "Farmer can't call horse");
    });

    it("Farmer can feed Horse with plant", async () => {
        const result = await farmer.feedByAddress(horse.address, PLANT);
        assert.equal(result, ANIMAL_EAT, "Farmer can't feed horse with plant");
    });

    it("Farmer cannot feed Horse with anything else(”meat”, ”plastic”, ”fingers”, etc)", async () => {
        let eatMeat, eatPlastic, eatFingers, eatNotFood;

        try {
            eatMeat = await farmer.feedByAddress(horse.address, MEAT);
        } catch (ignored) {}

        try {
            eatPlastic = await farmer.feedByAddress(horse.address, PLASTIC);
        } catch (ignored) {}

        try {
            eatFingers = await farmer.feedByAddress(horse.address, FINGERS);
        } catch (ignored) {}

        try {
            eatNotFood = await farmer.feedByAddress(horse.address, NOT_FOOD);
        } catch (ignored) {}

        assert.notEqual(eatMeat, ANIMAL_EAT, "Farmer can feed horse with meat");
        assert.notEqual(eatNotFood, ANIMAL_EAT, "Farmer can feed horse with plastic");
        assert.notEqual(eatFingers, ANIMAL_EAT, "Farmer can feed horse with fingers");
        assert.notEqual(eatPlastic, ANIMAL_EAT, "Farmer can feed horse with not-food");
    });
});


contract("Dog and Farmer", async (accounts) => {
    let farmer, dog;
    before(async () => {
        farmer = await Farmer.deployed();
        dog = await Dog.deployed();
    });

    it(`Dog has the correct name ${DOG_NAME}`, async () => {
        let name = await dog.getName();
        assert.equal(name, DOG_NAME, "Dog has incorrect name");
    });

    it("Dog can sleep", async () => {
        let sleep = await dog.sleep();
        assert.equal(sleep, ANIMAL_SLEEP, "Dog can't sleep");
    });

    it("Dog can eat plant", async () => {
        let eatPlant = await dog.eat(PLANT);
        assert.equal(eatPlant, ANIMAL_EAT, "Dog can't eat plant");
    });

    it("Dog can eat meat", async () => {
        let eatMeat = await dog.eat(MEAT);
        assert.equal(eatMeat, ANIMAL_EAT, "Dog can't eat meat");
    });

    it("Dog can't eat ”not-food”, ”plastic”, ”chocolate”", async () => {
        let eatNotFood, eatPlastic, eatChocolate;

        try {
            eatNotFood = await dog.eat(NOT_FOOD);
        } catch (ignored) {}

        try {
            eatPlastic = await dog.eat(PLASTIC);
        } catch (ignored) {}

        try {
            eatChocolate = await dog.eat(CHOCOLATE);
        } catch (ignored) {}


        assert.notEqual(eatNotFood, ANIMAL_EAT, "Dog eats not-food");
        assert.notEqual(eatPlastic, ANIMAL_EAT, "Dog eats plastic");
        assert.notEqual(eatChocolate, ANIMAL_EAT, "Dog eats chocolate");
    });

    it("Farmer can call Dog, Dog responds correctly", async () => {
        const result = await farmer.callByAddress(dog.address);
        assert.equal(result, CALL_DOG, "Farmer can't call dog");
    });

    it("Farmer can feed Dog with plant", async () => {
        const result = await farmer.feedByAddress(dog.address, PLANT);
        assert.equal(result, ANIMAL_EAT, "Farmer can't feed dog with plant");
    });

    it("Farmer cannot feed Dog with ”not-food”, ”plastic” and anything else.", async () => {
        let eatPlastic, eatFingers, eatNotFood, eatChocolate;

        try {
            eatPlastic = await farmer.feedByAddress(dog.address, PLASTIC);
        } catch (ignored) {}

        try {
            eatFingers = await farmer.feedByAddress(dog.address, FINGERS);
        } catch (ignored) {}

        try {
            eatNotFood = await farmer.feedByAddress(dog.address, NOT_FOOD);
        } catch (ignored) {}

        try {
            eatChocolate = await farmer.feedByAddress(dog.address, CHOCOLATE);
        } catch (ignored) {}

        assert.notEqual(eatNotFood, ANIMAL_EAT, "Farmer can feed dog with plastic");
        assert.notEqual(eatFingers, ANIMAL_EAT, "Farmer can feed dog with fingers");
        assert.notEqual(eatPlastic, ANIMAL_EAT, "Farmer can feed dog with not-food");
        assert.notEqual(eatChocolate, ANIMAL_EAT, "Farmer can feed dog with chocolate");
    });
});

