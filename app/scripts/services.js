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
				
				//mrm --- making this up for final-chunk of assignment4
				.service('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
						
						this.sendFeedback = function(){
								//push feedback from the server
								return $resource(baseURL+"feedback/:id", null, { 'save': { method: 'POST',	isArray:false } });								
						};					
					
				}])
				
				;
	