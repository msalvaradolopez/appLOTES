angular.module("appLotes")
    .controller('ctrlKardex', ['$scope', '$http', 'fcGeneral', '$q', '$location', '$state', '$stateParams', '$filter',
        function ($scope, $http, fcGeneral, $q, $location, $state, $stateParams, $filter) {


            $scope.KardexListado = [];
            $scope.valorBusqueda = "";
            $scope.fecha = new Date();

            $scope.valorRetorno = {};
            $scope.valorRetorno.codigo = 0;
            $scope.valorRetorno.mensaje = "";

            $scope.Ubicaciones = ["CARRETE", "DONA", "TRAMO"];
            $scope.tiposSalidas =  ["CA", "SM", "ED", "CR", "NC", "SX", "S", "X", "DX"];
            $scope.tiposEntradas = ["10", "DE", "EP", "EX", "FP", "EM", "RP", "E"];

            $scope.ctdAux = 0;

            $scope.listadoKardex = function () {
                var params = {};
                params.valorBuscar = $scope.valorBusqueda;
                params.fecha = $filter('date')($scope.fecha, 'dd/MM/yyyy');

                fcGeneral.custom("getKardex", params)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);
                        $scope.KardexListado = obj;

                        if ($scope.KardexListado.length <= 0) {
                            alertify.error("No existen lotes con la descripción.");
                        } else {
                            $scope.KardexListado.forEach(lote => {
                                lote.ESTATUS = "";
                            });
                        }

                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);
                    });

            }

            $scope.editarLote = function (lote) {

                var editarSiNo = true;
                $scope.ctdAux = 0;

                $scope.KardexListado.forEach(item => {
                    if (item.ESTATUS == "E") {
                        editarSiNo = false;
                    }
                });

                if (lote.EXISTENCIA <= 0) {
                    alertify.error("No se permite editar LOTES con existecias en CERO.");
                    return;
                }

                if (!editarSiNo) {
                    alertify.error("Existen lotes en estatus de edición.");
                } else {
                    if (lote.TIPOMOV == '99') {
                        alertify.error("No se permite editar LOTE cancelados.");
                    } else {
                        $scope.ctdAux = lote.ENTRADA;
                        lote.ESTATUS = "E";
                    }

                }


            }

            $scope.aceptarLote = function (lote) {

                if (lote.ESTATUS == "") { return; }

                lote.CANTIDAD = lote.ENTRADA;

                fcGeneral.custom("setLoteUbicacion", lote)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);
                        $scope.valorRetorno = obj;

                        if ($scope.valorRetorno.codigo == -1) {
                            alertify.error($scope.valorRetorno.mensaje);
                            lote.ENTRADA = $scope.ctdAux;
                        } else {
                            alertify.success($scope.valorRetorno.mensaje);
                        }

                    })
                    .error(function (data, status) {
                        lote.ENTRADA = $scope.ctdAux;
                        alertify.error(data);

                    });

                lote.ESTATUS = "";
            }

            $scope.borrarLote = function (lote) {

                var borrarSiNo = true;
                $scope.KardexListado.forEach(item => {
                    if (item.ESTATUS == "E") {
                        borrarSiNo = false;
                    }
                });

                if (!borrarSiNo) {
                    alertify.error("Existen lotes en estatus de edición.");
                    return;
                } else {
                    if (lote.TIPOMOV == '99') {
                        alertify.error("No se permite editar LOTE cancelados.");
                        return;
                    } else {
                        lote.ESTATUS = "B";
                    }
                }

                // ES ENTRADA
                var idxEntradas = $scope.tiposEntradas.indexOf(lote.TIPOMOV);
                if (idxEntradas > -1) {

                    fcGeneral.custom("delLoteEntrada", lote)
                        .success(function (data, status) {
                            var obj = jQuery.parseJSON(data);
                            $scope.valorRetorno = obj;

                            if ($scope.valorRetorno.codigo == -1) {
                                alertify.error($scope.valorRetorno.mensaje);
                            } else {
                                alertify.success($scope.valorRetorno.mensaje);
                                $scope.listadoKardex();
                            }

                        })
                        .error(function (data, status) {
                            alertify.error(data);

                        });

                } else {

                    fcGeneral.custom("delMovtoSalida", lote)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);
                        $scope.valorRetorno = obj;

                        if ($scope.valorRetorno.codigo == -1) {
                            alertify.error($scope.valorRetorno.mensaje);
                        } else {
                            alertify.success($scope.valorRetorno.mensaje);
                            $scope.listadoKardex();
                        }

                    })
                    .error(function (data, status) {
                        alertify.error(data);

                    });

                }


            }

            $scope.exportF = function () {
                var table = document.getElementById("export");
                var html = table.outerHTML;
                var url = 'data:application/vnd.ms-excel,' + escape(html); // Set your html table into url 

                const downloadLink = document.createElement("a");
                const fileName = "exportaXLSx.xls";

                downloadLink.href = url;
                downloadLink.target = '_blank';
                downloadLink.download = fileName;
                downloadLink.click();

                return false;
            };

        }
    ]);