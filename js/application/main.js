var application = angular
    .module('kanalyzerApp', ['ui.router', 'ui.bootstrap', 'nvd3', 'ui-notification'])
    .decorator('$window', function ($delegate) {
        Object.defineProperty($delegate, 'history', {
            get: function () {
                return null;
            }
        });
        return $delegate;
    });
