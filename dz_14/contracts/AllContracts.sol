// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;


abstract contract Animal {
    string private animal = "Animal";
    string name;

    constructor(string memory _animal, string memory _name) {
        animal = _animal;
        name = _name;
    }

    function eat(string memory _food) public view virtual returns (string memory);
    function speak() public view virtual returns (string memory);

    function getAnimal() internal view returns (string memory) {
        return animal;
    }

    modifier eatsPlant(string memory _food){
        require(compare(_food, "plant"), string.concat(getAnimal(), string.concat(" can't eat ", _food)));
        _;
    }

    modifier eatsMeat(string memory _food){
        require(compare(_food, "meat"), string.concat(getAnimal(), string.concat(" can't eat ", _food)));
        _;
    }

    modifier cantEatChocolate(string memory _food){
        require(!compare(_food, "chocolate"), string.concat(getAnimal(), string.concat(" can't eat ", _food)));
        _;
    }

    modifier canEat(string memory _food){
        require(compare(_food, "plant") || compare(_food, "meat") || compare(_food, "chocolate"), string.concat(getAnimal(), string.concat(" can't eat ", _food)));
        _;
    }

    function compare(string memory str1, string memory str2) public pure returns (bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }
}

abstract contract Herbivore is Animal {
    function eat(string memory _food) public eatsPlant(_food) view override virtual returns (string memory) {
        return "Non-nom";
    }
}

abstract contract Carnivore is Animal {
    function eat(string memory _food) public eatsMeat(_food) view override virtual returns (string memory) {
        return "Non-nom";
    }
}

abstract contract Omnivore is Animal {
    function eat(string memory _food) public canEat(_food) view override virtual returns (string memory) {
        return "Non-nom";
    }
}

contract Cow is Herbivore {

    constructor(string memory _name) Animal("Cow", _name) {}

    function speak() public pure override returns (string memory) {
        return "Moooo!";
    }
}

contract Horse is Herbivore {

    constructor(string memory _name) Animal("Horse", _name) {}

    function speak() public pure override returns (string memory) {
        return "Igogo!";
    }
}

contract Wolf is Carnivore{

    constructor(string memory _name) Animal("Wolf", _name) {}

    function speak() public pure override returns(string memory) {
        return "Awoo";
    }
}

contract Dog is Omnivore{

    constructor(string memory _name) Animal("Dog", _name) {}

    function eat(string memory _food) public cantEatChocolate(_food) view override returns(string memory) {
        return super.eat(_food);
    }

    function speak() public pure override returns(string memory) {
        return "Woof";
    }
}

contract Pig is Omnivore {

    constructor(string memory _name) Animal("Pig", _name) {}

    function speak() public pure override returns(string memory) {
        return "Oink-oink";
    }
}

contract Farmer {
    address[] public animals;

    function addAddress(address animalAddress) public {
        animals.push(animalAddress);
    }

    function getAnimal(uint256 index) public view returns(Animal) {
        return Animal(animals[index]);
    }

    function feedByIndex(uint256 index, string calldata food) public view returns(string memory) {
        return getAnimal(index).eat(food);
    }

    function callByIndex(uint256 index) public view returns(string memory) {
        return getAnimal(index).speak();
    }

    function feedByAddress(address _address, string calldata food) public view returns(string memory) {
        return Animal(_address).eat(food);
    }

    function callByAddress(address _address) public view returns(string memory) {
        return Animal(_address).speak();
    }
}