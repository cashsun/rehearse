/**
 * Created by cashsun on 2016/10/19.
 */
const chai = require('chai');
const expect = chai.expect;
const path = require('path');
const componentFinder = require('../componentsFinder');

describe('componentsFinder', ()=> {
    it('finds all components', () => {
        const components = componentFinder.find(path.join(__dirname, 'sample'));
        expect(components).to.deep.equal({
            "PureComponent": "/Users/cashsun/Desktop/github/rehearse/test/sample/common/PureComponent.js",
            "aComponent": "/Users/cashsun/Desktop/github/rehearse/test/sample/aComponent.js",
            "component2": "/Users/cashsun/Desktop/github/rehearse/test/sample/common/component2.js",
            "component3": "/Users/cashsun/Desktop/github/rehearse/test/sample/common/component3.js"
        });
    });

    it('finds all pure components', () => {
        const components = componentFinder.findPureComponents(path.join(__dirname, 'sample'));
        expect(components).to.deep.equal({
            "PureComponent": "/Users/cashsun/Desktop/github/rehearse/test/sample/common/PureComponent.js"
        });
    });
});