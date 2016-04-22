'use strict';

angular.module('confusionApp')
		.constant("baseURL", "http://localhost:3000/")
        .service('menuFactory', ['$resource','baseURL',	function($resource,baseURL) {    
   
						//the singular dish: getDish no longer needed: using resource can get all or 1 dish in same call
						this.getDishes = function(){
								//get the dishes from the server
								return $resource(baseURL+"dishes/:id",null,{'update':{method:'PUT' }});								
						};
																
						this.getPromotions = function() {
								//get the promotions from the server
								return $resource(baseURL+"promotions/:id",null,{'update':{method:'PUT' }});
						};

        }])

        .factory('corporateFactory', ['$resource','baseURL', function($resource,baseURL) {  
						return {
							getLeaders: function(){
								return $resource(baseURL+"leadership/:id",null,{'update':{method:'PUT' }});
							}
						};
								
        }])
				;


						//this is a 'factory' angular service. so create a
						// javascript object. assign tasks to it. Then RETURN it.
						//var corpfac = {};  
								//corpfac.getLeaders = function() {
								//	return $resource(baseURL+"leadership/:id",null,{'update':{method:'PUT' }});
								//};
								//	
								//return corpfac;
					//module.factory('MyService', function() {
					//		 
					//		var factory = {}; 
					// 
					//		factory.method1 = function() {
					//						//..
					//				}
					// 
					//		factory.method2 = function() {
					//						//..
					//				}
					// 
					//		return factory;
					//});
