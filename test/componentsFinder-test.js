/**
 * Created by cashsun on 2016/10/19.
 */
const chai = require('chai');
const expect = chai.expect;
const path = require('path');
const componentFinder = require('../componentsFinder');
const _ = require('lodash');

describe('componentsFinder', () => {
    it('finds all components', () => {
        const components = componentFinder.find(path.join(__dirname, 'sample'));

        expect(_.values(components)).to.deep.equal([
            {
                displayName: "aComponent",
                path: path.join(__dirname, "sample/aComponent.js")
            },
            {
                displayName: "PureComponent",
                path: path.join(__dirname, "sample/common/PureComponent.js")
            },
            {
                displayName: "component-3",
                path: path.join(__dirname, "sample/common/component-3.js")
            },
            {
                displayName: "component2",
                path: path.join(__dirname, "sample/common/component2.js")
            }
        ]);
    });


    it('finds all pure components', () => {
        const components = componentFinder.findPureComponents(path.join(__dirname, 'sample'));
        expect(_.values(components)).to.deep.equal([
            path.join(__dirname, "sample/common/PureComponent.js")
        ]);
    });


});