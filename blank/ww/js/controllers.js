angular.module('app.controllers', ['leaflet-directive'])

.controller('estacionamientosCtrl', function($scope,leafletData,$interval,$http) {
  var get_spots = function(){
  var req = {
      method: 'GET',
      url: 'http://159.203.229.65:8000/get_spots/'}
  $http(req).
        then(
        function(response){
          $scope.info =  response.data;
          console.log(response.data);
        },
        function(response){
          $scope.info = response;
          console.log("error")
        });
};
var set_marker = function(map,x,y){
  var marker = L.Marker([x, y]).addTo(map);
};
leafletData.getMap("map").then(function(map){
  $scope.map = map;
});

$scope.$on('$ionicView.enter', function(e) {
  get_spots();
  $scope.map.setView([-33.499310, -70.615064], 15);
  });

//$interval(function(){
//  $scope.map.setView([0,0],12)
//},10000);

})

.controller('parkHereCtrl', function($scope) {

})

.controller('loginCtrl', function($scope) {

})
