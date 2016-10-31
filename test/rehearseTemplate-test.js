import React from 'react';
import 'react-addons-test-utils';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import path from 'path';
import fs from 'fs';
const rehearseTemplate = require('../rehearseTemplates');
const componentFinder = require('../componentsFinder');
const testOutput = path.join(__dirname, 'rehearse-viewer.js');
import componentA from './sample/aComponent';
import component2 from './sample/common/component2';
const sampleComponents = componentFinder.find(path.join(__dirname, 'sample'));
import testProps from './sample/props';
const propsFile = path.join(__dirname, 'sample/props.js');


describe('rehearse viewer', ()=> {

    beforeEach(()=> {
        rehearseTemplate.buildViewerPage(testOutput, sampleComponents, propsFile)
    });

    afterEach(()=> {
        window.target = '';
        window.scenario = '';
        delete require.cache[testOutput];
        fs.unlinkSync(testOutput);
    });


    it('renders list of available components when no target component selected', () => {
        const Viewer = require(testOutput).default;
        const viewerProps = require(testOutput).viewerProps;
        const wrapper = shallow(<Viewer {...viewerProps}/>);

        console.log(wrapper.text());

        expect(wrapper.find('a')).to.have.lengthOf(4);

        expect(wrapper.find('a').at(0).prop('href')).to.equal('/view/aComponent');
        expect(wrapper.find('a').at(0).text()).to.equal('aComponent');

        expect(wrapper.find('a').at(1).prop('href')).to.equal('/view/PureComponent');
        expect(wrapper.find('a').at(1).text()).to.equal('PureComponent');

        expect(wrapper.find('a').at(2).prop('href')).to.equal('/view/component2');
        expect(wrapper.find('a').at(2).text()).to.equal('component2');

        expect(wrapper.find('a').at(3).prop('href')).to.equal('/view/component3');
        expect(wrapper.find('a').at(3).text()).to.equal('component3');

    });

    it('renders error and list of available components when no target props found', () => {
        window.target = 'component3';
        const Viewer = require(testOutput).default;
        const viewerProps = require(testOutput).viewerProps;
        const wrapper = shallow(<Viewer {...viewerProps}/>);

        expect(wrapper.text()).contains('Error: you have not given props ' +
            'for the component component3 in your props file');

        expect(wrapper.find('a')).to.have.lengthOf(4);

        expect(wrapper.find('a').at(0).prop('href')).to.equal('/view/aComponent');
        expect(wrapper.find('a').at(0).text()).to.equal('aComponent');

        expect(wrapper.find('a').at(1).prop('href')).to.equal('/view/PureComponent');
        expect(wrapper.find('a').at(1).text()).to.equal('PureComponent');

        expect(wrapper.find('a').at(2).prop('href')).to.equal('/view/component2');
        expect(wrapper.find('a').at(2).text()).to.equal('component2');

        expect(wrapper.find('a').at(3).prop('href')).to.equal('/view/component3');
        expect(wrapper.find('a').at(3).text()).to.equal('component3');

    });

    it('renders error and list of available components when no target scenario found', () => {
        window.target = 'aComponent';
        window.scenario = 'does-not-exist';
        const Viewer = require(testOutput).default;
        const viewerProps = require(testOutput).viewerProps;
        const wrapper = shallow(<Viewer {...viewerProps}/>);

        expect(wrapper.text()).contains('Error: you have not given props for the component aComponent' +
            ' in your props file');

        expect(wrapper.find('a').at(0).prop('href')).to.equal('/view/aComponent');
        expect(wrapper.find('a').at(0).text()).to.equal('aComponent');

        expect(wrapper.find('a').at(1).prop('href')).to.equal('/view/PureComponent');
        expect(wrapper.find('a').at(1).text()).to.equal('PureComponent');

        expect(wrapper.find('a').at(2).prop('href')).to.equal('/view/component2');
        expect(wrapper.find('a').at(2).text()).to.equal('component2');

        expect(wrapper.find('a').at(3).prop('href')).to.equal('/view/component3');
        expect(wrapper.find('a').at(3).text()).to.equal('component3');

    });

    it('renders aComponent when selected and shows scenarios', () => {
        window.target = 'aComponent';
        const Viewer = require(testOutput).default;
        const viewerProps = require(testOutput).viewerProps;
        const wrapper = shallow(<Viewer {...viewerProps}/>);

        console.log(wrapper.text());

        expect(wrapper.find(componentA)).to.have.lengthOf(1);
        expect(wrapper.find(componentA).props()).to.deep.equal(testProps.aComponent);


        expect(wrapper.text()).to.contain('scenarios:');
        expect(wrapper.find('a')).to.have.lengthOf(4);

        expect(wrapper.find('a').at(0).text()).to.equal('aComponent (default)');
        expect(wrapper.find('a').at(1).text()).to.equal('aComponent (s1)');

        expect(wrapper.find('a').at(2).text()).to.equal('How to setup scenarios?');
        expect(wrapper.find('a').at(2).prop('href')).to.equal('https://github.com/cashsun/rehearse/blob/master/example/props/props.js');

        expect(wrapper.find('a').at(3).text()).to.equal('<< back to list');
        expect(wrapper.find('a').at(3).prop('href')).to.equal('/all');

    });

    it('renders aComponent when selected with scenario and shows scenarios', () => {
        window.target = 'aComponent';
        window.scenario = 's1';
        const Viewer = require(testOutput).default;
        const viewerProps = require(testOutput).viewerProps;
        const wrapper = shallow(<Viewer {...viewerProps}/>);

        expect(wrapper.find(componentA)).to.have.lengthOf(1);
        expect(wrapper.find(componentA).props()).to.deep.equal(testProps.aComponent$s1);

        expect(wrapper.find('a').at(0).text()).to.equal('aComponent (default)');
        expect(wrapper.find('a').at(1).text()).to.equal('aComponent (s1)');

    });

    it('renders component2 when selected', () => {
        window.target = 'component2';
        const Viewer = require(testOutput).default;
        const viewerProps = require(testOutput).viewerProps;
        const wrapper = shallow(<Viewer {...viewerProps}/>);

        expect(wrapper.find(component2)).to.have.lengthOf(1);
        expect(wrapper.find(component2).props()).to.deep.equal(testProps.component2);

        expect(wrapper.find('a').at(0).text()).to.equal('component2 (default)');

    });
});