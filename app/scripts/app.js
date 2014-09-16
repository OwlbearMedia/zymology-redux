// TODO: Write app
var model = {
	name: 'Dylan\'s Pale Ale',
	brewer: 'Dylan Whitney',
	size: 5,
	fermentables: [
		{
			name: '2 Row',
			manufacturer: 'Breiss',
			quantity: 5
		}, {
			name: 'Munich',
			manufacturer: 'Weyermann',
			quantity: 1
		}, {
			name: 'Maris Otter',
			manufacturer: 'Crisp',
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
			count = count + fermentable.quantity;
		});
		return count;
	};
});