'use strict';

var alstock = angular.module('alstockApp', ['ui.bootstrap']);

alstock.controller('AppCtrl', ['$scope', '$uibModal', '$http', '$sce', '$rootScope',
    function ($scope, $uibModal, $http, $sce, $rootScope) {
        var currentActiveTab = 1;
        $scope.dataEmail = {
            name: "",
            phone: "",
            email: "",
            question: "",
            description: ""
        };

        $rootScope.kitchenExample = "";

        $scope.photos = [
            "public/img/photos/1.jpg",
            "public/img/photos/2.jpg",
            "public/img/photos/3.jpg",
            "public/img/photos/4.jpg",
            "public/img/photos/5.jpg",
            "public/img/photos/6.jpg",
            "public/img/photos/7.jpg",
            "public/img/photos/8.jpg",
            "public/img/photos/9.jpg",
            "public/img/photos/10.jpg",
            "public/img/photos/11.jpg",
            "public/img/photos/12.jpg",
            "public/img/photos/13.jpg",
            "public/img/photos/14.jpg",
            "public/img/photos/15.jpg",
            "public/img/photos/16.jpg",
            "public/img/photos/17.jpg",
            "public/img/photos/18.jpg",
            "public/img/photos/19.jpg",
            "public/img/photos/20.jpg",
            "public/img/photos/21.jpg",
            "public/img/photos/22.jpg",
            "public/img/photos/23.jpg",
            "public/img/photos/24.jpg",
            "public/img/photos/25.jpg",
            "public/img/photos/26.jpg",
            "public/img/photos/27.jpg",
            "public/img/photos/28.jpg",
            "public/img/photos/29.jpg",
            "public/img/photos/30.jpg",
            "public/img/photos/31.jpg",
            "public/img/photos/32.jpg"
        ];

        $scope.limitPhotos = 16;

        $scope.videos = [
            {
                url: $sce.trustAsResourceUrl("https://www.youtube.com/embed/Lohbm_pVqeU"),
                description: "«У Екатерины была идея расположить кухню вдоль всех стен не смотря на существующий " +
                "нестандартный выступ. Предпочтения были учтены и в итоге получилась красивая, функциональная и " +
                "очень удобная кухня.»",
                author: "Иван Иванкевич, дизайнер ЧП «Алсток»",
                param1: "Площадь: 20м2;",
                param2: "Сроки выполнения: 2 недели;",
                param3: "Материалы отделки: ДСП, пластик, тонированное стекло в аллюминиевой раме;"
            },
            {
                url: $sce.trustAsResourceUrl("https://www.youtube.com/embed/opWtf7IR4wY"),
                description: "«Не смотря на ограниченность пространства и благодаря тому, что был задействован каждый" +
                " свободный сантиметр, кухню Елены удалось сделать максимально функциональной и органичной.»",
                author: "Иван Иванкевич, дизайнер ЧП «Алсток»",
                param1: "Площадь: 12м2;",
                param2: "Сроки выполнения: 2 недели;",
                param3: "Материалы отделки: ДСП, скинали из стекла;"
            },
            {
                url: $sce.trustAsResourceUrl("https://www.youtube.com/embed/5Nk5kj0k5Kw"),
                description: "«На кухне Ольги были \"подводные камни\" в виде не только счётчика газа, но и газового" +
                " котла. Не смотря на все сложности кухню получилась эстетически привлекательной и удобной в эксплуатации.»",
                author: "Иван Иванкевич, дизайнер ЧП «Алсток»",
                param1: "Площадь: 13м2;",
                param2: "Сроки выполнения: 11 дней;",
                param3: "Материалы отделки: ДСП, пластик;"
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
            $scope.open('public/html/return-call.html');
        };

        $scope.openExampleModal = function(desc, exUrl){
            $rootScope.kitchenExample = desc;
            $rootScope.kitchenExampleUrl = exUrl;
            $scope.open('public/html/want-this-kitchen.html');
        };

        $scope.openExampleModalVideo = function(desc, exUrl){
            $rootScope.kitchenExample = desc;
            $rootScope.kitchenExampleUrl = exUrl;
            $scope.open('public/html/want-this-kitchen-video.html');
        };

        $scope.sendEmail = function(desc){
            /*if(!$(".share").valid()){
                return false;
            }
            console.log($(".share").valid());*/
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
                    $scope.open('public/html/just-prompt-circle.html');
                },
                function(error){
                    $scope.dataEmail = {};
                    console.log("error");
                });
        };
    }]);

alstock.controller('ModalCtrl', ['$scope', '$http', '$uibModalInstance', '$rootScope',
    function ($scope, $http, $uibModalInstance, $rootScope) {
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
            $scope.data.description = $rootScope.kitchenExample ? $rootScope.kitchenExample : desc;
            var req = {
                method: 'POST',
                url: '/send-email?name=' + $scope.data.name + '&phone=' + $scope.data.phone +
                '&email=' + $scope.data.email + '&question=' + $scope.data.question +
                '&description=' + $scope.data.description
            };

            $http(req).then(
                function(data){
                    $scope.isSuccessSendEmail = true;
                    $("iframe").animate({ scrollTop: $("iframe").height() }, "slow");
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
            $rootScope.kitchenExample = "";
                $rootScope.kitchenExampleUrl = "";
            $uibModalInstance.dismiss('cancel');
        }
    }]);