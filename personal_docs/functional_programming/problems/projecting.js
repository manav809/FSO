var newReleases = [
    {
      id: 70111470,
      title: "Die Hard",
      rating: [4.0],
      bookmark: [],
    },
    {
      id: 654356453,
      title: "Bad Boys",
      rating: [5.0],
      bookmark: [{ id: 432534, time: 65876586 }],
    },
    {
      id: 65432445,
      title: "The Chamber",
      rating: [4.0],
      bookmark: [],
    },
    {
      id: 675465,
      title: "Fracture",
      rating: [5.0],
      bookmark: [{ id: 432534, time: 65876586 }],
    },
  ],
  videoAndTitlePairs = [];

// ------------ INSERT CODE HERE! -----------------------------------
// Use forEach function to accumulate {id, title} pairs from each video.
// Put the results into the videoAndTitlePairs array using the Array's
// push() method. Example: videoAndTitlePairs.push(newItem);
// ------------ INSERT CODE HERE! -----------------------------------
newReleases.forEach((release) => videoAndTitlePairs.push({id: release.id ,title: release.title}));

console.log(videoAndTitlePairs);
