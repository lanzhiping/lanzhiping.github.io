function Ctrl(dataService) {
    const self = this;

    self.info = dataService.info;
    self.infoTitle = 'ABOUT ME';
}

module.exports = ['personInfoService', Ctrl];
