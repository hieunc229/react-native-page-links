import React from 'react';
import { Animated, TouchableOpacity, Text, View } from 'react-native';

import Styles from './_styles'; // Version can be specified in package.json

/*
* A Page content wrapper, handling appear / disappear of a page content
*/
export default class Page extends React.Component {
  state = {
    isRendered: false,
  };
  _translateX = new Animated.Value(0);
  viewContent = null;

  componentDidMount() {
    
    // Set all inactive view hidden
    if (!this.props.isActive) {
      this._translateX.setValue(this.props.viewWidth);
    }
  }

  /*
  * Show screen, render view content if it hasn't been render yet
  */
  slideIn() {
    //
    if (!this.state.isRendered) {
      this.viewContent = this.renderView();
      this.setState({ isRendered: true });
    }
    return this._animate(0);
  }

  /*
  * Hide screen/slide to hidden area on the right
  */
  slideOut() {
    return this._animate(this.props.viewWidth);
  }

  /*
  * Shorthand for view Animation
  * Return an animate timing object (with a `start` method)
  */
  _animate = (toValue, key = 'translateX', duration = 300) => {
    return Animated.timing(this[`_${key}`], {
      toValue,
      duration,
    });
  };

  /**
  * Return view content
  * Used for lazy loading/prevent all screen is loaded on startup
  */
  renderView = () => {
    return this.props.children;
  };

  /**
  * Return view top navigation
  */
  _renderHeader = () => {
    
    let { goBack, navStyle } = this.props;
    
    if (this.props.renderHeader) {
      return this.props.renderHeader({ 
        goBack: goBack 
      });
    } else {
      
      return (
        <View style={[Styles.header, navStyle]} collapsable={false}>
          <TouchableOpacity onPress={goBack}>
            <Text style={{ padding: 10 }}>Back</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    let { _translateX } = this,
      { style, children, goBack, ...rest } = this.props,
      viewStyle = [
        style,
        Styles.pageContainer,
        {
          zIndex: this.state.zIndex,
          transform: [{ translateX: _translateX }],
        },
      ];

    return <Animated.View {...rest} style={viewStyle}>
    
      {/* Render Top Navigation */}
      {this._renderHeader()}
        
      {/* Render Componenet View*/}
      {this.viewContent}
    </Animated.View>;
  }
}
