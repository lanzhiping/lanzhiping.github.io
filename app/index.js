const angular = require('angular');
const parallaxDir = require('./parallaxDir');
const personInfoService = require('./personInfoView/personInfoService');
const personInfoCtrl = require('./personInfoView/personInfoCtrl');
const techStackService = require('./techStackView/techStackService');
const techStackCtrl = require('./techStackView/techStackCtrl');

require('./main.scss');

((angular) => {
    angular
        .module('app', [])
        .directive('parallax', parallaxDir)
        .service('personInfoService', personInfoService)
        .controller('personInfoCtrl', personInfoCtrl)
        .service('techStackService', techStackService)
        .controller('techStackCtrl', techStackCtrl);

})(angular);
