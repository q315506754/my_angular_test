var homeModule = angular.module('homeModule', ['ngCookies']);
homeModule.controller("HomeCtrl",function ($scope, $http,$cookieStore) {
    $scope.pageIndex = 1;
});