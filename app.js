var movieExplorer = angular.module('movieExplorer', ['ngResource', 'ngRoute']);

movieExplorer.config(function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'mainController'
		})
		.when('/details/:imdbID', {
			templateUrl: 'views/details.html',
			controller: 'detailController'
		})
		.otherwise({
			redirectTo: '/'
		});

	$locationProvider.html5Mode(true);
});

movieExplorer.controller('mainController', function($scope, $resource, $routeParams) {
	var search = this;
	search.results = [];

	var searchAPI = $resource('http://www.omdbapi.com/?r=json',
		{ callback: 'JSON_CALLBACK' },
		{ get: { method: 'JSONP' } });

	search.submit = function() {
		searchAPI.get({ s: search.query })
			.$promise.then(function(res) {
				search.results = res.Search;
			});
	};

	// There must be a cleaner way to do this...
	$scope.$on('$routeChangeStart', function(next, current) { 
		search.results = [];
	});
});

movieExplorer.controller('detailController', function($scope, $resource, $routeParams) {
	var detailsAPI = $resource('http://www.omdbapi.com/?r=json',
		{ callback: 'JSON_CALLBACK', plot: 'full', tomatoes: true },
		{ get: { method: 'JSONP' } });

	detailsAPI.get({ i: $routeParams.imdbID })
		.$promise.then(function(res) {
			$scope.movie = res;
			$scope.movie.PosterURL = 'http://img.omdbapi.com/?apikey=de6cab49&i=' + $routeParams.imdbID;
		});
});
