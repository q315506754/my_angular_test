angular.module('controllerModule', [])
    .controller('InvoiceController', ['currencyConverter','$scope', function(currencyConverter,$scope) {
        this.qty = 1;
        this.cost = 2;
        this.inCurr = 'EUR';
        this.currencies = currencyConverter.currencies;

        this.total = function total(outCurr) {
            return currencyConverter.convert(this.qty * this.cost, this.inCurr, outCurr);
        };
        this.pay = function pay() {
            window.alert("Thanks!");
        };
        console.log($scope);
        console.log(this);
    }]).controller('GreetController', ['$scope', '$rootScope', function($scope, $rootScope) {
        $scope.name = 'World';
        $rootScope.department = 'Angular';
    }])
    .controller('ListController', ['$scope', function($scope) {
        $scope.names = ['Igor', 'Misko', 'Vojta'];
    }]).controller('EventController', ['$scope', function($scope) {
    $scope.count = 0;
    $scope.$on('MyEvent', function() {
        $scope.count++;
    });
}]);