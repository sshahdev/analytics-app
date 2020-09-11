import React from 'react';
import { shallow, mount } from 'enzyme';
import Analytics from './analytics';

import dashboardStore from '../store/index.js';


describe('Test App', () => {
  let component, appWrapper;
  beforeEach(()=>{
      component = mount(<Analytics />);
      appWrapper = component.find('Analytics');
  });

  it('should test Analytics component', () => {
    expect(appWrapper).toMatchSnapshot();
  });

  it('length', () => {
      expect(appWrapper).toHaveLength(1);
  }); 
})