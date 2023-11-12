//functional programming
var triple = function (x) {
  return x * 3;
};
var waffle = triple;
waffle(30);

//Filter Function Tutorial
var animals = [
  { name: "Fluffykins", species: "rabbit" },
  { name: "Caro", species: "dog" },
  { name: "Hamilton", species: "dog" },
  { name: "Harold", species: "fish" },
  { name: "Ursula", species: "cat" },
  { name: "Jimmy", species: "fish" },
];
//filtering without filter function
var dogs = [];
for (var i = 0; i < animals.length; i++) {
  if (animals[i].species === "dog") {
    dogs.push(animals[i]);
  }
}
//with filter function
var dogs = animals.filter(function (animal) {
  return animal.species === "dog";
});
//filter runs a loop and performs the inner function logic and arrifies as we move on

var isDog = function (animal) {
  return animal.species === "dog";
};

var dogs = animals.filter(isDog); //ARRAY WITH DOGS
console.log(dogs);
// var otherAnimals = animals.reject(isDog);//ARRAY WITHOUT DOGS
