angular.module('todoApp', ['ui.router'])
    .controller('appController', function ($scope, $http, $window) {

        $scope.input_data = {};

        $scope.user_data ;
        $scope.selected_course ;
        $scope.courses ;
        $scope.search ;
        $scope.course_section ;
        $scope.registered_section = [];
        $scope.export_registered = [];

        // $scope.course = {"A", "B", "C"};

        $http({
            method: "GET",
            url: "http://52.37.98.127:3000/v1/5610545676?pin=0666"
        }).then(function success (response) {
            // var result = response.data;
            $scope.user_data = response.data;
        });

        // $http({
        //     method: "GET",
        //     url: "json/skecourses-gh-pages/list.json"
        // }).then(function success (data) {
        //     // var result = response.data;
        //     console.log(data);
        // });

        // Sections for Selected course

        $http({
            method: "GET",
            url: "https://whsatku.github.io/skecourses/combined.json"
        }).then(function success (response) {
            // var result = response.data;
            $scope.courses = $.map(response.data, function(value, index) {return [value];})
            // $scope.user_data = response.data;
        });

        $scope.login_submit = function(datas) {
            // $scope.datas.push($scope.input_data);
            // console.log($scope.datas[0].id);
            // console.log('yes');
            // console.log($scope.user_data);

            if($scope.user_data.user.id == $scope.input_data.id
                && $scope.user_data.user.password == $scope.input_data.password)
                $window.location.href = 'main.html';
            else
                alert('wrong');
        };

        $scope.export_json = function () {
            console.log('export_json');
            $scope.export_registered = $scope.registered_section.slice(0);
            if (!$scope.export_registered) {
                console.error('No data');
                return;
            }
            // if (!filename) {
            //   filename = 'download.json';
            // }

            if (typeof $scope.export_registered === 'object') {
                $scope.export_registered = JSON.stringify($scope.registered_section, undefined, 2);
            }

            var blob = new Blob([$scope.export_registered], {type: 'text/json'}),
                e = document.createEvent('MouseEvents'),
                a = document.createElement('a');

            a.download = 'enrollment.json';
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initEvent('click', true, false, window,
                0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        };

        $scope.register_section = function(course) {
            $scope.registered_section.push(course);
        }

        $scope.drop_course = function(course){
            console.log(course)
            $scope.registered_section.splice($scope.registered_section.indexOf(course), 1);
        }

        $scope.select_enroll = function(course) {
            $scope.selected_course = course;
            $http({
                method: "GET",
                url: "https://whsatku.github.io/skecourses/sections/"+$scope.selected_course.id+".json"
            }).then(function success (response) {
                $scope.course_section = response.data;
            });
        }

        $scope.test_click = function() {
            // console.log('yah');
            $window.location.href = 'profile.html';
        };
    });