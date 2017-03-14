/**
 * Created by shmuel-d on 14.3.2017.
 */

function MainController(MainService, $uibModal) {
    var vm = this;
    vm.cities = [
        {
            name:'London'
        },
        {
            name:'Paris'
        },
        {
            name: 'Tel Aviv'
        },
        {
            name: 'NYC'
        }
    ];


    vm.getListings = function () {
        console.log(vm.selectedCity);
        vm.submitedCity = vm.selectedCity;
        MainService.getListingsByCity(vm.selectedCity)
            .then(function (data) {
                vm.listings = data.data.search_results;
                console.log(JSON.stringify(data.data, null, 2));
            })
    };

    vm.openModal = function(listing){

        MainService.getListingReviewById(listing.listing.id)
            .then(data => {
                console.log(JSON.stringify(data.data.reviews, null, 2));
                return data.data.reviews;
            })
            .then(reviews => {
                $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title-top',
                    ariaDescribedBy: 'modal-body-top',
                    size: 'lg',
                    template: `
            <div class="modal-header">
                <h3 class="modal-title" id="modal-title">{{listing.listing.name}}</h3>
                <img id="modal-img" ng-src="{{listing.listing.picture_url}}" alt="">
                <h4>{{listing.listing.public_address}}</h4>

            </div>
            <div class="modal-body" id="modal-body">
                
                 <div ng-repeat="review in reviews" class="media">
                            <div class="media-left">
                                <a href="#">
                                    <img class="media-object" ng-src="{{review.author.picture_large_url}}" alt="...">
                                </a>
                            </div>
                            <div class="media-body">
                                <h4 class="media-heading">{{review.author.first_name}}</h4>
                                {{review.comments}}
                            </div>
                        </div>
            </div>
            <div class="modal-footer">
                
            </div>
`,
                    controller: function($scope) {
                        $scope.listing = listing;
                        $scope.reviews = reviews;
                    }
                });
            })
    }


}
MainController.inject = ['MainService', '$uibModal'];

app.controller('mainCtrl',MainController);