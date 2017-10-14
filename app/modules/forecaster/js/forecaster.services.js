var forecasterservices = angular.module('forecasterServiceModule', ['ngResource']);

forecasterservices.service('ForecastService', ['$resource','$http', 'APP_SERVICES_URL', function($resource,$http, APP_SERVICES_URL) {
		//var base_url = 'http://127.0.0.1:8000/';
		var base_url = 'http://13.229.77.255:80/'

		this.getPricePlot = function(security,x_length,y_length,success, failure) {
			//var plot = $resource(base_url+'plot');
			//plot.query({}, success, failure);

            $http.get(base_url+'plot?security='+security+"&xLength="+x_length+"&yLength="+y_length).then(success)

		};


	    this.getTrendMA = function(security,x_length,y_length,success, failure) {
			//var plot = $resource(base_url+'MA');
            $http.get(base_url+'ma?security='+security+"&xLength="+x_length+"&yLength="+y_length).then(success)

		};


		 this.getSeasonality = function(security,x_length,y_length,success, failure) {
			//var plot = $resource(base_url+'MA');
            $http.get(base_url+'seasonality?security='+security+"&xLength="+x_length+"&yLength="+y_length).then(success)

		};

		 this.getSecurities = function(success, failure) {
			//var plot = $resource(base_url+'MA');
            $http.get(base_url+'securities').then(success)

		};

        this.decompose_security =   function(security,algo,x_length,y_length,success, failure) {
			//var plot = $resource(base_url+'MA');
            $http.get(base_url+	'decompose?security='+security+'&algo='+algo+"&xLength="+x_length+"&yLength="+y_length).then(success)

		};


        this.forecast =   function(security,algo,x_length,y_length,success, failure) {
			//var plot = $resource(base_url+'MA');
            $http.get(base_url+	'forecast?security='+security+'&algo='+algo+"&xLength="+x_length+"&yLength="+y_length).then(success)

		};




		
	
}]);