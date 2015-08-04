$(document).ready( function() {
	$('.artist-finder').submit( function(event){
		// zero out results if previous search has run
		$('.search-results').html('');
		artistArray = [];
		// get the value of the artist the user submitted
		var artist = $(this).find("input[name='artist-input']").val();
		getSimilar(artist);
	});
});
//var for returned artist names in array
var artistArray = [];

// takes a string of an artist to be searched
// for on Tastekid
var getSimilar = function(artist) {
	// the parameters we need to pass in our request to Tastekids's API
	var request = {
		q: "music",
		k: "148673-Discover-OA4KJP1O",
		info: 1,
		type: "music",
		limit: 4,
		callback: "getArtists"
				};
	var result = $.getJSON("http://www.tastekid.com/api/similar?q=music:" + artist + "&k=148673-Discover-OA4KJP1O&limit=4&info=1&type=music&callback=?", getArtists)
	//error
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
		});
	//callback
	function getArtists(data){
		$('.search-results').html('');
		console.log(data);
		var resultCount = data.Similar.Results;
		console.log("resultcount: " + resultCount);
		$('.search-results').append("<h2>Artists similar to "+ artist + ":</h2>");
		$.each(resultCount, function(i, item) {
			console.log('ran each');
			var artistEntry = showArtist(item);
			$('.search-results').append(artistEntry);
			artistArray.push(data.Similar.Results[i].Name);

		});

	getDiscogs(artistArray);	
	};

	//error
	
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
					description.prepend((artistEntry.wTeaser).slice(0,250));
					//.read-more - tastekid similar.results.wUrl
					var readMore = result.find('.read-more');
					readMore.attr('href', artistEntry.wUrl);		
			return result;	
};


var getDiscogs = function(artistArray) {
		console.log(artistArray);
		$.each(artistArray, function(i, item) {
			console.log(artistArray+"2");
			var artistCurrent = item;
			console.log('ran each ' + artistCurrent);
			console.log(i);
			arrayNames(artistCurrent, i);
			});
	};
//passes current artist to discogs
var arrayNames = function(artistCurrent, i){
				console.log(artistCurrent);
			// the parameters we need to pass in our request to discogs's API
				/*var parameters = {
				key: "PYsVsPzgdtpWJRHhoWdZ",
				secret: "IgnpUVAmXGwXKePEVmgofIHItlgzqika",
				callback: "getCatalog"
				};*/
			//ex: https://api.discogs.com/database/search?q=Ian Curtis&key=PYsVsPzgdtpWJRHhoWdZ&secret=IgnpUVAmXGwXKePEVmgofIHItlgzqika 
			var discogResult = $.getJSON("https://api.discogs.com/database/search?q=" + artistCurrent + "&key=PYsVsPzgdtpWJRHhoWdZ&secret=IgnpUVAmXGwXKePEVmgofIHItlgzqika", getCatalog)
			//error
			.fail(function(jqXHR, error, errorThrown){
					 //add broken thumbnail image to dom
				$('.thumbnail').eq(i).attr('src', 'img/error-img.png');
				$('.discogs-link').eq(i).attr('class', "");
				});
			//callback add discogs to dom elements
			function getCatalog(data){
				//store first section of discogs results
				var discogsData = data.results[0];
				console.log(discogsData);
				console.log("index number: " + i)
				console.log(artistCurrent + " call back ran  1. discogs url: " + discogsData.uri + "; 2. img src: " +discogsData.thumb);	
				//adds thumbnail image to dom
				$('.thumbnail').eq(i).attr('src', discogsData.thumb);
				//add discogs url
				$('.discogs-link').eq(i).attr('href', "http://www.discogs.com" + discogsData.uri).append("View catalog &raquo;");
				}; 
			};