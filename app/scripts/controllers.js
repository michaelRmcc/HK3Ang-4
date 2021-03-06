'use strict';

angular.module('confusionApp')

			.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
					$scope.tab = 1;
					$scope.filtText = '';
					$scope.showDetails = false;
					$scope.showMenu = false;
					$scope.message = "Loading ...";

				//am using ng-resources to pull from server. QUERY method here.
				// and checking for error in response. NO direct assignment anymore
				menuFactory.getDishes().query(
						function(response) {
							//response contains the actual data 
							$scope.dishes = response;
							$scope.showMenu = true;
						},
						function(response) {
							//response contains status and error info now
							$scope.message = "Error: "+response.status + " " + response.statusText;
						} );
				
				//---direct assignment below line works. But has no error checking
				//$scope.dishes = menuFactory.getDishes().query();
				//----- mrm-4:48-vid above
													
				$scope.select = function(setTab) {
						$scope.tab = setTab;
						
						if (setTab === 2) {
								$scope.filtText = "appetizer";
						}
						else if (setTab === 3) {
								$scope.filtText = "mains";
						}
						else if (setTab === 4) {
								$scope.filtText = "dessert";
						}
						else {
								$scope.filtText = "";
						}
				};

				$scope.isSelected = function (checkTab) {
						return ($scope.tab === checkTab);
				};
			
				$scope.toggleDetails = function() {
						$scope.showDetails = !$scope.showDetails;
				};
	}])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory',
					function($scope, feedbackFactory) {

							$scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

							$scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
										//feedback entry is valid, so push it to server
										feedbackFactory.sendFeedback().save($scope.feedback);
										
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
							};
        }])

        .controller('DishDetailController',	['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
      
            //$scope.dish = {};
						$scope.showDish = false;
						$scope.message = "Loading ...";
					
						//teach using a different way here to specify success/error of functions
            // below line works. NO error checking though
            //$scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)});
          	$scope.dish =
							menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
							.$promise.then(
								function(response) {
									$scope.dish = response;
									$scope.showDish = true;
								},
								function(response) {
									$scope.message = "Error: "+response.status + " " + response.statusText;
								}
							);
        }])

        .controller('DishCommentController', ['$scope','menuFactory', function($scope,menuFactory) {

            $scope.newEntry = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.newEntry.date = new Date().toISOString();
                console.log($scope.newEntry);
                
                $scope.dish.comments.push($scope.newEntry);
							
								//push the new comment back to the server. so, persistent now
								menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.newEntry = {rating:5, comment:"", author:":watch", date:""} ;
            };
        }])


				.controller('IndexController', ['$scope', '$stateParams', 'menuFactory', 'corporateFactory',
						function($scope, $stateParams, menuFactory, corporateFactory) {
							
								//$scope.dish = {};
								$scope.showDish = false;
								$scope.message = "[IndexController] Loading ...";
							
								// 'getDish' the resources way: below line.
								//$scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                $scope.dish = menuFactory.getDishes().get({id:0})
										.$promise.then(
											function(response) {
												$scope.dish = response;
												$scope.showDish = true;											
											},
											function(response) {
													$scope.message = "Error-IndexController: ["+response.status + "] [" + response.statusText + "]";
											}
										);

								$scope.showPromotion = false;
								$scope.promotion =
										menuFactory.getPromotions().get({id:0})
										.$promise.then(
											function(response) {
												$scope.promotion = response;
												$scope.showPromotion = true;
											},
											function(response) {
												$scope.message = "WHOA!Error: "+response.status + " " + response.statusText;
											}
								    );
								//below works-now do it with error checking
								//$scope.corpFac = corporateFactory.getLeaders().get({id:3});
								
								$scope.showLeader = false;
								$scope.corpFac =
									corporateFactory.getLeaders().get({id:3})
									.$promise.then(
										function(response) {
											$scope.corpFac = response;
											$scope.showLeader = true;
										},
										function(response) {
											$scope.message = "Leaders from CorporateFactory Error!: "+response.status + " " + response.statusText;
										}
									);
								

								//add error-checking above		
								
						}])

				.controller('AboutController', ['$scope','$stateParams', 'corporateFactory', 
						function($scope, $stateParams, corporateFactory) {
								$scope.leadership = corporateFactory.getLeaders().query();
								
						}])				
;
