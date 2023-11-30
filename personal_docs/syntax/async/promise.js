const event = new Promise((resolve, reject) => {
  var name = "Jerry";
  if (name == "Tom") {
    resolve(name);
  } else {
    reject("Name was not Tom, name was " + name);
  }
});

event
  .then((name) => console.log(name))
  .catch((err) => console.log(err))
  .finally(() => console.log("Promise Finished"));
