/**
 * Created by shmuel-d on 14.3.2017.
 */
function MainService($http){

    function getListingsByCity(cityName){
        return $http.get("https://api.airbnb.com/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty&location=" + cityName)
    }

    function getListingReviewById(id) {
        return $http.get("https://api.airbnb.com/v2/reviews?client_id=3092nxybyb0otqw18e8nh5nty&role=all&listing_id="+id)
    }

    return{
        getListingsByCity,
        getListingReviewById,
    }
}

MainService.inject =['$http'];

app.factory('MainService',MainService);