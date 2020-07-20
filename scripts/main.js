"use strict";
var App = angular.module('appLotes', ['ngRoute',
    'ui.router',
    'ngGrid']);


App.config(function ($stateProvider) {
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: 'index.html',
            controller: 'MainController',
            id_menu: 'Index'
        })
        .state('movimientos', {
            url: "/movimientos",
            templateUrl: 'views/movimientos.html',
            controller: 'ctrlMovimientos',
            id_menu: 'movimientos'
        })
        .state('inventario', {
            url: "/inventario",
            templateUrl: 'views/inventario.html',
            controller: 'ctrlInventario',
            id_menu: 'inventario'
        })
        .state('kardex', {
            url: "/kardex",
            templateUrl: 'views/kardex.html',
            controller: 'ctrlKardex',
            id_menu: 'kardex'
        })
        .state('ventas', {
            url: "/ventas",
            templateUrl: 'views/ventas.html',
            controller: 'ctrlVentas',
            id_menu: 'ventas'
        })
        .state('etiquetas', {
            url: "/etiquetas",
            templateUrl: 'views/etiquetas.html',
            controller: 'ctrlEtiquetas',
            id_menu: 'etiquetas'
        }).state('perfil', {
            url: "/perfil",
            templateUrl: 'views/perfil.html',
            controller: 'ctrlPerfil',
            id_menu: 'perfil'
        }).state('usuarios', {
            url: "/usuarios",
            templateUrl: 'views/usuarios.html',
            controller: 'ctrlUsuarios',
            id_menu: 'usuarios'
        })
});

App.controller('AppController', ['$scope', '$rootScope', 'fcGeneral', '$routeParams', '$location', '$state',
    function ($scope, $rootScope, fcGeneral, $routeParams, $location, $state) {

        $scope.admin = "";
        $scope.usuario = "";
        $scope.opcionesMenu = [];
        /*
        $scope.opcionesMenu = [{idMenu : "movimientos", nombre : "Movimientos E/S"}, 
                                {idMenu : "kardex", nombre : "Kadex de Lotes"}, 
                                {idMenu : "ventas", nombre : "Consultas de VENTAS"},
                                {idMenu : "inventario", nombre : "Inventario"},
                                {idMenu : "etiquetas", nombre : "Etiquetas"},
                                {idMenu : "usuarios", nombre : "Usuarios"}];
                                */

        //Angular-Translate ----------------------------------------------------------------------------------------------------------
        // Comprueba que ya existe un idioma cargado por default almacenado localmente en navegador
        window.onload = function () {
            //        if (!localStorage.idiomaCargado) {
            //            localStorage.setItem("idiomaCargado", "true");
            //            
            //            
            //        }


        }

        var param = {};
        param.valor = "";

        /*
        fcGeneral.custom('Seguridad', 'WSlogin', 'getNivelAcceso', param)
            .success(function (data, status) {
                var obj = jQuery.parseJSON(data.d);
                if (obj.dato != "") {
                    // alertify.success("Proveedor registrado con exito.");

                    $scope.admin = obj.dato;

                } else {
                    $scope.MostrarModal(obj.mensaje);
                }
            })
            .error(function (data, status) {
                $scope.MostrarModal(data.Message);
            });

            */
        $scope.onLoadPage = function () {

            $scope.usuario = sessionStorage.getItem("usuario");

            var params = {};
            params.valorBuscar = $scope.usuario;

            fcGeneral.custom("getMenuUsuario", params)
                .success(function (data, status) {
                    var obj = jQuery.parseJSON(data);
                    $scope.opcionesMenu = obj;
                    $location.url("/" + $scope.opcionesMenu[0].IDMENU);

                })
                .error(function (data, status) {
                    alertify.error(data.mensaje);
                });

        }

    }]);