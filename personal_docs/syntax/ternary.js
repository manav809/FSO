if (true) {
} else {
}

let age = 20;
let name = "Timothy";

if (age > 20) {
  name = "M";
} else {
  name = "P";
}

let name = age > 19 && "Pedro"; //Pedro
let name = age > 19 || "Pedro"; //Timothy
let name = age > 19 ? "Pedro" : "Timothy"; //Pedro

const Component = () => {
  return age > 19 ? <div>Pedro</div> : <div>Timothy</div>;
};
