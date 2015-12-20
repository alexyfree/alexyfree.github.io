'use strict';

var alstock = angular.module('alstockApp', ['ui.bootstrap']);

alstock.controller('AppCtrl', ['$scope', '$uibModal', '$http', '$sce',
    function ($scope, $uibModal, $http, $sce) {
        var currentActiveTab = 1;
        $scope.dataEmail = {
            name: "",
            phone: "",
            email: "",
            question: "",
            description: ""
        };

        $scope.photos = [
            "/img/photos/1.jpg",
            "/img/photos/2.jpg",
            "/img/photos/3.jpg",
            "/img/photos/4.jpg",
            "/img/photos/5.jpg",
            "/img/photos/6.jpg",
            "/img/photos/7.jpg",
            "/img/photos/8.jpg",
            "/img/photos/9.jpg",
            "/img/photos/10.jpg",
            "/img/photos/11.jpg",
            "/img/photos/12.jpg",
            "/img/photos/13.jpg",
            "/img/photos/14.jpg",
            "/img/photos/15.jpg",
            "/img/photos/16.jpg",
            "/img/photos/17.jpg",
            "/img/photos/18.jpg",
            "/img/photos/19.jpg",
            "/img/photos/20.jpg",
            "/img/photos/21.jpg",
            "/img/photos/22.jpg",
            "/img/photos/23.jpg",
            "/img/photos/24.jpg",
            "/img/photos/25.jpg",
            "/img/photos/26.jpg"
        ];

        $scope.limitPhotos = 16;

        $scope.videos = [
            {
                url: $sce.trustAsResourceUrl("https://www.youtube.com/embed/Lohbm_pVqeU"),
                description: "«У Анатолия была сложная и нестандартная идея. Было много ограничений и «подводных" +
                " камней». Но не смотря на это, всё было реализовано до мельчайших деталей»",
                author: "Иван Иванкевич, дизайнер ЧП «Алсток»",
                param1: "Площадь: 16м2;",
                param2: "Сроки выполнения: 11 дней;",
                param3: "Материалы отделки: стекло, белый мрамор;"
            },
            {
                url: $sce.trustAsResourceUrl("https://www.youtube.com/embed/opWtf7IR4wY"),
                description: "«У Анатолия была сложная и нестандартная идея. Было много ограничений и «подводных" +
                " камней». Но не смотря на это, всё было реализовано до мельчайших деталей»",
                author: "Иван Иванкевич, дизайнер ЧП «Алсток»",
                param1: "Площадь: 16м2;",
                param2: "Сроки выполнения: 11 дней;",
                param3: "Материалы отделки: стекло, белый мрамор;"
            },
            {
                url: $sce.trustAsResourceUrl("https://www.youtube.com/embed/5Nk5kj0k5Kw"),
                description: "«У Анатолия была сложная и нестандартная идея. Было много ограничений и «подводных" +
                " камней». Но не смотря на это, всё было реализовано до мельчайших деталей»",
                author: "Иван Иванкевич, дизайнер ЧП «Алсток»",
                param1: "Площадь: 16м2;",
                param2: "Сроки выполнения: 11 дней;",
                param3: "Материалы отделки: стекло, белый мрамор;"
            }
        ];

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