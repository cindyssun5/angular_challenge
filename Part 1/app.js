angular.module('simpleApp',[])
  .controller('CounterController', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.model = {};

    $scope.model.now = moment();

    var updateTimer = function() {
      var elapsed = moment().diff($scope.model.now, 'seconds');
      $scope.model.elapsed = moment.duration(elapsed, 'seconds').format("hh [hour] mm [minutes] ss [seconds]");
      $timeout(updateTimer, 1000);
    };

    updateTimer();
    
}])

.controller('TableController', ['$scope', 'TableFactory', function($scope, TableFactory) {
  $scope.model = {};
  $scope.model.objs = {};
  $scope.model.header = [];
  $scope.model.table = [];

  var receiveData = function() {
    TableFactory.getData()
    .then(function(data) {
      $scope.model.objs = data;
      for (var key in $scope.model.objs["c24"]) {
        $scope.model.header.push(key);
      }

      for (var key in $scope.model.objs) {
        var temp = [];
        temp.push(key);
        for (var val of $scope.model.header) {
          if ($scope.model.objs[key][val]) {
            temp.push($scope.model.objs[key][val]["recv"])
          } else {
            temp.push('');
          }
        }
        $scope.model.table.push(temp);
      }

    })
    .catch(function(err) {
      console.error(err);
    });
  };

  receiveData();

}])

.factory('TableFactory', ['$http',
  function($http) {
    var getData = function() {
      return $http({
        method: 'GET',
        url: 'https://friendpaste.com/71KNTMaFCZ6diD2esfC4Vo/raw?rev=626665323233',
    })
    .then(function(resp) {
      return resp.data;
    }, function errorCallback(resp) {
      console.log("Status: ", resp.status, "Error: ", resp.statusText);
    })};

    return {
      getData: getData
    };
}]);