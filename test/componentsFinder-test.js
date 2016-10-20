/**
 * Created by cashsun on 2016/10/19.
 */
const chai =  require('chai');
const expect = chai.expect;
const path = require('path');
const componentFinder = require('../componentsFinder');

describe('componentsFinder', ()=>{
   it('works', () =>{
       const components = componentFinder.find(path.join(__dirname, 'sample'));
       expect(components).to.deep.equal({
           "aComponent.js": "/Users/cashsun/Desktop/github/rehearse/test/sample/aComponent.js",
           "component2.js": "/Users/cashsun/Desktop/github/rehearse/test/sample/common/component2.js"
       });
   })
});