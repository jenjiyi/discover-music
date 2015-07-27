$(document).ready( function() {
	$('.artist-finder').submit( function(event){
		// zero out results if previous search has run
		$('.search-results').html('');
		// get the value of the artist the user submitted
		var artist = $(this).find("input[name='artist-input']").val();
		getSimilar(artist);
	});
});

//get top related artists from tastekid
//https://www.tastekid.com/api/similar?q=music:morrissey&k:148673-Discover-OA4KJP1O&verbose=1

//store results list

//loop through results and generate html from template
	//get discogs pass results.name to get thumbnail and discogs artist url 
	//https://api.discogs.com/database/search?q=Ian Curtis&key=PYsVsPzgdtpWJRHhoWdZ&secret=IgnpUVAmXGwXKePEVmgofIHItlgzqika 
		//user first result in array 
		//results.thumb, results.uri

//template classes
//h2 - tastekid similar.results.Name
//.description - tastekid similar.results.wTeaser
//.read-more - tastekid similar.results.wUrl
//.thumbnail -from discogs
//.artist-link -- from discogs



// takes error string and turns it into displayable DOM element
var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};
// this function takes the question object returned by StackOverflow 
// and creates new result to be appended to DOM
var showArtist = function(simArtist) {
	
	// clone our result template code
	var result = $('.templates .result').clone();
	
	// Set the question properties in result
	var nameElem = result.find('h2 a');
	nameElem.attr('href', simArtist.results.uri);
	nameElem.text(question.title);


	// set the #views for question property in result
	var viewed = result.find('.viewed');
	viewed.text(question.view_count);

	// set some properties related to asker
	var asker = result.find('.asker');
	asker.html('<p>Name: <a target="_blank" href=http://stackoverflow.com/users/' + question.owner.user_id + ' >' +
													question.owner.display_name +
												'</a>' +
							'</p>' +
 							'<p>Reputation: ' + question.owner.reputation + '</p>'
	);

	return result;
};

// takes a string of an artist to be searched
// for on Tastekid
var getSimilar = function(artist) {
	// the parameters we need to pass in our request to Tastekids's API
	//var request = {
		//k: "148673-Discover-OA4KJP1O",
		//info: 1,
		//type: "music",
		//callback: "jsonp"};
	var result = $.ajax({
		url: "https://www.tastekid.com/api/similar?q=music:" + artist,
		//data: request,
		datatype: "jsonp",
		type: "GET",
		})
	.done(function(result){
		console.log("done api");

		$.each(result.results, function(i, results) {
			var simArtist = showArtist(results);
			$('.results').append(simArtist);
		})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.results .container').append(errorElem);
	});
	});
};
