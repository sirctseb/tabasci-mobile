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
      dataSource: ds
    }
    this.tabRef.once('value', (dataSnapshot) => {
      var lines = [];
      dataSnapshot.child('document/lines').forEach((lineSnapshot) => {
        lines.push(lineSnapshot);
      });
      this.setState({dataSource: ds.cloneWithRows(lines)});
    });
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        <ListView dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)}/>
        <Text>{ this.state.fullText }</Text>

      </ScrollView>
    );
  }

  _renderRow(item) {
    console.log('type: ' + item.child('type').val());
    if (item.child('type').val() === 'chords' || item.child('type').val() === 'lyrics') {
      return (<Text style={styles.line}>{item.child('content').val()}</Text>)
    }
    return (<Text>Tab line would go here</Text>)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  line: {
    fontFamily: 'monospace'
  }
});
