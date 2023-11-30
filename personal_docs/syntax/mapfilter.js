let names = ["m", "n", "j", "m"];

names = names.map((name) => {
    return name + "1"
})
console.log(names)
names = names.filter((name) => {
    return name !== "m1"
})
console.log(names);