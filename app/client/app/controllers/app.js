angular
  .module('meany', ['routerRoutes', 'serviceUsers'])
  .controller('homec', function(Users) {
    var vm = this;

    vm.content = 'This is the Home page!';
    Users
      .getUsers()
      .success(function(res) {
        if (res.success === true) {
          vm.users = res.data;
        }
      });
  })
  .controller('layoutc', function() {

    // bind this to vm (view-model)
    var vm = this;

    // define variables and objects on this
    // this lets them be available to our views
    // define a basic variable
    vm.message = 'Set jumbotron message';
    // define a list of items
    vm.computers = [
      {name: 'Macbook Pro', color: 'Silver', nerdness: 7},
      {name: 'Yoga 2 Pro', color: 'Gray', nerdness: 6},
      {name: 'Chromebook', color: 'Black', nerdness: 5}
    ];

    // information that comes from our form
    vm.computerData = {};
    vm.addComputer = function() {
      // add a computer to the list
      vm.computers.push({
        name: vm.computerData.name,
        color: vm.computerData.color,
        nerdness: vm.computerData.nerdness
      });
      // after our computer has been added, clear the form
      vm.computerData = {};
    };

  })

  .controller('aboutc', function() {
    var vm = this;
    vm.content = 'This is the About page!';
  })
  .controller('contactc', function() {
    var vm = this;
    vm.content = 'This is the Contact page!';
  })
  .controller('fourofourc', function() {
    var vm = this;
    vm.content = 'This is the 404 page!';
  });
