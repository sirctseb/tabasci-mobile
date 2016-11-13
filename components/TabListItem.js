import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { View, TouchableHighlight, Text } = ReactNative;

class TabListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.liText}>^{this.props.item.metadata.rating.count} by {this.props.item.metadata.username}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = TabListItem;
