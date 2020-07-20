angular.module("appLotes")
    .controller('ctrlInventario', ['$scope', '$http', 'fcGeneral', '$q', '$location', '$state', '$stateParams',
        function ($scope, $http, fcGeneral, $q, $location, $state, $stateParams) {

            $scope.articulosListado = [];
            $scope.listadoLotes = [];
            $scope.lote = {
                IDMOV: 0,
                U_SO1_NUMEROARTICULO: "",
                NOMBRE: "",
                U_SO1_FOLIO: "",
                U_SO1_NUMPARTIDA: "",
                IDLOTE: "",
                ALMACEN: "",
                TIPOMOV: "",
                DOCTO: "",
                FECHADOC: "",
                SOCIO: "",
                VENDEDOR: "",
                CANTIDAD: 0,
                EXISTENCIA: "",
                UBICACION: "CARRETE",
                USUARIO_R1: "",
                USERID: "SUPERVISOR",
                FECHAMOV: "",
                CONS: 0,
                UNIDAD: "",
                ESTATUS: ""
            };

            $scope.valorBusqueda = "";
            $scope.Articulo = "";
            $scope.Nombre = "";
            $scope.Almacen = "";
            $scope.Existencia = 0;

            $scope.Ubicaciones = ["CARRETE", "DONA", "TRAMO"];

            $scope.valorRetorno = {};
            $scope.valorRetorno.codigo = 0;
            $scope.valorRetorno.mensaje = "";



            $scope.listadoArticulos = function () {
                var params = {};
                params.valorBuscar = $scope.valorBusqueda;

                fcGeneral.custom("catArticulos", params)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);
                        $scope.articulosListado = obj;

                        if ($scope.articulosListado.length <= 0) {
                            alertify.error("No existen artículos con la descripción.");
                        }

                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);
                    });

            }


            $scope.abrirListadoEntradas = function (articulo) {

                $scope.consultaListadoEntradas(articulo.Articulo);


                $scope.Articulo = articulo.Articulo;
                $scope.Nombre = articulo.Nombre;
                $scope.Existencia = articulo.Existencia;
                $scope.Almacen = articulo.Almacen;
                $('#listadoEntradas').modal({ show: true });

            }

            $scope.cerrarListadoEntradas = function () {
                $('#listadoEntradas').modal("hide");
            }

            $scope.consultaListadoEntradas = function (itemcode) {

                var params = {};
                params.valorBuscar = itemcode;


                fcGeneral.custom("getLotesPorArticulo", params)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);
                        $scope.listadoLotes = [];
                        $scope.listadoLotes = obj;
                        $scope.listadoLotes.forEach(lote => {
                            lote.ESTATUS = "";
                        });
                    })
                    .error(function (data, status) {
                        alertify.error(data);

                    });
            }

            $scope.agregarLote = function () {
                var enEdicionSiNO = false;
                $scope.listadoLotes.forEach(partida => {
                    if (partida.ESTATUS == "E" || partida.ESTATUS == "N") {
                        enEdicionSiNO = true;
                    }
                });

                if (enEdicionSiNO) {
                    // $scope.modalAlert("Existen partidas en edición o nuevo ingreso.")
                    alertify.alert("Existen partidas en edición o nuevo ingreso.");
                    return;
                }

                $scope.lote.ESTATUS = "N"
                $scope.lote.TIPOMOV = "10" // MOVIMIENTO DE INVENTARIO INICIAL.
                $scope.lote.U_SO1_NUMEROARTICULO = $scope.Articulo;
                $scope.lote.ALMACEN = $scope.Almacen;
                $scope.lote.NOMBRE = $scope.Nombre
                $scope.listadoLotes.push($scope.lote);
            }

            $scope.editarLote = function (lote) {
                var enEdicionSiNO = false;

                if (lote.CANTIDAD != lote.EXISTENCIA) {
                    // $scope.modalAlert("El lote presenta diferencia en existencia.")
                    alertify.alert("El lote presenta diferencia en existencia.");
                    return;
                }

                $scope.listadoLotes.forEach(partida => {
                    if (partida.ESTATUS == "E" || partida.ESTATUS == "N") {
                        enEdicionSiNO = true;
                    }
                });

                if (enEdicionSiNO) {
                    // $scope.modalAlert("Existen partidas en edición o nuevo ingreso.")
                    alertify.alert("Existen partidas en edición o nuevo ingreso.");
                    return;
                }

                lote.ESTATUS = "E";
            }

            $scope.aceptarLote = function (lote) {

                if (lote.ESTATUS == "") { return; }

                if (lote.ESTATUS == "N" || lote.ESTATUS == "E") {
                    if (!$scope.validaLote(lote)) { return; }
                }

                fcGeneral.custom("setLoteEntrada", lote)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);
                        $scope.valorRetorno = obj;

                        alertify.success($scope.valorRetorno.mensaje);
                        $scope.consultaListadoEntradas(lote.U_SO1_NUMEROARTICULO);

                    })
                    .error(function (data, status) {
                        alertify.error(data);

                    });

                lote.ESTATUS = "";

            }

            // valida existencias antes de aceptar.
            $scope.validaLote = function (lote) {

                if (lote.CANTIDAD <= 0) {
                    // $scope.modalAlert("Debe de capturar cantidad mayor a cero.")
                    alertify.alert("Debe de capturar cantidad mayor a cero");
                    return false;
                }
                var articuloExistencia = $scope.Existencia;
                var acumCantidades = 0;

                $scope.listadoLotes.forEach(lote => {
                    acumCantidades = acumCantidades + lote.CANTIDAD;
                });

                acumCantidades = parseFloat(acumCantidades).toFixed(2);

                if (acumCantidades > $scope.Existencia) {
                    // $scope.modalAlert("Las cantidades acpturadas totales son mayor a la existencia del artículo.");
                    alertify.alert("Las cantidades capturadas totales son mayor a la existencia del artículo.");
                    return false;
                }

                return true;
            }

            $scope.borrarLote = function (lote) {
                if (lote.ESTATUS == "N") {
                    var index = $scope.listadoLotes.findIndex(lote => lote.ESTATUS == "N");
                    $scope.listadoLotes.splice(index, 1);
                    return
                }

                if (lote.CANTIDAD != lote.EXISTENCIA) {
                    // $scope.modalAlert("El lote presenta diferencia en existencia.")
                    alertify.alert("El lote presenta diferencia en existencia.");
                    return;
                }

                lote.ESTATUS = "B"

                fcGeneral.custom("delLoteEntrada", lote)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);
                        $scope.valorRetorno = obj;

                        alertify.success($scope.valorRetorno.mensaje);
                        $scope.consultaListadoEntradas(lote.U_SO1_NUMEROARTICULO);
                    })
                    .error(function (data, status) {
                        console.log(data.mensaje);

                    });


            }

            /*DEFAULT*/
            $scope.modalAlert = function (message) {
                $('#modal-alert').modal();
                $("#modal-alert .modal-body").html('<span class="title">' + message + '</span>');
            };

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


            // $scope.listadoArticulos();



        }
    ]);