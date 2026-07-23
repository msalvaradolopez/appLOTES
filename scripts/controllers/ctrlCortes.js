angular.module("appLotes")
    .controller('ctrlCortes', ['$scope', '$http', '$q', '$location', '$state', '$stateParams', '$filter',
        function ($scope, $http, $q, $location, $state, $stateParams, $filter) {

            $scope.loading = false;
            $scope.hasData = false;
            $scope.errorMessage = "";

            $scope.fechaInicio = new Date();
            $scope.fechaFin = new Date();
            $scope.searchTerm = "";

            $scope.tiposDisponibles = [
                { id: 'CA', label: 'CA', desc: 'Crédito', color: 'primary' },
                { id: 'SM', label: 'SM', desc: 'Salida Manual', color: 'info' },
                { id: 'ED', label: 'ED', desc: 'Entrada Devolución', color: 'warning' },
                { id: 'CR', label: 'CR', desc: 'Contado', color: 'success' },
                { id: 'NC', label: 'NC', desc: 'Nota Crédito', color: 'danger' },
                { id: 'SX', label: 'SX', desc: 'Salida Mercancía', color: 'secondary' },
                { id: 'S',  label: 'S',  desc: 'Traspaso Salida', color: 'dark' },
                { id: 'X',  label: 'X',  desc: 'Traspaso SAP', color: 'dark' },
                { id: 'DX', label: 'DX', desc: 'Devolución Compra', color: 'danger' }
            ];
            $scope.tiposSeleccionados = {};
            $scope.tiposDisponibles.forEach(function(t) { $scope.tiposSeleccionados[t.id] = true; });

            $scope.pagination = {
                pageNumber: 1,
                pageSize: 50,
                totalRecords: 0,
                totalPages: 0
            };
            $scope.pageSizeOptions = [10, 20, 50, 100, 200];
            $scope.cortesListado = [];
            $scope.totalImporte = 0;

            $scope.getColorTipo = function(tipo) {
                var found = $scope.tiposDisponibles.find(function(t) { return t.id === tipo; });
                return found ? found.color : 'secondary';
            };

            $scope.getDescTipo = function(tipo) {
                var found = $scope.tiposDisponibles.find(function(t) { return t.id === tipo; });
                return found ? found.desc : tipo;
            };

            $scope.getTiposActivos = function() {
                var activos = [];
                angular.forEach($scope.tiposSeleccionados, function(val, key) {
                    if (val) activos.push(key);
                });
                return activos.length > 0 ? activos.join(',') : 'CA,SM,ED,CR,NC,SX,S,X,DX';
            };

            $scope.consultarCortes = function() {
                $scope.loading = true;
                $scope.errorMessage = "";
                $scope.cortesListado = [];
                $scope.hasData = false;

                var params = {
                    fechaInicio: $filter('date')($scope.fechaInicio, 'yyyy-MM-dd'),
                    fechaFin: $filter('date')($scope.fechaFin, 'yyyy-MM-dd'),
                    tiposSalida: $scope.getTiposActivos(),
                    pageNumber: $scope.pagination.pageNumber,
                    pageSize: $scope.pagination.pageSize,
                    searchTerm: $scope.searchTerm || ''
                };

                var wsURL = 'http://localhost/lotesAPI/api/v1/cortes/dia';
                $http.get(wsURL, { params: params })
                    .success(function (response) {
                        $scope.loading = false;
                        if (response.success && response.data) {
                            var d = response.data;
                            $scope.cortesListado = d.data || [];
                            $scope.pagination.totalRecords = d.totalRecords;
                            $scope.pagination.totalPages = d.totalPages;
                            $scope.pagination.pageNumber = d.pageNumber;
                            $scope.hasData = $scope.cortesListado.length > 0;

                            $scope.totalImporte = 0;
                            $scope.cortesListado.forEach(function(item) {
                                $scope.totalImporte += item.ImporteTotal;
                            });
                        } else {
                            $scope.errorMessage = response.message || 'Error al consultar cortes.';
                        }
                    })
                    .error(function (data, status) {
                        $scope.loading = false;
                        $scope.errorMessage = 'Error de conexión (' + status + ').';
                    });
            };

            $scope.cambiarPagina = function(page) {
                if (page < 1 || page > $scope.pagination.totalPages) return;
                $scope.pagination.pageNumber = page;
                $scope.consultarCortes();
            };

            $scope.cambioPageSize = function() {
                $scope.pagination.pageNumber = 1;
                $scope.consultarCortes();
            };

            $scope.limpiarFiltros = function() {
                $scope.fechaInicio = new Date();
                $scope.fechaFin = new Date();
                $scope.searchTerm = "";
                $scope.tiposDisponibles.forEach(function(t) { $scope.tiposSeleccionados[t.id] = true; });
                $scope.pagination.pageNumber = 1;
                $scope.consultarCortes();
            };

            $scope.irPagina = function() {
                if ($scope.irPaginaNum && $scope.irPaginaNum >= 1 && $scope.irPaginaNum <= $scope.pagination.totalPages) {
                    $scope.pagination.pageNumber = $scope.irPaginaNum;
                    $scope.consultarCortes();
                    $scope.irPaginaNum = null;
                }
            };

            $scope.verDetalle = function(corte) {
                alertify.alert('Corte: ' + corte.Folio + '<br>Tipo: ' + corte.TipoSalida +
                    '<br>Fecha: ' + corte.FechaHora + '<br>Usuario: ' + corte.Usuario +
                    '<br>Total: $' + corte.ImporteTotal.toFixed(2));
            };

            $scope.consultarCortes();
        }
    ]);
