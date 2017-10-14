
var forecasterDirectives = angular.module('forecasterDirectiveModule',['ngSanitize','ngAnimate','ui.bootstrap']);


forecasterDirectives.directive('typeahead', function($timeout) {
  return {
    restrict: 'AEC',
    scope: {
      items: '=',
      prompt: '@',
      title: '@',
      subtitle: '@',
      model: '=',
      onSelect: '&'
    },
    link: function(scope, elem, attrs) {
  scope.handleSelection = function(selectedItem) {
    scope.model = selectedItem.symbol;
    scope.current = 0;
    scope.selected = true;
    $timeout(function() {
      scope.onSelect();
    }, 200);
  };
  scope.current = 0;
  scope.selected = true; // hides the list initially
  scope.isCurrent = function(index) {
    return scope.current == index;
  };
  scope.setCurrent = function(index) {
    scope.current = index;
  };
},
    templateUrl: 'modules/forecaster/views/typeahead_template.html'
  };
});