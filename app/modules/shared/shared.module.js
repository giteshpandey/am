var sharedModule = angular.module('sharedModule', []);

var constants = {};

//constants.APP_BASE_URL = "http://localhost:8080/kss/";
constants.APP_BASE_URL = "";
// APP_BASE_URL: "./";

constants.APP_SERVICES_URL = {
	ASSIGNMENT: constants.APP_BASE_URL + "assignment",
	USERASSIGNMENT: constants.APP_BASE_URL + "userassignment",
	LOGIN: constants.APP_BASE_URL + "login"
};


sharedModule.constant(constants);

