import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {white} from '../consts/styles';

const styles = StyleSheet.create({
	icon: {
		backgroundColor: white,
		borderWidth: 0,
		borderRadius: 4
	}
});

export class Icon extends Component {
	render() {
		const {name, size, color} = this.props;
		return (
			<View style={[styles.icon, this.props.style]}>
				<FontAwesomeIcon name={name} size={size} color={color} style={this.props.style}/>
			</View>
		);
	}
}

export default class TouchableIcon extends Component {
	constructor(props) {
		super(props);
		this.onPress = this.onPress.bind(this);
	}
	onPress() {
		if(typeof this.props.onPress === 'function') {
			this.props.onPress();
		}
	}
	render() {
		const {size, name, style, color} = this.props;
		return (
			<TouchableOpacity onPress={this.onPress}>
				<Icon size={size} name={name} style={style} color={color}/>
			</TouchableOpacity>
		);
	}
}
