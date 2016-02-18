var myapp = angular.module('myapp', ['ngRoute', 'ngAnimate', 'ngStorage']);

myapp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'login.html',
            controller: 'loginController'
        })
        .when('/results',{
            templateUrl: 'results.html',
            controller: 'resultsController'
        })
        .when('/registration',{
            templateUrl: 'registration.html',
            controller: 'registrationController'
        });

});

myapp.controller('loginController', function($scope, $window, $localStorage){
    $scope.pageClass = 'login';
    $scope.login = function(){
        if($scope.username == $localStorage.name && $scope.password == $localStorage.password){
            $window.location.href = "#results"

        }
    else{
            $window.location.href = "#results"
        templateUrl: 'registration.html';
    }
}
$scope.register = function(){
    $window.location.href = "#registration";
}

});

myapp.controller('registrationController', function($scope, $window, $localStorage){
    $scope.pageClass = 'registration';

    $scope.store = function() {
        $localStorage.name = $scope.username;
        $localStorage.password = $scope.password;
        $localStorage.phone = $scope.phnum;
        $localStorage.address = $scope.Address;
    }
    $scope.registration = function(){
        $window.location.href = "#/";

    }

});

myapp.controller('resultsController', function ($scope, $http, $sce) {

    var map;
    var mapOptions;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true
    });
    var directionsService = new google.maps.DirectionsService();

    $scope.initialize = function () {
        var pos = new google.maps.LatLng(0, 0);
        var mapOptions = {
            zoom: 3,
            center: pos
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
    };
    $scope.calcRoute = function () {
        var end = document.getElementById('endlocation').value;
        var start = document.getElementById('startlocation').value;

        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setMap(map);
                directionsDisplay.setDirections(response);
                console.log(status);
            }

        });

    };

    google.maps.event.addDomListener(window, 'load', $scope.initialize);


    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };
    $scope.Weather1 = function() {
        var startlocation = document.getElementById('startlocation').value;
        $http.get("http://api.openweathermap.org/data/2.5/weather?q=" + startlocation + "&appid=44db6a862fba0b067b1930da0d769e98").success(function(data) {
            console.log(data);
            temp = data.main.temp;
            desc1 = data.weather;
            desc2 = desc1[0].main;
            place = data.name;
            $scope.currentweather1 = "Currently weather in " + place + " is " + (Math.round((temp - 273)*1.8 + 32)) + " &deg; F and " + desc2;
        })
    }

    $scope.Weather2 = function() {
        var endLocation = document.getElementById('endlocation').value;
        $http.get("http://api.openweathermap.org/data/2.5/weather?q=" + endLocation + "&appid=44db6a862fba0b067b1930da0d769e98").success(function(data) {
            temp = data.main.temp;
            desc1 = data.weather;
            desc2 = desc1[0].main;
            place = data.name;
            $scope.currentweather2 = "Currently weather in " + place + " is " + (Math.round((temp - 273)*1.8 + 32)) + " &deg; F and " + desc2;
        })
    }


});


