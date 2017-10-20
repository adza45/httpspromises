const https = require('https');

var movieTitles = ["The%20Shawshank%20Redemption", "Star%20Wars", "Pulp%20Fiction"];

function getMovie(movieTitle, callback) {
    let options = {
        hostname: 'api.themoviedb.org',
        port: 443,
        path: '/3/search/movie?api_key=caa61cdf5c3884f4e9660f7088d837ed&language=en-US&page=1&include_adult=false&query=' + movieTitle,
        method: 'GET'
    };

    let req = https.request(options, (res) => {
        res.on('data', (movieResponse) => {
            let result = JSON.parse(movieResponse);
            callback("Title: " + result.results[0].original_title + "\nOverview: " + result.results[0].overview + "\n\n");
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
}

getMovie(movieTitles[0], function(result) {
    console.log(result);
    getMovie(movieTitles[1], function(result) {
        console.log(result);
        getMovie(movieTitles[2], function(result) {
            console.log(result);
        });
    });
});
