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







// takes a string of an artist to be searched
// for on Tastekid
var getSimilar = function(artist) {
	// the parameters we need to pass in our request to Tastekids's API
	var request = {
		//k: "148673-Discover-OA4KJP1O",
		info: 1,
		callback: "getArtists"
				};
	var result = $.getJSON("http://www.tastekid.com/api/similar?q=music:" + artist + "&info=1&callback=?", getArtists);
	//callback
	function getArtists(data){
		console.log(data);
		var resultCount = data.Similar.Results;
		console.log(resultCount);
		$.each(resultCount, function(i, item) {
			console.log('each ran');
			var artistEntry = showArtist(item);
			$('.search-results').append(artistEntry);
		});
	};
	//error
	/*.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});*/
};
// takes error string and turns it into displayable DOM element
var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};

// takes each artist string and turns it into displayable DOM element
var showArtist = function(artistEntry){
	var artistName = artistEntry.Name;
	console.log("show artist: " + artistName);
	getDiscogs(artistName);
	

// clone our result template code
	var result = $('.templates .col-md-3').clone();	
	//h2 - tastekid similar.results.Name
	var artistTitle = result.find('h2');
	artistTitle.append(artistEntry.Name);
	//.description - tastekid similar.results.wTeaser
	var description = result.find('.description');
	description.prepend((artistEntry.wTeaser).slice(0,150));
	//.read-more - tastekid similar.results.wUrl
	var readMore = result.find('.read-more');
	readMore.attr('href', artistEntry.wUrl);
	
	

	return result;
};

//get discogs pass results.name to get thumbnail and discogs artist url
	var getDiscogs = function(artistName) {
		console.log("getDiscogs function ran");
		// the parameters we need to pass in our request to Tastekids's API
		var parameters = {
		key: "PYsVsPzgdtpWJRHhoWdZ",
		secret: "IgnpUVAmXGwXKePEVmgofIHItlgzqika",
		callback: "getCatalog"
				};
			//ex: https://api.discogs.com/database/search?q=Ian Curtis&key=PYsVsPzgdtpWJRHhoWdZ&secret=IgnpUVAmXGwXKePEVmgofIHItlgzqika 
		var discogResult = $.getJSON("https://api.discogs.com/database/search?q=" + artistName + "&key=PYsVsPzgdtpWJRHhoWdZ&secret=IgnpUVAmXGwXKePEVmgofIHItlgzqika", getCatalog);
		//callback
		function getCatalog(data){
			console.log("callback worked: "+ data);
			var discogs = data.results[0];
			console.log(discogs);
			//.thumbnail from discogs
			var thumbnail = result.find('.thumbnail');
			thumbnail.attr('src', results.thumb);
			//.artist-link from discogs
			var discogsLink = result.find('.discogs-link');
			discogsLink.attr('href', "http://www.discogs.com/artist/" + results.uri);
			}; 
	};
	
		//results.thumb, results.uri