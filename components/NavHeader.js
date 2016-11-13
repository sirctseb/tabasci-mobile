import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { View, Text } = ReactNative;

class NavHeader extends Component {
  render() {
    return (
      <View style={styles.li}>
        <Text style={styles.headerText}>{this.props.text}</Text>
      </View>
    );
  }
}

module.exports = NavHeader;
