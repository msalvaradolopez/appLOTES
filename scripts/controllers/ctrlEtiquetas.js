angular.module("appLotes")
    .controller('ctrlEtiquetas', ['$scope', '$http', 'fcGeneral', '$q', '$location', '$state', '$stateParams', '$window',
        function ($scope, $http, fcGeneral, $q, $location, $state, $stateParams, $window) {

            $scope.etiquetasListado = [];
            $scope.valorBusqueda = "";
            $scope.archivoPDF;

            $scope.listadoEtiquetas = function () {
                var params = {};
                params.valorBuscar = $scope.valorBusqueda;

                fcGeneral.custom("getLotesImprimir", params)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);
                        $scope.etiquetasListado = obj;

                        if ($scope.etiquetasListado.length <= 0) {
                            alertify.error("No existen LOTEs por imprimir con esa descripción.");
                        } else {
                            $scope.etiquetasListado.forEach(lote => {
                                if(lote.IMPRIMIR == "N") {
                                    lote.IMPRIMIRSINO = false;
                                } else {
                                    lote.IMPRIMIRSINO = true;
                                }
                            });
                        }

                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);
                    });

            }

            $scope.bajarArchivo = function () {
                var params = {};
                params.valorBuscar = $scope.valorBusqueda;

                $scope.etiquetasListado.forEach(lote => {
                    if(lote.IMPRIMIRSINO){
                        lote.IMPRIMIR = "S";
                    } else {
                        lote.IMPRIMIR = "N";
                    }
                });

                fcGeneral.custom("getPdfFile", $scope.etiquetasListado)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);
                        $scope.archivoPDF = obj.mensaje;
                        console.log($scope.archivoPDF);


                        // $window.open(`data:application/pdf;base64,${$scope.archivoPDF}`, '_blank');

                        
                        const linkSource = `data:application/pdf;base64,${$scope.archivoPDF}`;
                        const downloadLink = document.createElement("a");
                        const fileName = "etiquetas.pdf";
        
                        downloadLink.href = linkSource;
                        downloadLink.target = '_blank';
                        downloadLink.download = fileName;
                        downloadLink.click();
                        
                        $scope.listadoEtiquetas();
                    })
                    .error(function (data, status) {
                        alertify.error(data.mensaje);
                    });


            }

            $scope.listadoEtiquetas();


        }
    ]);
