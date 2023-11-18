	var newReleases = [
		{
			"id": 70111470,
			"title": "Die Hard",
			"rating": 4.0,
			"bookmark": []
		},
		{
			"id": 654356453,
			"title": "Bad Boys",
			"rating": 5.0,
			"bookmark": [{ id: 432534, time: 65876586 }]
		},
		{
			"id": 65432445,
			"title": "The Chamber",
			"rating": 4.0,
			"bookmark": []
		},
		{
			"id": 675465,
			"title": "Fracture",
			"rating": 5.0,
			"bookmark": [{ id: 432534, time: 65876586 }]
		}
	];

	// ------------ INSERT CODE HERE! -----------------------------------
	// Chain the filter and map functions to select the id of all videos
	// with a rating of 5.0.
	newReleases = newReleases.filter((release) => release.rating >= 5.0).map((release) => release.id)
	console.log(newReleases);  // Complete this expression
	// ------------ INSERT CODE HERE! -----------------------------------
