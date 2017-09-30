var forecasterControllers = angular.module('forecasterControllerModule',['ngSanitize','ngAnimate','ui.bootstrap']);
cache = {}
cache.price_plot = null 
cache.small_price_plot =null
cache.trend_cycle=null
cache.seasonality=null
cache.noise = null
cache.selected_stock=undefined;
cache.states=[]
cache.no_of_states=0
cache.hack = null
forecasterControllers.controller('ForecastCntrl', ['$timeout','$scope', 'ForecastService','$sce','$state', 
                                                     function($timeout,$scope,ForecastService,$sce, $state){
	$scope.cache = cache
    $scope.stocks = undefined;
    $scope.algo = null;

    $scope.choose_decompose=false;
    $scope.promt = "search stock";

    if($scope.cache.hack == null){
        $scope.cache.hack = 1;
        $state.go("forecast."+"new") ; // need to see bette rway
    }


    $scope.getSecurities = function() {
        var success = function(response) {
            $scope.stocks =(response.data);           
           
        };

        var failure = function() {
            alert('problem occurred in creating new assignment');
        };

        ForecastService.getSecurities(success, failure);
    }();


 
   $scope.go_back = function(){
            cache.no_of_states--;
            $state.go("forecast."+cache.states[cache.no_of_states])

   }


   $scope.change_state = function(state,algo){
      cache.no_of_states++;
      cache.states[cache.no_of_states] = state;
    if(state == "plot"){
        $scope.getPlot($scope.cache.selected_stock);
        $scope.getSmallPlot($scope.cache.selected_stock);
         $state.go("forecast."+state)
      //   $timeout(function() {
      //           $state.go("forecast."+state)
      // }, 3000);
      

    }

     if(state == "decomposed"){
        $scope.algo =algo
        $scope.decompose_security($scope.cache.selected_stock,$scope.algo)
         $state.go("forecast."+state)
      //     $timeout(function() {
      //           $state.go("forecast."+state)
      // }, 3000);

    }


   }



    $scope.getPlot = function(security) {
        var success = function(response) {
            cache.price_plot =$sce.trustAsHtml(response.data);             
            
           
        };

        var failure = function() {
            alert('problem occurred in creating new assignment');
        };

        ForecastService.getPricePlot(security, success, failure);
    }



    $scope.getSmallPlot = function(security) {
        var success = function(response) {
            cache.small_price_plot =$sce.trustAsHtml(response.data);
           
        };

        var failure = function() {
            alert('problem occurred in creating new assignment');
        };

        ForecastService.getSmallPricePlot(security, success, failure);
    }



    $scope.decompose = function(security){
            
            $scope.getTrendMA(security);
            $scope.getSeasonality(security);    



    }

    $scope.getTrendMA = function(security) {
        var success = function(response) {
            cache.trend_cycle =$sce.trustAsHtml(response.data);
        };

        var failure = function() {
            alert('problem occurred in creating new assignment');
        };

        ForecastService.getTrendMA(security, success, failure);
    }

     $scope.getSeasonality = function(security) {
        var success = function(response) {
            cache.seasonality =$sce.trustAsHtml(response.data[0]);
            cache.noise=$sce.trustAsHtml(response.data[1]);
        };

        var failure = function() {
            alert('problem occurred in creating new assignment');
        };

        ForecastService.getSeasonality(security, success, failure);
         
    
    }

      $scope.decompose_security = function(security,algo) {
        var success = function(response) {
            cache.trend_cycle =$sce.trustAsHtml(response.data[0]);
            cache.seasonality =$sce.trustAsHtml(response.data[1]);
            cache.noise=$sce.trustAsHtml(response.data[2]);
        };

        var failure = function() {
            alert('problem occurred in creating new assignment');
        };

        ForecastService.decompose_security(security,algo, success, failure);
         
    
    }



} ]);

