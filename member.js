function skillsMember() {
  return {
    restrict: 'E',
    scope: {
      skills: '='
    },
    templateUrl: 'templates/member.html'
  };
}