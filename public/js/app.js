'use strict';

var alstock = angular.module('alstockApp', ['ui.bootstrap']);

alstock.controller('AppCtrl', ['$scope', '$uibModal', '$http',
    function ($scope, $uibModal, $http) {
        var currentActiveTab = 1;
        $scope.dataEmail = {
            name: "",
            phone: "",
            email: "",
            question: "",
            description: ""
        };
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

        $scope.open = function (template) {
            //$('body').addClass('scroll-disable');
            var modalInstance = $uibModal.open({
                templateUrl: template,
                controller: "ModalCtrl"
            });
        };

        $scope.returnEmail = function(){
            $scope.open('html/return-call.html');
        };

        $scope.sendEmail = function(desc){
            console.log("sendEmail");
            $scope.dataEmail.description = desc;
            var req = {
                method: 'POST',
                url: '/send-email?name=' + $scope.dataEmail.name + '&phone=' + $scope.dataEmail.phone +
                '&email=' + $scope.dataEmail.email + '&question=' + $scope.dataEmail.question +
                '&description=' + $scope.dataEmail.description
            };

            $http(req).then(
                function(data){
                    $scope.dataEmail = {
                        name: "",
                        phone: "",
                        email: "",
                        question: "",
                        description: ""
                    };
                    $scope.open('html/just-prompt-circle.html');
                },
                function(error){
                    $scope.dataEmail = {};
                    console.log("error");
                });
        };
    }]);

alstock.controller('ModalCtrl', ['$scope', '$http', '$uibModalInstance',
    function ($scope, $http, $uibModalInstance) {
        $scope.open = true;
        $scope.isSuccessSendEmail = false;

        $scope.data = {
            name: "",
            phone: "",
            email: "",
            question: "",
            description: ""
        };

        $scope.sendEmail = function(desc){
            console.log("sendEmail");
            $scope.data.description = desc;
            var req = {
                method: 'POST',
                url: '/send-email?name=' + $scope.data.name + '&phone=' + $scope.data.phone +
                '&email=' + $scope.data.email + '&question=' + $scope.data.question +
                '&description=' + $scope.data.description
            };

            $http(req).then(
                function(data){
                    $scope.isSuccessSendEmail = true;
                },
                function(error){console.log("error");});
        };

        $(document).click(function(event) {
            if ($(event.target).closest(".return-call").length) return;
            if($(".modal-backdrop .in").length){
                $scope.close();
            }
        });

        $scope.close = function(){
            $scope.open = false;
            $uibModalInstance.dismiss('cancel');
        }
    }]);