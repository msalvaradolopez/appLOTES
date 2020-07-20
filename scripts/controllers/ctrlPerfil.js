angular.module("appLotes")
    .controller('ctrlPerfil', ['$scope', '$http', 'fcGeneral', '$q', '$location', '$state', '$stateParams', '$window',
        function ($scope, $http, fcGeneral, $q, $location, $state, $stateParams, $window) {

            $scope.valorBusqueda = "";
            $scope.perfilListado = [];

            $scope.configuraMenu = {};

            $scope.menuListado = [];

            $scope.opcionesMenu = [{ orden: 1, idMenu: "movimientos", nombre: "Movimientos E/S" },
            { orden: 2, idMenu: "kardex", nombre: "Kadex de Lotes" },
            { orden: 3, idMenu: "ventas", nombre: "Consultas de VENTAS" },
            { orden: 4, idMenu: "inventario", nombre: "Inventario" },
            { orden: 5, idMenu: "etiquetas", nombre: "Etiquetas" },
            { orden: 6, idMenu: "perfil", nombre: "Perfiles" },
            { orden: 7, idMenu: "usuarios", nombre: "Usuarios" }];

            $scope.perfil = {
                IDROL: "",
                NOMBRE: "",
                ESTATUS: ""
            };

            $scope.menuPerfil = {
                IDROL: "",
                ORDEN: 0,
                IDMENU: "",
                NOMBRE: "",
                ESTATUS: ""
            };

            $scope.listadoPerfiles = function () {
                var params = {};
                params.valorBuscar = $scope.valorBusqueda;

                fcGeneral.custom("getPerfiles", params)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);

                        $scope.perfilListado = [];
                        $scope.perfilListado = obj;
                        $scope.perfilListado.forEach(item => {
                            item.ESTATUS = "";
                        });

                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);
                    });
            }

            $scope.aceptarPerfil = function (perfil) {

                if (perfil.IDROL == "" || perfil.NOMBRE == "") {
                    alertify.alert("Debe de capturar la clave del Perfil o Descripción.");
                    return;
                }

                if (perfil.ESTATUS == "E" || perfil.ESTATUS == "N") {
                    var params = {};
                    params.IDROL = perfil.IDROL;
                    params.NOMBRE = perfil.NOMBRE;

                    fcGeneral.custom("setPerfil", params)
                        .success(function (data, status) {
                            var obj = jQuery.parseJSON(data);

                            $scope.resp = obj;

                            if ($scope.resp.codigo == -1) {
                                alertify.error($scope.resp.mensaje);
                            } else {
                                alertify.success("Pefil se agregó exitosamente.");
                                perfil.ESTATUS = "";
                            }

                        })
                        .error(function (data, status) {
                            alertify.error(data.mensaje);
                        });

                }


            }


            $scope.agregarPerfil = function () {
                var enEdicionSiNO = false;
                $scope.perfilListado.forEach(partida => {
                    if (partida.ESTATUS == "E" || partida.ESTATUS == "N") {
                        enEdicionSiNO = true;
                    }
                });

                if (enEdicionSiNO) {
                    // $scope.modalAlert("Existen partidas en edición o nuevo ingreso.")
                    alertify.alert("Existen partidas en edición o nuevo ingreso.");
                    return;
                }

                $scope.perfil.ESTATUS = "N";
                $scope.perfil.IDROL = "";
                $scope.perfil.NOMBRE = "";
                $scope.perfilListado.push($scope.perfil);

            }

            $scope.editarPerfil = function (perfil) {

                var enEdicionSiNo = false;
                $scope.perfilListado.forEach(partida => {
                    if (partida.ESTATUS == "E" || partida.ESTATUS == "N") {
                        enEdicionSiNo = true;
                    }
                });

                if (enEdicionSiNo) {
                    // $scope.modalAlert("Existen partidas en edición o nuevo ingreso.")
                    alertify.alert("Existen partidas en edición o nuevo ingreso.");
                    return;
                }

                perfil.ESTATUS = "E";

            }

            $scope.borrarPerfil = function (perfil) {
                if (perfil.ESTATUS == "N") {
                    var index = $scope.perfilListado.findIndex(partida => partida.ESTATUS == "N");
                    $scope.perfilListado.splice(index, 1);
                    return;
                }

                var params = {};
                params.IDROL = perfil.IDROL;
                params.NOMBRE = perfil.NOMBRE;

                fcGeneral.custom("delPerfil", params)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);

                        $scope.resp = obj;

                        if ($scope.resp.codigo == -1) {
                            alertify.error($scope.resp.mensaje);
                        } else {
                            alertify.success($scope.resp.mensaje);
                            $scope.listadoPerfiles();
                        }

                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);
                    });



            }

            /// ***** FUNCIONES PARA USAR CON MENU

            $scope.abrirMenuPerfil = function (perfil) {

                $scope.configuraMenu.IDROL = perfil.IDROL;
                $scope.configuraMenu.NOMBRE = perfil.NOMBRE;

                $scope.getPerfilMenu();

                $('#listadoMenu').modal({ show: true });
            };

            $scope.cerrarMenuPerfil = function () {
                $('#listadoMenu').modal("hide");
            };

            $scope.getPerfilMenu = function () {
                var params = {};
                params.valorBuscar = $scope.configuraMenu.IDROL;
                $scope.menuListado = [];

                fcGeneral.custom("getPerfilMenu", params)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);

                        $scope.menuListado = obj;
                        $scope.menuListado.forEach(item => {
                            item.ESTATUS = "";
                        });

                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);
                    });
            };

            $scope.agregarMenu = function () {

                var index = $scope.menuListado.findIndex(partida => partida.ESTATUS == "N");
                if (index > 0) {
                    alertify.alert("Existen partidas sin guardar.");
                    return;
                }

                $scope.menuPerfil = {};
                $scope.menuPerfil.IDROL = $scope.configuraMenu.IDROL;
                $scope.menuPerfil.ORDEN = 0;
                $scope.menuPerfil.IDMENU = "";
                $scope.menuPerfil.NOMBRE = "";
                $scope.menuPerfil.ESTATUS = "N";
                $scope.menuListado.push($scope.menuPerfil);
            };

            $scope.cambioMenu = function (menu) {
                var index = $scope.opcionesMenu.findIndex(partida => partida.idMenu == menu.IDMENU);
                menu.NOMBRE = $scope.opcionesMenu[index].nombre;
                menu.ORDEN = $scope.opcionesMenu[index].orden;
            };

            $scope.aceptarPerfilMenu = function (menu) {
                if (menu.ESTATUS == "N") {

                    // valida que no exista el registro.
                    var existeSINo = false;

                    $scope.menuListado.forEach(item => {
                        if (item.IDMENU == menu.IDMENU && item.ESTATUS == "") {
                            existeSINo = true;
                        }
                    });

                    if (existeSINo) {
                        alertify.alert("Debe de capturar diferentes opciones.");
                        return;
                    }

                    var params = {};
                    params.IDROL = menu.IDROL;
                    params.ORDEN = menu.ORDEN;
                    params.IDMENU = menu.IDMENU;
                    params.NOMBRE = menu.NOMBRE;

                    fcGeneral.custom("setPerfilMenu", params)
                        .success(function (data, status) {
                            var obj = jQuery.parseJSON(data);

                            $scope.resp = obj;

                            if ($scope.resp.codigo == -1) {
                                alertify.error($scope.resp.mensaje);
                            } else {
                                alertify.success($scope.resp.mensaje);
                                menu.ESTATUS = "";
                            }

                        })
                        .error(function (data, status) {
                            alertify.error(data.mensaje);
                        });

                }
            };

            $scope.borrarPerfilMenu = function (menu) {
                if (menu.ESTATUS == "N") {
                    var index = $scope.menuListado.findIndex(partida => partida.ESTATUS == "N");
                    $scope.menuListado.splice(index, 1);
                    return;
                }

                var params = {};
                params.IDROL = menu.IDROL;
                params.IDMENU = menu.IDMENU;
                params.NOMBRE = menu.NOMBRE;

                fcGeneral.custom("delPerfilMenu", params)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);

                        $scope.resp = obj;

                        if ($scope.resp.codigo == -1) {
                            alertify.error($scope.resp.mensaje);
                        } else {
                            alertify.success($scope.resp.mensaje);
                            $scope.getPerfilMenu();
                        }

                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);
                    });


            };

            $scope.listadoPerfiles();

        }


    ]);
