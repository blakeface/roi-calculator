'use strict';

(function () {
  const dependencies = ['ngStorage'];

  angular
  .module('roi', dependencies)
  .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$localStorage'];
  function MainCtrl($scope, $localStorage) {
    let vm = this;

    if ($localStorage.revItems) {
      vm.revenueItems = $localStorage.revItems
    } else {
      vm.revenueItems = [
        {single: '636.02', monthly: '300'},
        {single: '539.25', monthly: '250'},
        {single: '200.99', monthly: '100'},
      ];
    }

    if ($localStorage.expItems) {
      vm.expenseItems = $localStorage.expItems
    } else {
      vm.expenseItems = [
        {single: '79.92', monthly: '75'},
        {single: '103.22', monthly: '105'},
      ];
    }

    calculate(vm.revenueItems, 'revenue');
    calculate(vm.expenseItems, 'expense');
    profitCalculation();

    vm.add = function (item) {
      let newItem = {single: 0, monthly: 0};
      if (item.single) newItem.single = item.single;
      if (item.monthly) newItem.monthly = item.monthly;
      if (item.$name === 'newRevenue') {
        vm.revenueItems.push(newItem);
        $scope.newRevenue.$setPristine();
        $scope.newRevenue.single = $scope.newRevenue.monthly = null;
        $localStorage.revItems = vm.revenueItems;
        calculate(vm.revenueItems, 'revenue');
      }
      else {
        vm.expenseItems.push(newItem);
        $scope.newExpense.$setPristine();
        $scope.newExpense.single = $scope.newExpense.monthly = null;
        $localStorage.expItems = vm.expenseItems;
        calculate(vm.expenseItems, 'expense');
      }
    };

    vm.remove = function (item, i) {
      if (item.$name === 'newRevenue') {
        vm.revenueItems.splice(i, 1);
        $localStorage.revItems = vm.revenueItems;
        calculate(vm.revenueItems, 'revenue');
      }
      else {
        vm.expenseItems.splice(i, 1);
        $localStorage.expItems = vm.expenseItems;
        calculate(vm.expenseItems, 'expense');
      }
    };

    function calculate(item, id) {
      if (id === 'revenue') vm.revenueSingle = vm.revenueMonthly = vm.revenueTotal = 0;
      else vm.expenseSingle = vm.expenseMonthly = vm.expenseTotal = 0;
      for (let i = 0; i < item.length; i++) {
        if (id === 'revenue') {
          vm.revenueSingle += +item[i].single;
          vm.revenueMonthly += +item[i].monthly;
        }
        else {
          vm.expenseSingle += +item[i].single;
          vm.expenseMonthly += +item[i].monthly;
        }
      }
      vm.revenueTotal = vm.revenueSingle + (vm.revenueMonthly * 12);
      vm.expenseTotal = vm.expenseSingle + (vm.expenseMonthly * 12);
      profitCalculation();
    };

    function profitCalculation() {
      vm.profitsMonthly = vm.revenueMonthly - vm.expenseMonthly;
      vm.profitsTotal = vm.revenueTotal - vm.expenseTotal;
      vm.margin = (vm.profitsTotal / vm.revenueTotal) * 100;
      vm.roi = (vm.expenseSingle - vm.revenueSingle) / vm.profitsMonthly;
    };
  }
})();
