const event = new Promise((resolve, reject) => {
  var name = "Jerry";
  if (name == "Tom") {
    resolve(name);
  } else {
    reject("Name was not Tom, name was " + name);
  }
});

event
  .then((name) => console.log(name)) //this is the resolve
  .catch((err) => console.log(err)) //this is the reject
  .finally(() => console.log("Promise Finished"));
