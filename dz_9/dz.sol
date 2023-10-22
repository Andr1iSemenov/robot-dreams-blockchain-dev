// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

library StringComparer {
    function compare(string memory str1, string memory str2) public pure returns (bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }
}

abstract contract Animal {
    string private animal = "Animal";
    string name;

    constructor(string memory _animal, string memory _name) {
        animal = _animal;
        name = _name;
    }

    function eat(string memory _food) public virtual returns (string memory);
    function speak() public virtual returns (string memory);

    function getAnimal() internal view returns (string memory) {
        return animal;
    }

    modifier eatsPlant(string memory _food){
        require(StringComparer.compare(_food, "plant"), string.concat(getAnimal(), string.concat(" can't eat ", _food)));
        _;
    }

    modifier eatsMeat(string memory _food){
        require(StringComparer.compare(_food, "meat"), string.concat(getAnimal(), string.concat(" can't eat ", _food)));
        _;
    }

    modifier cantEatChocolate(string memory _food){
        require(!StringComparer.compare(_food, "chocolate"), string.concat(getAnimal(), string.concat(" can't eat ", _food)));
        _;
    }

    modifier canEat(string memory _food){
        require(StringComparer.compare(_food, "plant") || StringComparer.compare(_food, "meat") || StringComparer.compare(_food, "chocolate"), string.concat(getAnimal(), string.concat(" can't eat ", _food)));
        _;
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

contract Sheep is Herbivore {

    constructor(string memory _name) Animal("Sheep", _name) {}

    function speak() public pure override returns (string memory) {
        return "Grunt-grunt";
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