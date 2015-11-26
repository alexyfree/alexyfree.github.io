'use strict';

var alstock = angular.module('alstockApp', []);

alstock.controller('AppCtrl', ['$scope',
    function ($scope) {
        $scope.alert = "Hello, I'm Angular! How are you going?"
    }]);