import React from 'react';
import {
  Animated,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from 'react-native';

import Styles from './_styles';
import Page from './Page';

const { width, height } = Dimensions.get('window');

export default class PageContainer extends React.Component {
  
  state = { isHidden: false }
  _scale = new Animated.Value(1);
  _currentIndex = undefined;
  
  _renderPage = (page, index) => {
    return (
      <Page viewWidth={width} goBack={this._goBack} height={height} ref={ref => this[`page${page.title}`] = ref}>
        {React.createElement(page.component, {  })}
      </Page>
    );
  };
  
  _renderMainPage = () => {
    let { mainApp } = this.props;
    
    return React.createElement(mainApp, { navigateTo: this._navigateTo })
  }
  
  // Hide main page and slidein new page
  _navigateTo = (pageNumber) => {
    
    this._currentIndex = pageNumber;
    
    let { pages } = this.props
    , title = pages[pageNumber].title
    , slideIn = this[`page${title}`].slideIn();
    
    Animated.parallel([
      slideIn,
      Animated.timing(this._scale, {
        toValue: 0.9,
        duration: 300
      })
    ]).start(({ finished }) => {
      finished && slideIn.fn ? slideIn.fn() : null
    })
  }
  
  _goBack = () => {
    let pageNumber = this._currentIndex;
    let { pages } = this.props
    , title = pages[pageNumber].title
    , slideOut = this[`page${title}`].slideOut();
    
    Animated.parallel([
      slideOut,
      Animated.timing(this._scale, {
        toValue: 1,
        duration: 300
      })
    ]).start(({ finished }) => {
      finished && slideOut.fn ? slideOut.fn() : null
    })
  }

  render() {
    let { pages } = this.props,
      pageContainerStyle = [
        Styles.pageContainer, {
          backgroundColor: 'black'
        }
      ],
      backDropStyle = {
        height: height,
        width: width,
        top: 0,
        left: 0,
        backgroundColor: '#000000'
      };
      
    return (
      <View style={pageContainerStyle}>
        <Animated.View style={{
          flex: 1,
          transform: [{ scale: this._scale }],
          opacity: this._scale.interpolate({
            inputRange: [0.9, 1],
            outputRange: [0.5, 1]
          }),
          borderRadius: this._scale.interpolate({
            inputRange: [0.98, 1],
            outputRange: [5, 0],
            extrapolate: 'clamp'
          }),
          backgroundColor: 'white'
        }}>
          { this._renderMainPage() }
        </Animated.View>
        {pages.map(this._renderPage)}
      
      </View>
    );
  }
}
