'use strict';

var alstock = angular.module('alstockApp', ['ui.bootstrap']);

alstock.controller('AppCtrl', ['$scope', '$modal',
    function ($scope, $modal) {
        var currentActiveTab = 1;
        $scope.setActiveNavigation = function(number, type){
            if(type === "click"){
                $("nav>ul>li:nth-child(" + currentActiveTab + ")>div").removeClass("arrow-right");
                $("nav>ul>li:nth-child(" + currentActiveTab + ")>a").removeClass("active");
                currentActiveTab = number;
            }
            $( "nav>ul>li:nth-child(" + number + ")>div" ).addClass("arrow-right");
            $( "nav>ul>li:nth-child(" + number + ")>a" ).addClass("active");
        };
        $scope.removeActiveNavigation = function(number){
            if(currentActiveTab !== number) {
                $("nav>ul>li:nth-child(" + number + ")>div").removeClass("arrow-right");
                $("nav>ul>li:nth-child(" + number + ")>a").removeClass("active");
            }
        };

        $scope.open = function () {
            //$('body').addClass('scroll-disable');
            var modalInstance = $modal.open({
                templateUrl: 'html/popup1.html',
                controller: "AppCtrl",
                size: "size",
                resolve: {
                    items: function () {
                        return [];
                    },
                    closable: true
                },
                backdrop: 'static',
                keyboard: false
            });
        };
    }]);