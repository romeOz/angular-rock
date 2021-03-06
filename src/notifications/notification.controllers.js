angular
    .module('rock.notification.controllers', ['ui.bootstrap'])
    .controller('NotificationController', NotificationController);

NotificationController.$inject = ['$scope', 'notification'];
function NotificationController($scope, notification) {
    $scope.notifications = notification.getAll();
    $scope.merge = function (messages) {
        notification.merge(messages);
    };

    $scope.closeable = true;
    $scope.closeAlert = function (index) {
        notification.remove(index);
    };
}