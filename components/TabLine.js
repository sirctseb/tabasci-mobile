import React from 'react';
import { Text } from 'react-native';
import {
  ListView,
  View } from 'react-native';
import styles from '../styles.js';

export class TabLine extends React.Component {

  constructor(props) {
    super(props);
    this.state = {dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })}
    this._setStateFromProps(this.props)
  }

  _setStateFromProps(props) {
    var strums = [];
    props.line.child('strums').forEach((strum) => {
      strums.push(strum);
    });

    this.state = {
      dataSource: this.state.dataSource.cloneWithRows(strums)
    };
  }

  componentWillReceiveProps(nextProps) {
    this._setStateFromProps(nextProps)
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          horizontal={true}
          renderHeader={this._renderHeader.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview} />
      </View>
    )
  }

  _renderItem(item) {
    return (
      <Text style={{fontFamily: 'monospace'}}>{this._renderText(item)}</Text>
    )
  }

  _renderText(strum) {
    return [0,1,2,3,4,5].map((string) =>
      { return this._padString(strum.child('contents/' + string).val(), strum.child('width').val()) } ).join('\n')
  }

  _padString(content, width) {
    if (content.length >= width) return content
    var addLength = width - content.length
    var arr = new Array(addLength)
    for (var i = 0; i < arr.length; i++) {
      arr[i] = '-'
    }
    return content + arr.join('')
  }

  _renderHeader() {
    return this._renderItem(this.props.line.child('header'))
  }

  _renderFooter() {
    return this._renderItem(this.props.line.child('footer'))
  }
}
