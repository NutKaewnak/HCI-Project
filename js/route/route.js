/**
 * Created by Nicole on 5/9/2016 AD.
 */
angular.module('todoApp')
    .config(function($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /home
        $urlRouterProvider.otherwise("/home");
        //
        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "view/home.tmpl"
            })
    });
