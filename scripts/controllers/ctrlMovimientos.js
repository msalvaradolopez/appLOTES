angular.module("appLotes")
    .controller('ctrlMovimientos', ['$scope', '$http', 'fcGeneral', '$q', '$location', '$state', '$stateParams', '$filter',
        function ($scope, $http, fcGeneral, $q, $location, $state, $stateParams, $filter) {

            $scope.fecha = new Date();
            $scope.movtosListado = [];
            $scope.listadoEntradas = [];
            $scope.listadoSalidas = [];
            $scope.etiquetasListado = [];
            $scope.articulosListado = [];
            $scope.movto = {};
            $scope.resumen = {};
            $scope.resumen.entradas = 0;
            $scope.resumen.salidas = 0;
            $scope.resumen.etiquetas = 0;
            $scope.resumen.articulos = 0;
            $scope.resumen.totalArticulos = 0;

            $scope.tiposSalidas = ["CA", "SM", "ED", "CR", "NC", "SX", "S", "X", "DX"];
            $scope.tiposEntradas = ["10", "DE", "EP", "EX", "FP", "EM", "RP", "E"];

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

            $scope.Ubicaciones = ["CARRETE", "DONA", "TRAMO"];

            $scope.valorRetorno = {};
            $scope.valorRetorno.codigo = 0;
            $scope.valorRetorno.mensaje = "";


            $scope.valorBusqueda = "";
            $scope.Articulo = "";
            $scope.Nombre = "";
            $scope.Cantidad = 0;
            $scope.Almacen = "";
            $scope.ctdLotes = 0;
            $scope.Unidad = "";


            $scope.consultaMovtosListado = function () {
                var params = {};
                params.valorBuscar = $scope.valorBusqueda;
                params.fecha = $filter('date')($scope.fecha, 'dd/MM/yyyy');

                fcGeneral.custom("getMovtosEntSal", params)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);
                        $scope.movtosListado = obj;

                        if ($scope.movtosListado.length <= 0) {
                            alertify.error("No existen movimientos con la descripción.");
                        }

                        // funciones para acumular los valores del resumen.
                        $scope.ctdEntradasSalidas();
                        $scope.listadoEtiquetas();
                        $scope.listadoArticulos();

                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);

                    });
            }

            // se debe de detectar que tipo de movimiento corresponde a la modal : ENTRADAS  / SALIDAS
            $scope.abrirEntradaSalida = function (movto) {

                // SALIDAS
                var index = $scope.tiposSalidas.findIndex(tipomov => tipomov == movto.U_SO1_TIPO);

                $scope.Articulo = movto.U_SO1_NUMEROARTICULO;
                $scope.Nombre = movto.U_SO1_DESCRIPCION;
                $scope.Cantidad = movto.CANTIDADVENTA;
                $scope.Almacen = movto.U_SO1_ALMACEN;
                $scope.Unidad = movto.UNIDAD;

                $scope.movto = movto;

                if (index > -1) {
                    $scope.abrirListadoSalidas(movto);
                } else {
                    // ENTRADAS
                    index = 0;
                    index = $scope.tiposEntradas.findIndex(tipomov => tipomov == movto.U_SO1_TIPO);
                    if (index > -1) {
                        $scope.abrirListadoEntradas(movto);
                    } else {
                        alertify.error("No existe tipo de movimiento, favor de contactar al administrador de sistemas.");
                    }

                }



            }


            $scope.abrirListadoSalidas = function (movto) {


                if ($scope.consultaListadoSalidas(movto)) {
                    $('#listadoSalidas').modal({ show: true });
                }


            }

            $scope.abrirListadoEntradas = function (movto) {


                if ($scope.consultaListadoEntradas(movto)) {
                    $('#listadoEntradas').modal({ show: true });
                }


            }

            $scope.consultaListadoSalidas = function (movto) {
                $scope.lote.U_SO1_NUMEROARTICULO = movto.U_SO1_NUMEROARTICULO;
                $scope.lote.U_SO1_NUMPARTIDA = movto.U_SO1_NUMPARTIDA;
                $scope.lote.U_SO1_FOLIO = movto.U_SO1_FOLIO;


                // SE OBTIENE LOS LOTES TIPO ENTRADAS CON EXISTENCIAS PARA DISPONERLOS COMO SALIDAS.
                fcGeneral.custom("getMovLotesSalidas", $scope.lote)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);
                        $scope.listadoSalidas = [];
                        $scope.listadoSalidas = obj;

                        if ($scope.listadoSalidas.length <= 0) {
                            alertify.error("No existen movimientos de salida.");
                        } else {
                            $scope.listadoSalidas.forEach(item => {
                                item.CANTIDAD = 0;
                            });
                        }
                        $scope.consultaCtdLotes(movto);
                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);

                    });

                return true;

            }

            $scope.consultaListadoEntradas = function (movto) {
                $scope.lote.U_SO1_NUMEROARTICULO = movto.U_SO1_NUMEROARTICULO;
                $scope.lote.U_SO1_NUMPARTIDA = movto.U_SO1_NUMPARTIDA;
                $scope.lote.U_SO1_FOLIO = movto.U_SO1_FOLIO;


                // SE OBTIENE LOS LOTES TIPO ENTRADAS CON EXISTENCIAS PARA DISPONERLOS COMO SALIDAS.
                fcGeneral.custom("getMovLotesEntradas", $scope.lote)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);
                        $scope.listadoEntradas = [];
                        $scope.listadoEntradas = obj;

                        if ($scope.listadoEntradas.length <= 0) {
                            alertify.error("No existen movimientos de entradas.");
                        } else {
                            $scope.listadoEntradas.forEach(item => {
                                item.ESTATUS = "";
                            });
                        }

                        $scope.consultaCtdLotes(movto);
                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);

                    });

                return true;

            }

            $scope.consultaCtdLotes = function (movto) {
                $scope.lote.U_SO1_NUMEROARTICULO = movto.U_SO1_NUMEROARTICULO;
                $scope.lote.U_SO1_NUMPARTIDA = movto.U_SO1_NUMPARTIDA;
                $scope.lote.U_SO1_FOLIO = movto.U_SO1_FOLIO;


                fcGeneral.custom("getMovExitencia", $scope.lote)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);
                        $scope.ctdLotes = obj.ctdLotes;

                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);

                    });

                return true;

            }

            $scope.cerrarListadoSalidas = function () {
                $('#listadoSalidas').modal("hide");
            }

            $scope.cerrarListadoEntradas = function () {
                $('#listadoEntradas').modal("hide");
            }

            $scope.aceptarSalida = function (salida) {



                if (salida.EXISTENCIA < salida.CANTIDAD) {
                    alertify.alert("La cantidad solictada es mayor a la existencia del lote.");
                    return;
                }

                if (salida.CANTIDAD == 0) {
                    alertify.alert("La cantidad solictada debe de ser mayo a 0.");
                    return;
                }

                if (!$scope.validaExistencias()) { return; }

                // ASIGNA VALORES DEL DOCUMENTO REFERENCIADO.
                salida.IDMOVORIGEN = salida.IDMOV;
                salida.IDMOV = 0;

                salida.U_SO1_NUMEROARTICULO = $scope.movto.U_SO1_NUMEROARTICULO;
                salida.U_SO1_FOLIO = $scope.movto.U_SO1_FOLIO;
                salida.U_SO1_NUMPARTIDA = $scope.movto.U_SO1_NUMPARTIDA;
                salida.TIPOMOV = $scope.movto.U_SO1_TIPO;
                salida.SOCIO = $scope.movto.SOCIO;
                salida.VENDEDOR = $scope.movto.VENDEDOR;
                salida.USUARIO_R1 = $scope.movto.USUARIO;
                salida.DOCTO = $scope.movto.U_SO1_FOLIO;


                fcGeneral.custom("setMovtoSalida", salida)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);
                        $scope.valorRetorno = obj;

                        alertify.success($scope.valorRetorno.mensaje);
                        $scope.consultaListadoSalidas(salida);

                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);

                    });

            }

            $scope.validaExistencias = function () {
                var ctdRequerida = 0;
                var ctdAcumLotes = 0;
                var isValidoExistencia = true;
                var isValidoCantidadCero = true;

                ctdRequerida = $scope.Cantidad - $scope.ctdLotes;

                $scope.listadoSalidas.forEach(salida => {
                    ctdAcumLotes = ctdAcumLotes + salida.CANTIDAD;
                    ctdAcumLotes = parseFloat(ctdAcumLotes).toFixed(2);
                    if (ctdAcumLotes > ctdRequerida) { isValidoExistencia = false; }
                    if (salida.CANTIDAD < 0) { isValidoCantidadCero = false; }
                });

                if (!isValidoExistencia) {
                    alertify.alert("La cantidad total por lotes es mayor a la cantidad requerida. ");
                }


                if (!isValidoCantidadCero) {
                    alertify.alert("Debe de capturar cantidades mayor a 0. ");
                }


                return isValidoExistencia == isValidoCantidadCero;
            }

            $scope.agregarLote = function () {
                var enEdicionSiNO = false;
                $scope.listadoEntradas.forEach(partida => {
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
                $scope.lote.TIPOMOV = $scope.movto.U_SO1_TIPO;
                $scope.lote.U_SO1_NUMEROARTICULO = $scope.Articulo;
                $scope.lote.ALMACEN = $scope.Almacen;
                $scope.lote.NOMBRE = $scope.Nombre

                $scope.lote.U_SO1_FOLIO = $scope.movto.U_SO1_FOLIO;
                $scope.lote.U_SO1_NUMPARTIDA = $scope.movto.U_SO1_NUMPARTIDA;
                $scope.lote.TIPOMOV = $scope.movto.U_SO1_TIPO;
                $scope.lote.SOCIO = $scope.movto.SOCIO;
                $scope.lote.VENDEDOR = $scope.movto.VENDEDOR;
                $scope.lote.USUARIO_R1 = $scope.movto.USUARIO;
                $scope.lote.DOCTO = $scope.movto.U_SO1_FOLIO;

                $scope.listadoEntradas.push($scope.lote);
            }

            $scope.editarEntrada = function (entrada) {
                var enEdicionSiNO = false;

                if (entrada.CANTIDAD != entrada.EXISTENCIA) {
                    // $scope.modalAlert("El lote presenta diferencia en existencia.")
                    alertify.alert("El lote presenta diferencia en existencia.");
                    return;
                }

                $scope.listadoEntradas.forEach(partida => {
                    if (partida.ESTATUS == "E" || partida.ESTATUS == "N") {
                        enEdicionSiNO = true;
                    }
                });

                if (enEdicionSiNO) {
                    // $scope.modalAlert("Existen partidas en edición o nuevo ingreso.")
                    alertify.alert("Existen partidas en edición o nuevo ingreso.");
                    return;
                }

                entrada.ESTATUS = "E";
            }

            $scope.aceptarEntrada = function (entrada) {

                if (entrada.ESTATUS == "") { return; }

                if (entrada.ESTATUS == "N" || entrada.ESTATUS == "E") {
                    if (!$scope.validaExistenciasEntrada()) { return; }
                }

                fcGeneral.custom("setMovLoteEntrada", entrada)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);
                        $scope.valorRetorno = obj;

                        alertify.success($scope.valorRetorno.mensaje);
                        $scope.consultaListadoEntradas(entrada);

                    })
                    .error(function (data, status) {
                        alertify.error(data);

                    });

                entrada.ESTATUS = "";

            }

            $scope.validaExistenciasEntrada = function () {
                var ctdRequerida = 0;
                var ctdAcumLotes = 0;
                var isValidoExistencia = true;
                var isValidoCantidadCero = true;

                ctdRequerida = $scope.Cantidad;

                $scope.listadoEntradas.forEach(entrada => {
                    ctdAcumLotes = ctdAcumLotes + entrada.CANTIDAD;
                    ctdAcumLotes = parseFloat(ctdAcumLotes).toFixed(2);
                    if (ctdAcumLotes > ctdRequerida) { isValidoExistencia = false; }
                    if (entrada.CANTIDAD < 0) { isValidoCantidadCero = false; }
                });

                if (!isValidoExistencia) {
                    alertify.alert("La cantidad total por lotes es mayor a la cantidad requerida. ");
                }


                if (!isValidoCantidadCero) {
                    alertify.alert("Debe de capturar cantidades mayor a 0. ");
                }


                return isValidoExistencia == isValidoCantidadCero;
            }

            $scope.borrarEntrada = function (lote) {
                if (lote.ESTATUS == "N") {
                    var index = $scope.listadoEntradas.findIndex(lote => lote.ESTATUS == "N");
                    $scope.listadoEntradas.splice(index, 1);
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
                        $scope.consultaListadoEntradas(lote);
                    })
                    .error(function (data, status) {
                        console.log(data.mensaje);

                    });


            }

            $scope.ctdEntradasSalidas = function () {
                // cuenta los movimientos de Entras y Salidas para mostrarlos en resumen.
                var entradas = 0;
                var salidas = 0;
                $scope.movtosListado.forEach(movto => {
                    if ($scope.tiposEntradas.indexOf(movto.U_SO1_TIPO) > -1) {
                        entradas = entradas + 1;
                    } else if ($scope.tiposSalidas.indexOf(movto.U_SO1_TIPO) > -1) {
                        salidas = salidas + 1;
                    }
                });
                $scope.resumen.entradas = entradas;
                $scope.resumen.salidas = salidas;

            }

            $scope.listadoEtiquetas = function () {
                var params = {};
                var etiquetas = 0;
                params.valorBuscar = "";

                fcGeneral.custom("getLotesImprimir", params)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);
                        $scope.etiquetasListado = obj;

                        if ($scope.etiquetasListado.length <= 0) {

                        } else {
                            $scope.etiquetasListado.forEach(lote => {
                                etiquetas = etiquetas + 1
                            });
                            $scope.resumen.etiquetas = etiquetas;
                        }

                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);
                    });

            }

            $scope.listadoArticulos = function () {
                var params = {};
                var articulos = 0;
                params.valorBuscar = "";

                fcGeneral.custom("catArticulos", params)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);
                        $scope.articulosListado = obj;

                        if ($scope.articulosListado.length <= 0) {

                        } else {
                            $scope.articulosListado.forEach(articulo => {
                                if (articulo.Existencia != articulo.Lotes) {
                                    articulos = articulos + 1
                                }
                            });
                            $scope.resumen.articulos = $scope.articulosListado.length - articulos;
                            $scope.resumen.totalArticulos = $scope.articulosListado.length;
                        }

                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);
                    });

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


            $scope.consultaMovtosListado();


        }
    ]);
