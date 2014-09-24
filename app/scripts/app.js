// TODO: Write app
var model = {
	name: 'Dylan\'s Pale Ale',
	brewer: 'Dylan Whitney',
	batch_size: 5,
	boil_time: 60,
	efficiency: 0.75,
	attenuation: 0.75,
	fermentables: [
		{
			name: '2 Row',
			manufacturer: 'Breiss',
			ppg: 37,
			quantity: 5
		}, {
			name: 'Munich',
			manufacturer: 'Weyermann',
			ppg: 32,
			quantity: 1
		}, {
			name: 'Maris Otter',
			manufacturer: 'Crisp',
			ppg: 35,
			quantity: 3
		}
	],
	hops: [
		{
			name: 'Cascade',
			origin: 'USA',
			time: 60,
			quantity: 2
		}, {
			name: 'Citra',
			origin: 'USA',
			time: 30,
			quantity: 2
		}, {
			name: 'Galaxy',
			origin: 'Australia',
			time: 1,
			quantity: 3
		}

	]
};
var zymology = angular.module('zymology', []);

zymology.controller('recipeCtrl', function($scope) {
	$scope.recipe = model;

	$scope.totalFermentables = function() {
		var count = 0;
		angular.forEach($scope.recipe.fermentables, function(fermentable) {
			count = count + parseFloat(fermentable.quantity);
		});
		return count;
	};

	$scope.totalHops = function() {
		var count = 0;
		angular.forEach($scope.recipe.hops, function(hop) {
			count = count + parseFloat(hop.quantity);
		});
		return count;
	};

	$scope.delete = function(collection, index) {
		$scope.recipe[collection].splice(index, 1);
	};

	$scope.potentialPPG = function() {
		var ppg = 0;

		angular.forEach($scope.recipe.fermentables, function(fermentable) {
			ppg = ppg + (fermentable.ppg * parseFloat(fermentable.quantity) / $scope.recipe.size);
		});
		return ppg;
	};

	$scope.og = function() {
		return ($scope.potentialPPG() * $scope.recipe.efficiency) * 0.001 + 1;
	};

	$scope.fg = function() {
		var fg = $scope.potentialPPG() * $scope.recipe.efficiency * $scope.recipe.attenuation;
		return ($scope.potentialPPG() * $scope.recipe.efficiency - fg) * 0.001 + 1;
	};
});