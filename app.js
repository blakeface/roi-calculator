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

    vm.delete = function () {};

    vm.addRevenue = function () {
      for (let amount in vm.revenue.single)
        vm.revenueSingle += +vm.revenue.single[amount];
      for (let amount in vm.revenue.monthly)
        vm.revenueMonthly += +vm.revenue.monthly[amount];
      vm.revenueTotal = vm.revenueSingle + vm.revenueMonthly;
    };

    vm.addExpenses = function () {
      for (let amount in vm.expense.single)
        vm.expenseSingle += +vm.expense.single[amount];
      for (let amount in vm.expense.monthly)
        vm.expenseMonthly += +vm.expense.monthly[amount];
      vm.expenseTotal = vm.expenseSingle + vm.expenseMonthly;
    };

  }
})()
