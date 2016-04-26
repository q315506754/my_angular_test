angular.module('directivesModule', [])
    .controller('DirectiveController',['$scope', function($scope) {
        $scope.customer = {
            name: 'Naomi',
            address: '1600 Amphitheatre'
        };
    }])
    .controller('DirectiveController2',['$scope', function($scope) {
        $scope.customer = {
            name: 'jiangli',
            address: 'shanghai'
        };
    }]).controller('DirectiveController3',['$scope', function($scope) {
        $scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
        $scope.igor = { name: 'Igor', address: '123 Somewhere' };
    }])
    .controller('DirectiveController4', ['$scope', function($scope) {
        $scope.format = 'M/d/yy h:mm:ss a';

        $scope.customer = {
            name: 'Naomi',
            address: '1600 Amphitheatre'
        };
    }])
    .controller('DirectiveController5', ['$scope', function($scope) {
        $scope.name = 'Tobias';
    }])
    .controller('DirectiveController6', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.name = 'Tobias';
        $scope.hideDialog = function () {
            $scope.dialogIsHidden = true;
            $timeout(function () {
                $scope.dialogIsHidden = false;
            }, 2000);
        };
    }])
    .directive('myCustomer', function() {
        return {
            template: 'Name: {{customer.name}} Address: {{customer.address}}'
        };
    }).directive('myCustomer2', function() {
        return {
            templateUrl: 'test/directives-part1.html'
        };
    }).directive('myCustomer3', function() {
        return {
            templateUrl: function(elem, attr){
                console.log(elem);
                console.log(attr);
                return 'test/directives-part-'+attr.type+'.html';
            }
        };
    }).directive('myCustomer4', function() {
        return {
            restrict: 'E',
            //transclude: true,
            scope: {
                customerInfo: '=info'//,
                //igor:'='
            },
            //template: '<div class="alert" ng-transclude></div>'
            template: 'Name: {{customerInfo.name}} Address: {{customerInfo.address}}Name: {{vojta.name}} Address: {{vojta.address}}'
            //templateUrl: 'test/directives-part1.html'
        };
    }).directive('myCustomer5', function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'test/directives-part-dialog.html'
        };
    })
    .directive('myCustomer6', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                'close': '&onClose'
            },
            templateUrl: 'test/directives-part-dialog-close.html'
        };
    })
    .directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {

        function link(scope, element, attrs) {
            var format,
                timeoutId;
            var i=0;
            function updateTime() {
                //console.log('i:'+i++);
                element.text(dateFilter(new Date(), format));
            }

            // start the UI update process; save the timeoutId for canceling
            timeoutId = $interval(function() {
                updateTime(); // update DOM
            }, 1000);


            scope.$watch(attrs.myCurrentTime, function(value) {
                format = value;
                updateTime();
            });

            element.on('$destroy', function() {
                $interval.cancel(timeoutId);
            });
        }

        return {
            template: 'Name: {{customer.name}} Address: {{customer.address}}',
            link: link
        };
    }]).directive('myDraggable', ['$document', function($document) {
        return function(scope, element, attr) {
            var startX = 0, startY = 0, x = 0, y = 0;

            element.css({
                position: 'relative',
                border: '1px solid red',
                backgroundColor: 'lightgrey',
                cursor: 'pointer'
            });

            element.on('mousedown', function(event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                element.css({
                    top: y + 'px',
                    left:  x + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }
        };
    }]).directive('myTabs', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function($scope) {
                var panes = $scope.panes = [];

                $scope.select = function(pane) {
                    angular.forEach(panes, function(pane) {
                        pane.selected = false;
                    });
                    pane.selected = true;
                };

                this.addPane = function(pane) {
                    if (panes.length === 0) {
                        $scope.select(pane);
                    }
                    panes.push(pane);
                };
            },
            templateUrl: 'test/directives-part-tabs.html'
        };
    })
    .directive('myPane', function() {
        return {
            require: '^myTabs',
            restrict: 'E',
            transclude: true,
            scope: {
                title: '@'
            },
            link: function(scope, element, attrs, tabsCtrl) {
                tabsCtrl.addPane(scope);
            },
            templateUrl: 'test/directives-part-pane.html'
        };
    });