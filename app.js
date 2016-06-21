'use strict';

(function () {
  const dependencies = [];

  angular
  .module('roi', dependencies)
  .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope']
  function MainCtrl($scope) {
    let vm = this;

    vm.revenueItems = [{single: '400', monthly: '300'}];
    vm.expenseItems = [{single: '150', monthly: '75'}];

    vm.revenueSingle = 0;
    vm.revenueMonthly = 0;
    vm.revenueTotal = 0;

    vm.expenseSingle = 0;
    vm.expenseMonthly = 0;
    vm.expenseTotal = 0;

    vm.profitsMonthly = vm.revenueMonthly - vm.expenseMonthly;
    vm.profitsTotal = vm.revenueTotal - vm.expenseTotal;

    vm.margin = vm.profitsTotal / vm.revenueTotal;
    vm.roi = (vm.expenseSingle - vm.revenueSingle) / vm.profitsMonthly;

    vm.addRevenue = function () {
      let newRevenue = {};
      newRevenue.single = $scope.newRevenue.single;
      newRevenue.monthly = $scope.newRevenue.monthly;
      vm.revenueItems.push(newRevenue);
    }
    vm.addExpenseItem = function () {
      vm.expenseItems.push(vm.expenseItems.length + 1)
    }
    vm.removeRevenueItem = function (i) {
      if (vm.revenueItems.length > 1)
      vm.revenueItems.splice(i, 1);
    }
    vm.removeExpenseItem = function (i) {
      if (vm.expenseItems.length > 1)
      vm.expenseItems.splice(i, 1);
    }

    $scope.$watch(function(){
      for (let amount in vm.revenueSingle) {
        'vm.revenueSingle[amount]';
      }
    }, function (newValue) {
      vm.revenueSingle += newValue;
    });

    // vm.addRevenue = function () {
    //   for (let amount in vm.revenue.single)
    //     vm.revenueSingle += +vm.revenue.single[amount];
    //   for (let amount in vm.revenue.monthly)
    //     vm.revenueMonthly += +vm.revenue.monthly[amount];
    //   vm.revenueTotal = vm.revenueSingle + vm.revenueMonthly;
    // };
    //
    // vm.addExpenses = function () {
    //   for (let amount in vm.expense.single)
    //     vm.expenseSingle += +vm.expense.single[amount];
    //   for (let amount in vm.expense.monthly)
    //     vm.expenseMonthly += +vm.expense.monthly[amount];
    //   vm.expenseTotal = vm.expenseSingle + vm.expenseMonthly;
    // };

  }
})()
