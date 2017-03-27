import React, {Component} from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableHighlight,
	ScrollView,
	StyleSheet
} from 'react-native';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';

import {Icon} from '../components/touchable-icon';
import Icons from '../consts/icons';
import filter from '../utils/filter';
import {brightBlue, paleBlue, lightBlue, HEADER_HEIGHT} from '../consts/styles';
//TODO: implement custom field creation

const styles = StyleSheet.create({
	fieldOption:{
		flexDirection: 'row',
		alignItems: 'center',
		padding: 5,
		margin: 2,
		justifyContent: 'flex-start',
		borderWidth: 1,
		borderColor: brightBlue,
		backgroundColor: paleBlue,
	},
	fieldOptionChild: {
		padding: 4
	},
	textInputContainer: {
		backgroundColor: brightBlue,
		padding: 8,
		paddingLeft: 20,
		paddingRight: 20,
	},
	textInput: {
		backgroundColor: lightBlue,
		height: 25,
		fontSize: 14,
		margin: 0,
		padding: 2,
		paddingLeft: 8,
		paddingRight: 8,
		textDecorationLine: 'none',
		borderRadius: 5,
		borderWidth: 0
	},
});

const FieldOption = (props) => (
	<TouchableHighlight onPress={() => props.onPress(props.field)}>
		<View style={styles.fieldOption}>
			<Icon style={styles.fieldOptionChild} name={props.field.icon} size={30}/>
			<Text style={styles.fieldOptionChild}>{props.field.displayName}</Text>
		</View>
	</TouchableHighlight>
);

class FieldPicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: ''
		};
		this.handleSearch = this.handleSearch.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}
	handleSearch(text) {
		this.setState({
			input: text
		});
	}
	onSelect({icon, displayName}) {
		Actions.pop();
		this.props.onSelect({
			displayName,
			icon,
			value: '',
			custom: false
		});
	}
	render() {
		const iconList = _(filter(Icons, this.state.input))
			.map(({displayName}, icon) => ({icon, displayName}))
			.value();
		return (
			<ScrollView
				style={{
					flex: 1,
					top: HEADER_HEIGHT,
				}}
				contentContainerStyle={{
					justifyContent: 'flex-start',
				}}
			>
				<View style={styles.textInputContainer}>
					<TextInput /* TODO: Add a search icon */
						onChangeText={this.handleSearch}
						value={this.state.input}
						style={styles.textInput}
						placeholder='Search'
						numberOfLines={1}
						underlineColorAndroid='rgba(0,0,0,0)'
					/>
				</View>
				{
					_.map(iconList, (f, i) => <FieldOption key={i} field={f} onPress={this.onSelect} />)
				}
			</ScrollView>
		);
	}
}

export default connect()(FieldPicker);
