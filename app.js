'use strict';

(function () {
  const dependencies = [];

  angular
    .module('roi', dependencies)
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope']
  function MainCtrl($scope) {
    let vm = this;

    vm.items = [1,2,3];
    vm.expenses = [1,2];

    vm.delete = function () {};

    vm.addRevenue = function () {};
    vm.addExpenses = function () {};
  }

})()
