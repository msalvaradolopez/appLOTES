angular.module("appLotes")
    .controller('ctrlUsuarios', ['$scope', '$http', 'fcGeneral', '$q', '$location', '$state', '$stateParams', '$window',
        function ($scope, $http, fcGeneral, $q, $location, $state, $stateParams, $window) {

            $scope.valorBusqueda = "";
            $scope.usuarioListado = [];
            $scope.perfilListado = [];

            $scope.listadoUsuarios = function () {
                var params = {};
                params.valorBuscar = $scope.valorBusqueda;

                fcGeneral.custom("getUsuarios", params)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);

                        $scope.usuarioListado = [];
                        $scope.usuarioListado = obj;
                        $scope.usuarioListado.forEach(item => {
                            item.ESTATUS = "";
                        });

                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);
                    });
            };

            $scope.listadoPerfiles = function () {
                var params = {};
                params.valorBuscar = $scope.valorBusqueda;

                fcGeneral.custom("getPerfiles", params)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);

                        $scope.perfilListado = [];
                        $scope.perfilListado = obj;
                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);
                    });
            };

            $scope.editarUsuario = function (usuario) {
                var enEdicionSiNO = false;
                $scope.usuarioListado.forEach(partida => {
                    if (partida.ESTATUS == "E" || partida.ESTATUS == "N") {
                        enEdicionSiNO = true;
                    }
                });

                if (enEdicionSiNO) {
                    // $scope.modalAlert("Existen partidas en edición o nuevo ingreso.")
                    alertify.alert("Existen partidas en edición o nuevo ingreso.");
                    return;
                }

                usuario.ESTATUS = "E";
            };

            $scope.aceptarUsuario = function (usuario) {
                var params = {};
                params.CODE = usuario.CODE;
                params.IDROL = usuario.IDROL;
                params.PASSW = usuario.PASSW;

                fcGeneral.custom("setUsuario", params)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);

                        $scope.resp = obj;

                        if ($scope.resp.codigo == -1) {
                            alertify.error($scope.resp.mensaje);
                        } else {
                            alertify.success($scope.resp.mensaje);
                            usuario.ESTATUS = "";
                        }


                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);
                    });
            };

            $scope.borrarUsuario = function (usuario) {
                var params = {};
                params.CODE = usuario.CODE;
                params.IDROL = usuario.IDROL;

                fcGeneral.custom("delUsuario", params)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);

                        $scope.resp = obj;

                        if ($scope.resp.codigo == -1) {
                            alertify.error($scope.resp.mensaje);
                        } else {
                            alertify.success($scope.resp.mensaje);
                            usuario.ESTATUS = "";
                            $scope.listadoUsuarios();
                        }


                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);
                    });
            };

            $scope.listadoPerfiles();
            $scope.listadoUsuarios();

        }


    ]);
