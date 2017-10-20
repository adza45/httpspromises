const https = require('https');

var movieTitles = ["The%20Shawshank%20Redemption", "Star%20Wars", "Pulp%20Fiction", "The%20Matrix"];
var promises = [];

let getMovie = function(movieTitle) {
  return new Promise(function(resolve, reject){
    let options = {
      hostname: 'api.themoviedb.org',
      port: 443,
      path: '/3/search/movie?api_key=caa61cdf5c3884f4e9660f7088d837ed&language=en-US&page=1&include_adult=false&query=' + movieTitle,
      method: 'GET'
    };

    let req = https.request(options, (res) => {
      res.on('data', (d) => {
        try{
          let result = JSON.parse(d);
          resolve("Title: " + result.results[0].original_title + "\nOverview: " + result.results[0].overview + "\n\n");
        } catch(ex) {
          reject(ex);
        }

      });
    });

    req.on('error', (e) => {
      reject(e);
    });
    req.end();
  });
}

for(let i = 0; i < movieTitles.length; i++){
  promises.push(getMovie(movieTitles[i]));
}

/*
promises[0].then(function(result){
  console.log(result);
  return promises[1];
}).then(function(result){
  console.log(result);
  return promises[2];
}).then(function(result){
  console.log(result);
})*/

Promise.all(promises).then(function(result){
  for(let i = 0; i < promises.length; i++){
    console.log(result[i]);
  }
})
