﻿var app = angular.module('mobSocialApp', []);


app.directive('whenScrolled', function () {
    return function (scope, elm, attr) {
        var raw = elm[0];

        elm.bind('scroll', function () {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});


app.directive('contenteditable', function () {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            // view -> model
            elm.bind('keyup', function() {
                scope.$apply(function() {
                    ctrl.$setViewValue(elm.html());
                });
            });

            // model -> view
            ctrl.$render = function() {
                elm.html(ctrl.$viewValue);
            };

            // load init value from DOM
            //ctrl.$setViewValue(elm.html());
        }
    };
});


app.factory('dialogService', function () {
    return {
        open: function (elementId, minWidth, dialogButtons) {
            $('#' + elementId).dialog({
                minWidth: minWidth,
                buttons: dialogButtons
            });
            $('#' + elementId).dialog('open');
        }
    };
});

