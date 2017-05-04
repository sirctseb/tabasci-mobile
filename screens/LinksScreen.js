import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  ListView,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';
import firebase from 'firebase';
import {TabLine} from '../components/TabLine';

export default class LinksScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Links',
    },
  }

  componentWillMount() {
    this.tabRef = firebase.database().ref('tabs/' + this.props.route.params.tab);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds.cloneWithRows([])
    }
    this.tabRef.on('value', (dataSnapshot) => {
      var lines = [];
      dataSnapshot.child('document/lines').forEach((lineSnapshot) => {
        lines.push(lineSnapshot);
      });
      this.setState({dataSource: this.state.dataSource.cloneWithRows(lines)});
    });
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        <ListView dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)}/>

      </ScrollView>
    );
  }

  _renderRow(item) {
    if (item.child('type').val() === 'chords' || item.child('type').val() === 'lyrics') {
      return (<Text style={styles.line}>{item.child('content').val()}</Text>)
    }
    var strums = [];
    item.child('strums').forEach((strumSnapshot) => {
      strums.push(strums);
    });
    return (<TabLine line={strums}/>)
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
