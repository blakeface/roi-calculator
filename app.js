'use strict';

(function () {
  const dependencies = [];

  angular
    .module('roi', dependencies)
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = []
  function MainCtrl() {
    let vm = this;

    vm.revenueItems = [1,2,3];
    vm.expenseItems = [1,2];

    vm.delete = function () {};

    vm.addRevenue = function () {
      console.log(vm.revenue);
    };
    vm.addExpenses = function () {};
  }

})()
