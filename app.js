'use strict';

(function () {
  const dependencies = [];

  angular
  .module('roi', dependencies)
  .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope']
  function MainCtrl($scope) {
    let vm = this;
    vm.revenueSingle = 0
    vm.revenueMonthly = 0;
    vm.revenueTotal = 0;

    vm.expenseSingle = 0;
    vm.expenseMonthly = 0;
    vm.expenseTotal = 0;

    vm.revenueItems = [
      {single: '636.02', monthly: '300'},
      {single: '539.25', monthly: '250'},
      {single: '200.99', monthly: '100'},
    ];
    vm.expenseItems = [
      {single: '79.92', monthly: '75'},
      {single: '103.22', monthly: '105'},
    ];

    vm.addRevenueItem = function () {
      let newRevenue = {};
      if ($scope.newRevenue.single) newRevenue.single = $scope.newRevenue.single;
      else newRevenue.single = 0;

      if ($scope.newRevenue.monthly) newRevenue.monthly = $scope.newRevenue.monthly;
      else newRevenue.monthly = 0;

      vm.revenueItems.push(newRevenue);
      $scope.newRevenue = {};
    }
    vm.addExpenseItem = function () {
      let newExpense = {};
      if ($scope.newExpense.single) newExpense.single = $scope.newExpense.single;
      else newExpense.single = 0;
      if ($scope.newExpense.monthly) newExpense.monthly = $scope.newExpense.monthly;
      else newExpense.monthly = 0;
      vm.expenseItems.push(newExpense);
      $scope.newExpense = {};
    }
    vm.removeRevenueItem = function (i) {
      vm.revenueItems.splice(i, 1);
    }
    vm.removeExpenseItem = function (i) {
      vm.expenseItems.splice(i, 1);
    }

    $scope.$watch('vm.revenueItems', function () {
      for (let i = 0; i < vm.revenueItems.length; i++) {
        vm.revenueSingle += +vm.revenueItems[i].single;
      }
      for (let i = 0; i < vm.revenueItems.length; i++) {
        vm.revenueMonthly += +vm.revenueItems[i].monthly;
      }
      vm.revenueTotal = vm.revenueSingle + vm.revenueMonthly;
      vm.profitsMonthly = vm.revenueMonthly - vm.expenseMonthly;
      vm.profitsTotal = vm.revenueTotal - vm.expenseTotal;
      vm.margin = vm.profitsTotal / vm.revenueTotal;
      vm.roi = (vm.expenseSingle - vm.revenueSingle) / vm.profitsMonthly;
    }, true);

    $scope.$watch('vm.expenseItems', function () {
      for (let i = 0; i < vm.expenseItems.length; i++) {
        vm.expenseSingle += +vm.expenseItems[i].single;
      }
      for (let i = 0; i < vm.expenseItems.length; i++) {
        vm.expenseMonthly += +vm.expenseItems[i].monthly;
      }
      vm.expenseTotal = vm.expenseSingle + vm.expenseMonthly;
      vm.profitsMonthly = vm.revenueMonthly - vm.expenseMonthly;
      vm.profitsTotal = vm.revenueTotal - vm.expenseTotal;
      vm.margin = vm.profitsTotal / vm.revenueTotal;
      vm.roi = (vm.expenseSingle - vm.revenueSingle) / vm.profitsMonthly;
    });
  }
})()
