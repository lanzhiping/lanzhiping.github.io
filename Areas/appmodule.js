'use strict';

(function(){

    angular.module('app',['ngMaterial'])
            .controller('appCtrl',['$scope', function($scope){
                $scope.text = 'this is my learning website.'
            }]);
})();