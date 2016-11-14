import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  ListView
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';
import firebase from 'firebase';

export default class LinksScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Links',
    },
  }

  componentWillMount() {
    this.tabRef = firebase.database().ref('tabs/' + this.props.route.params.tab);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['0', '1', '3', '2'])
    }
    this.tabRef.once('value', (dataSnapshot) => {
      dataSnapshot.child('document/lines').forEach((lineSnapshot) => {
        if (lineSnapshot.child('type').val() === 'tab') {
          var array = [];
          lineSnapshot.child('strums').forEach((strumSnapshot) => {
            array.push(strumSnapshot.child('contents/4').val());
          });
          this.setState({dataSource: ds.cloneWithRows(array)});
          return true;
        }
      });
    });
  }

  render() {
    return (
      <ScrollView
        horizontal={true}
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        <ListView horizontal={true} dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)}/>
        <Text>{ this.state.fullText }</Text>

      </ScrollView>
    );
  }

  _renderRow(item) {
    return (<Text>{item !== '' ? item : '-'}</Text>)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
