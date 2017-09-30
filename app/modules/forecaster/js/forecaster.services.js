var forecasterservices = angular.module('forecasterServiceModule', ['ngResource']);

forecasterservices.service('ForecastService', ['$resource','$http', 'APP_SERVICES_URL', function($resource,$http, APP_SERVICES_URL) {
		//var base_url = 'http://127.0.0.1:8000/';
		var base_url = 'http://13.229.77.255:80/'

		this.getPricePlot = function(security,success, failure) {
			//var plot = $resource(base_url+'plot');
			//plot.query({}, success, failure);

            $http.get(base_url+'plot?security='+security).then(success)

		};

		this.getSmallPricePlot = function(security,success, failure) {
			//var plot = $resource(base_url+'plot');
			//plot.query({}, success, failure);

            $http.get(base_url+'small?security='+security).then(success)

		};

	    this.getTrendMA = function(security,success, failure) {
			//var plot = $resource(base_url+'MA');
            $http.get(base_url+'ma?security='+security).then(success)

		};


		 this.getSeasonality = function(security,success, failure) {
			//var plot = $resource(base_url+'MA');
            $http.get(base_url+'seasonality?security='+security).then(success)

		};

		 this.getSecurities = function(success, failure) {
			//var plot = $resource(base_url+'MA');
            $http.get(base_url+'securities').then(success)

		};

        this.decompose_security =   function(security,algo,success, failure) {
			//var plot = $resource(base_url+'MA');
            $http.get(base_url+	'decompose?security='+security+'&algo='+algo).then(success)

		};




		
	
}]);