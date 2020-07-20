angular.module("appLotes")
    .controller('ctrlLogin', ['$scope', '$http', 'fcGeneral', '$q', '$location', '$state', '$stateParams', '$window',
        function ($scope, $http, fcGeneral, $q, $location, $state, $stateParams, $window) {

            $scope.usuario = "";
            $scope.passw = "";

            $scope.getLogin = function () {
                if ($scope.usuario == "" || $scope.passw == "") {
                    alertify.error("Debe de capturar Usuario y Contraseña.");
                } else {
                    var params = {};
                    params.usuario = $scope.usuario;
                    params.passw = $scope.passw;

                    fcGeneral.custom("getLogin", params)
                        .success(function (data, status) {
                            var obj = jQuery.parseJSON(data);
                            $scope.mensaje = obj;

                            if ($scope.mensaje.codigo == -1) {
                                alertify.error($scope.mensaje.mensaje);
                            } else {
                                sessionStorage.setItem('usuario', $scope.usuario)
                                location.href = "index.html";
                            }

                        })
                        .error(function (data, status) {
                            alertify.error(data.mensaje);
                        });

                }
            }
        }
    ]);
