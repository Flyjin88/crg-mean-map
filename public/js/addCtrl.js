var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, $rootScope, geolocation, gservice){

    // Initializes Variables
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // Set initial coordinates to the CEED building
    $scope.formData.longitude = -98.311;
    $scope.formData.latitude = 26.212;

    geolocation.getLocation().then(function(data){
        coords = {lat:data.coords.latitude, long:data.coords.longitude};
        $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
        $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
        $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";
        gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

    });

    // Functions
    $rootScope.$on("clicked", function(){
        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
            $scope.formData.htmlverified = "Nope (Thanks for spamming my map...)";
        });
    });

    $scope.refreshLoc = function(){
        geolocation.getLocation().then(function(data){
            coords = {lat:data.coords.latitude, long:data.coords.longitude};

            $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
            $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
            $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";
            gservice.refresh(coords.lat, coords.long);
        });
    };

    $scope.createUser = function() {
        var userData = {
            username: $scope.formData.username,
            gender: $scope.formData.gender,
            age: $scope.formData.age,
            favlang: $scope.formData.favlang,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        $http.post('/users', userData)
            .success(function (data) {
                $scope.formData.username = "";
                $scope.formData.gender = "";
                $scope.formData.age = "";
                $scope.formData.favlang = "";
                gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
});