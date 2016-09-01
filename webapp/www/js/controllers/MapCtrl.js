app.controller('MapCtrl', function($scope,leafletData,$interval,$http) {
  var get_spots = function(){
  var req = {
      method: 'GET',
      url: 'http://159.203.229.65:8000/get_spots'}
  $http(req).
        then(
        function(response){
          $scope.info =  response.data;
          console.log(response.data);
          $scope.info = {"spots": [{"lat": -33.424405, "lon": -70.60997, "id": 0}, {"lat": -33.424443, "lon": -70.609949, "id": 1}, {"lat": -33.424472, "lon": -70.609925, "id": 0}]}
          for(i in $scope.info.spots){
            console.log($scope.info.spots[i].lat);
            set_marker($scope.map,$scope.info.spots[i].lat,$scope.info.spots[i].lon,$scope.info.spots[i].id);
          }
        },
        function(response){
          $scope.info = response;
          console.log("error")
        });
};
$scope.spots = []
var set_marker = function(map,x,y,b){
  var blueIcon = L.icon({
    iconUrl: 'img/logoazul.png',
    shadowUrl: 'img/leaf-shadow.png',

    iconSize:     [10, 23], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var redIcon = L.icon({
  iconUrl: 'img/logorojo.png',
  shadowUrl: 'img/leaf-shadow.png',

  iconSize:     [10, 23], // size of the icon
  shadowSize:   [0, 0], // size of the shadow
  iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
  if (b==1){
      var marker = L.marker([x, y], {icon:redIcon}).addTo(map);
  }
  else{var marker = L.marker([x, y], {icon:blueIcon}).addTo(map);}
  $scope.spots.push(marker)
};
leafletData.getMap("map").then(function(map){
  $scope.map = map;
});

$scope.$on('$ionicView.enter', function(e) {
  get_spots();
  $scope.map.setView([-33.424405, -70.60997], 18);
  });

$interval(function(){
  var redIcon = L.icon({
    iconUrl: 'img/logorojo.png',
    shadowUrl: 'img/leaf-shadow.png',

    iconSize:     [10, 23], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  $scope.spots[2].setIcon(redIcon).update()
},15000);

})
