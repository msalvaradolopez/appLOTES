angular.module('appLotes').
factory('fcCortes', ['$http', function($http) {
    var fabrica = {};
    var baseURL = 'http://localhost/lotesAPI/api/v1/cortes/';

    fabrica.getCortesDelDia = function(params) {
        var head = { headers: { 'Accept': 'application/json, text/javascript, */*'} };
        return $http.get(baseURL + 'dia', { params: params, headers: head });
    };

    return fabrica;
}]);
