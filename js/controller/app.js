angular.module('todoApp', ['ui.router'])
    .controller('appController', function ($scope, $http, $window) {

        $scope.input_data = {};

        $scope.user_data ;
        $scope.selected_course ;
        $scope.courses ;  // $scope.course = {"A", "B", "C"};
        $scope.search ;
        $scope.course_section ;
        $scope.registered_section = [];
        $scope.export_registered = [];
        

        // Sections for Selected course
        $http({
            method: "GET",
            url: "https://whsatku.github.io/skecourses/combined.json"
        }).then(function success (response) {
            $scope.courses = $.map(response.data, function(value, index) {return [value];})
        });

        $scope.login_submit = function(datas) {
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

        $scope.register_section = function(course, section) {
            var is_repeat = false;
            $scope.registered_section.forEach(function(x){
                if ( x.course.id == course.id && x.section.type == section.type){
                    is_repeat = true;
                }
            });
            if ( ! is_repeat ) {
                var registing_course = {course: course, section: section};
                $scope.registered_section.push(registing_course);
                var date = section.date.split(" ");
                var start_time = parseInt(date[1][0] + date[1][1]);
                var stop_time = parseInt(date[1][6] + date[1][7]);
                for (var i = 0 ; i < stop_time-start_time ; i++){
                    var table_id = date[0] + ("0" + (start_time + i)).slice(-2);
                    $('#'+table_id).addClass('danger');
                }

            }
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