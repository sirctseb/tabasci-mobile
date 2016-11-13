import React from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import {
  ListView,
  View } from 'react-native';
import ListItem from './ListItem';
import styles from '../styles.js';

export class NavList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = firebase.database().ref(this.props.list);
  }

  componentWillMount() {
    this.itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.key,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>
      </View>
    )
  }

  _renderItem(item) {

    // const onPress = () => {
    //   AlertIOS.alert(
    //     'Complete',
    //     null,
    //     [
    //       {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
    //       {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
    //     ]
    //   );
    // };

    return (
      // <ListItem item={item} onPress={onPress} />
      <ListItem item={item}/>
    );
  }
}
