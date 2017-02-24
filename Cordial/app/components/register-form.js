// Simple redux form setup guided by
// http://esbenp.github.io/2017/01/06/react-native-redux-form-immutable-styled-components/
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Field, reduxForm } from 'redux-form';

import * as baseStyles from '../consts/styles';
import TextField from './text-field';

// TODO: remove this stub for a real action

const RegisterForm = props => {
  const { handleSubmit, onSubmit } = props;

  const submit = (vals) => {
    onSubmit(vals.name, vals.phone, vals.email);
  }
  return (
    <View style={styles.container}>
      <Field name="name"
        component={TextField}
        placeholder="Name"
        autoCapitalize="words" />
      <Field name="phone"
        component={TextField}
        placeholder="Phone Number"
        keyboardType="phone-pad" />
      <Field name="email"
        component={TextField}
        placeholder="Email"
        keyboardType="email-address" 
        autoCapitalize="none" />
      <TouchableOpacity style={styles.button}
        onPress={handleSubmit(submit)}>
        <Text style={styles.buttonText}> Create Card </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: baseStyles.lightBlue,
    borderColor: baseStyles.brightBlue,
    borderColor: baseStyles.brightBlue,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    fontSize: 24,
  }
});

export default reduxForm({
  form: 'register',
})(RegisterForm);