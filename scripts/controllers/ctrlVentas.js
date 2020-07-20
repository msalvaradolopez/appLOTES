angular.module("appLotes")
    .controller('ctrlVentas', ['$scope', '$http', 'fcGeneral', '$q', '$location', '$state', '$stateParams', '$window',
        function ($scope, $http, fcGeneral, $q, $location, $state, $stateParams, $window) {

            $scope.ventasListado = [];
            $scope.valorBusqueda = "";
            $scope.archivoPDF;

            $scope.listadoVentas = function () {
                var params = {};
                params.valorBuscar = $scope.valorBusqueda;

                fcGeneral.custom("getLotesVentas", params)
                    .success(function (data, status) {
                        var obj = jQuery.parseJSON(data);
                        $scope.ventasListado = obj;

                        if ($scope.ventasListado.length <= 0) {
                            alertify.error("No existen artículos controlados por LOTEs con esa descripción.");
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


        }
    ]);
