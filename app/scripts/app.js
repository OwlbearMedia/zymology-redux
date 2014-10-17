// TODO: Write app
var model = {
	name: 'Dylan\'s Pale Ale',
	brewer: 'Dylan Whitney',
	batch_size: 5,
	boil_time: 60,
	efficiency: 0.75,
	attenuation: 0.75,
	gravity: {
		og: null,
		fg: null
	},
	fermentables: [
		{
			name: '2 Row',
			manufacturer: 'Breiss',
			lovibond: 1.8,
			ppg: 37,
			quantity: 8
		}, {
			name: 'Munich',
			manufacturer: 'Weyermann',
			lovibond: 10,
			ppg: 30,
			quantity: 3
		}, {
			name: 'Cara Munich',
			manufacturer: 'Castle',
			lovibond: 60,
			ppg: 29,
			quantity: 1
		}
	],
	hops: [
		{
			name: 'Cascade',
			origin: 'USA',
			time: 60,
			alpha_acid: 11,
			ibu: 0,
			quantity: 2
		}, {
			name: 'Citra',
			origin: 'USA',
			time: 30,
			alpha_acid: 5,
			ibu: 0,
			quantity: 2
		}, {
			name: 'Galaxy',
			origin: 'Australia',
			time: 1,
			alpha_acid: 13,
			ibu: 0,
			quantity: 3
		}

	]
};

var zymology = angular.module('zymology', []);

zymology.controller('recipeCtrl', function($scope) {
	$scope.recipe = model;

	$scope.delete = function(collection, index) {
		$scope.recipe[collection].splice(index, 1);
	};
	
	$scope.totalFermentables = function() {
		var count = 0;
		angular.forEach($scope.recipe.fermentables, function(fermentable) {
			count = count + parseFloat(fermentable.quantity);
		});
		return count;
	};

	$scope.fermentablePercent = function(fermentable) {
		return (fermentable.quantity / $scope.totalFermentables() * 100).toFixed(2)
	};

	$scope.potentialPPG = function() {
		var ppg = 0;

		angular.forEach($scope.recipe.fermentables, function(fermentable) {
			ppg = ppg + (fermentable.ppg * parseFloat(fermentable.quantity) / $scope.recipe.batch_size);
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

	$scope.srm = function() {
		var mcu = 0;

		angular.forEach($scope.recipe.fermentables, function(fermentable) {
			mcu = mcu + (fermentable.lovibond * parseFloat(fermentable.quantity) / $scope.recipe.batch_size);
		});

		return 1.4922 * Math.pow(mcu, 0.6859);
	};

	$scope.abv = function() {
		return ((76.08 * ($scope.og() - $scope.fg()) / (1.775 - $scope.og())) * ($scope.fg() / 0.794));
	};

	$scope.totalHops = function() {
		var count = 0;
		angular.forEach($scope.recipe.hops, function(hop) {
			count = count + parseFloat(hop.quantity);
		});
		return count;
	};

	$scope.ibu = function(hop) {
		var aau = hop.alpha_acid * hop.quantity,
			// Hop utilization equation by Glenn Tinseth: http://www.realbeer.com/hops/research.html
			tinseth = (1.65 * Math.pow(0.000125, ($scope.og() - 1))) * ((1 - Math.pow(Math.E, (-0.04 * hop.time))) / 4.15),
			// 74.89 is the constant for the conversion of Imperial units to Metric. The proper units for IBUs are milligrams per liter.
			// TODO: use milligrams per liter
			ibu = aau * tinseth * 74.89 / $scope.recipe.batch_size;

		return ibu;
	};

	$scope.totalIBU = function() {
		var ibu = 0;
		
		angular.forEach($scope.recipe.hops, function(hop) {
			ibu = ibu + $scope.ibu(hop);
		});

		return ibu;
	};
});