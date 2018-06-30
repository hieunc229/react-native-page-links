import React, { Component } from 'react';
import {
    Text, View, StyleSheet, Switch,
    TouchableOpacity,
    SectionList
} from 'react-native';

export default class Main extends Component {

    _renderSectionHeader = ({section: { title }}) => {
        return <View style={Styles.Heading}>
            <Text style={Styles.HeadingTitle}>{ title }</Text>
        </View>;
    }

    _renderItem = ({item, index, section}) => {
        return <TouchableOpacity
            onPress={() => { 
              this.props.navigateTo(index)
            }}
        >
            <View style={Styles.SettingRow}>
                <Text style={Styles.ItemText}>{ item }</Text>
            </View>
        </TouchableOpacity>;
    }

    render() {

        let items = [
            {
                title: 'Help and Feedback',
                data: [
                    'Home',
                    'Index',
                    'Info'
                ]
            }
        ]

        return <SectionList
            style={{ flex: 1, paddingTop: 50 }}
            sections={items}
            // renderSectionHeader={this._renderSectionHeader}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => item + index}
        />
    }
}

const Styles = StyleSheet.create({
    Heading: {
        padding: 20,
        paddingBottom: 15,
        paddingTop: 15,
        backgroundColor: '#efefef'
    },
    SettingRow: {
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,0.1)'
    },
    ItemText: {
        fontSize: 14
    }
})