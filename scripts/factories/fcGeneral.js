angular.module('appLotes').
factory('fcGeneral', ['$http'/*, '$translateProvider'*/, function($http, $translateProvider) {
    var fabrica = {};

    function wsGeneral(ctrlName, params) {
        var wsURL = 'http://localhost/lotesAPI/api/values/' + ctrlName;
        var head = { headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json, text/javascript, /;'} };
        if (params !== undefined) {
            var body = JSON.stringify(params);
            return $http.post(wsURL, body, head);
        }
        else {
            return $http.post(wsURL, head);
        }
    };


    //Custom
    fabrica.custom = function(ctrlName, params) {
        return wsGeneral(ctrlName, params);
    };

    return fabrica;
} ]);