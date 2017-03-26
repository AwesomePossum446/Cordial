import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Modal
} from 'react-native';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';

import {Icon} from '../components/touchable-icon';
import Icons from '../consts/icons';
import {white, brightBlue, lightBlue, paleBlue, HEADER_HEIGHT} from '../consts/styles';
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
	modal: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalTitle: {
		fontSize: 20,
		paddingTop: 5,
	},
	modalDescription: {
		fontSize: 18,
		padding: 5,
		paddingBottom: 10,
	},
	textField: {
		alignSelf: 'stretch',
		backgroundColor: white,
		fontSize: 18,
		height: 26,
		margin: 0,
		marginTop: 5,
		paddingVertical: 1,
		paddingHorizontal: 5,
		marginHorizontal: 20,
		textDecorationLine: 'none',
		borderColor: brightBlue,
		borderWidth: 1,
		lineHeight: 26,
	},
	buttonRow: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingVertical: 10
	},
	button: {
		fontSize: 20,
	}
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
			modalVisible: false,
			input: ''
		};
		this.onSelect = this.onSelect.bind(this);
		this.onFieldChange = this.onFieldChange.bind(this);
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

	createCustomField(icon, displayName) {
		Actions.pop();
		this.props.onSelect({
			displayName,
			icon,
			value: '',
			custom: true
		});
	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	onFieldChange(v) {
		this.setState({input: v});
	}

	render() {
		const iconList = _.map(Icons, ({displayName}, icon) => ({icon, displayName}));

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
				<Modal
					animationType={'slide'}
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={()=>{alert('Modal has been closed.');}}
					>
						<View style={styles.modal}>
							<View style={{backgroundColor: lightBlue, borderColor: brightBlue, borderWidth: 10}}>
								<View style={{alignItems: 'center'}}>
									<Text style={styles.modalTitle}>Custom Field</Text>
									<Text style={styles.modalDescription}>Enter the name of your custom field</Text>
									<TextInput
										style={styles.textField}
										value={this.state.input}
										onChangeText={this.onFieldChange}
										underlineColorAndroid='transparent'
									/>
									<View style={styles.buttonRow}>
										<TouchableOpacity onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
											<Text style={styles.button}>Close</Text>
										</TouchableOpacity>
										<TouchableOpacity onPress={() => {
											this.setModalVisible(!this.state.modalVisible);
											this.createCustomField('info-circle', this.state.input);
										}}>
											<Text style={styles.button}>OK</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</View>
					</Modal>
				<FieldOption
					key={0}
					field={{
						icon: 'plus-square', //change this to actual ICON
						displayName: 'Create Custom Field'
					}}
					onPress={() => {this.setModalVisible(!this.state.modalVisible);}}
				/>
				{
					_.map(iconList, (f, i) => <FieldOption key={i} field={f} onPress={this.onSelect} />)
				}
			</ScrollView>
		);
	}
}

export default connect()(FieldPicker);
