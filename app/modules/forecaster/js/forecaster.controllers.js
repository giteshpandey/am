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
cache.decompose_algo =null
cache.forecast=null
forecasterControllers.controller('ForecastCntrl', ['$timeout','$scope', 'ForecastService','$sce','$state', 
                                                     function($timeout,$scope,ForecastService,$sce, $state){
	$scope.cache = cache
    $scope.stocks = undefined;    

    $scope.choose_decompose=false;
    $scope.promt = "search stock";
    $scope.alert = function(msg) {

          alert(msg)

    }

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
    	$scope.getSmallPlot($scope.cache.selected_stock,1.4,1.6);
        $scope.getPlot($scope.cache.selected_stock,5.5,5);
       
         $state.go("forecast."+state)
      
      

    }

     if(state == "decomposed"){
     	if(!(algo ==null || algo == undefined)){
     		$scope.cache.algo =algo
     	}
        
        $scope.decompose_security($scope.cache.selected_stock,$scope.cache.algo,2.4,3)
         $state.go("forecast."+state)
 

    }


    if(state == 'forecasting'){
    	cache.trend_cycle=null
        cache.seasonality=null
       cache.noise = null
    	  $scope.decompose_security($scope.cache.selected_stock,$scope.cache.algo,1.4,1.6)
          $state.go("forecast."+state)

    }


   }



    $scope.getPlot = function(security,x_length,y_length) {
        var success = function(response) {
            cache.price_plot =$sce.trustAsHtml(response.data);             
            
           
        };

        var failure = function() {
            alert('problem occurred in creating new assignment');
        };

        ForecastService.getPricePlot(security,x_length,y_length, success, failure);
    }



    $scope.getSmallPlot = function(security,x_length,y_length) {
        var success = function(response) {
            cache.small_price_plot =$sce.trustAsHtml(response.data);
           
        };

        var failure = function() {
            alert('problem occurred in creating new assignment');
        };

        ForecastService.getPricePlot(security,x_length,y_length, success, failure);
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

        ForecastService.getTrendMA(security,3,3, success, failure);
    }

     $scope.getSeasonality = function(security) {
        var success = function(response) {
            cache.seasonality =$sce.trustAsHtml(response.data[0]);
            cache.noise=$sce.trustAsHtml(response.data[1]);
        };

        var failure = function() {
            alert('problem occurred in creating new assignment');
        };

        ForecastService.getSeasonality(security,3,3, success, failure);
         
    
    }

      $scope.decompose_security = function(security,algo,x_length,y_length) {
        var success = function(response) {
            cache.trend_cycle =$sce.trustAsHtml(response.data[0]);
            cache.seasonality =$sce.trustAsHtml(response.data[1]);
            cache.noise=$sce.trustAsHtml(response.data[2]);
        };

        var failure = function() {
            alert('problem occurred in creating new assignment');
        };

        ForecastService.decompose_security(security,algo,x_length,y_length, success, failure);
         
    
    }


    $scope.forecast = function(algo){
           var success = function(response) {
            cache.forecast =$sce.trustAsHtml(response.data);
          
        };

        var failure = function() {
            alert('problem occurred in creating new assignment');
        };

        ForecastService.forecast($scope.cache.selected_stock,algo,3.5,3.5, success, failure);
    


    }



} ]);

