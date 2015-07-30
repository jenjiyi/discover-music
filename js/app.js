$(document).ready( function() {
	$('.artist-finder').submit( function(event){
		// zero out results if previous search has run
		$('.search-results').html('');
		// get the value of the artist the user submitted
		var artist = $(this).find("input[name='artist-input']").val();
			
	});
});

// takes a string of an artist to be searched
// for on Tastekid
var getSimilar = function(artist) {
	// the parameters we need to pass in our request to Tastekids's API
	var request = {
		k: "148673-Discover-OA4KJP1O",
		info: 1,
		limit: 8,
		callback: "getArtists"
				};
	var result = $.getJSON("http://www.tastekid.com/api/similar?q=music:" + artist + "&k=148673-Discover-OA4KJP1O&limit=8&info=1&callback=?", getArtists);
	//callback
	function getArtists(data){
		console.log(data);
		var resultCount = data.Similar.Results;
		console.log(resultCount);
		$('.search-results').append("<h2>Results:</h2>");
		$.each(resultCount, function(i, item) {
			console.log('ran each');
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
	console.log("show artist ran: " + artistName);
	// clone our result template code
					var result = $('.templates .col-md-3').clone();	
					//h2 - tastekid similar.results.Name
					var artistTitle = result.find('h2');
					artistTitle.append(artistName);
					artistTitle.attr('id', artistName);
					//.description - tastekid similar.results.wTeaser
					var description = result.find('.description');
					description.prepend((artistEntry.wTeaser).slice(0,150));
					//.read-more - tastekid similar.results.wUrl
					var readMore = result.find('.read-more');
					readMore.attr('href', artistEntry.wUrl);		
			return result;	
};
/*
var getDiscogs = function(artistName) {
	
		console.log(artistDiscogs.Name);
		console.log("getDiscogs function ran" + artistName);

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
			var discogsData = data.results[0];
			console.log(discogsData);
			console.log(artistName + " call back ran  1. discogs url: " + discogsData.uri + "; 2. img src: " +discogsData.thumb);	
				//add results to dom
				var thumbnail = $('.templates .col-md-3').find('.thumbnail');
				thumbnail.attr('src', discogsData.thumb);
				//.discogs-link from discogs
				var discogsLink = $('.templates .col-md-3').find('.discogs-link');
				discogsLink.attr('href', "http://www.discogs.com/artist/" + discogsData.uri);
			}; 
		};*/

