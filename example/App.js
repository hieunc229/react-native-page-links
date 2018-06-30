import React, { Component } from 'react';

import {
  About,
  Home,
  Information,
  Main
} from './pages';

import PageContainer from '../pages';

export default class App extends Component {
  
  
  render() {
    
    let pageItems = [
      { component: About, title: 'about' },
      { component: Home, title: 'home' },
      { component: Information, title: 'info' }
    ];
    
    return (
      <PageContainer
        pages={pageItems}
        mainApp={Main}
      />
    );
  }
}