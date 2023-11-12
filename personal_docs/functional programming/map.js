var animals = [
  { name: "Fluffykins", species: "rabbit" },
  { name: "Caro", species: "dog" },
  { name: "Hamilton", species: "dog" },
  { name: "Harold", species: "fish" },
  { name: "Ursula", species: "cat" },
  { name: "Jimmy", species: "fish" },
];

var names = [];
for (var i = 0; i < animals.length; i++) {
  names.push(animals[i].name);
}

var names = animals.map(function (animal) {
  return animal.name;
});

var NAMES = animals.map((animal) => animal.name);
console.log(NAMES);

var animal_bio = animals.map(function (animal) {
  return animal.name + " is a " + animal.species;
});

console.log(animal_bio);
