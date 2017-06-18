function TechStackCtrl(techStackService) {
    const self = this;

    self.techStack = techStackService.techStack;
    self.techStackTitle = "TECH STACK";
}

module.exports = ['techStackService', TechStackCtrl];
