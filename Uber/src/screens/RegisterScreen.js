import React, {useState} from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Text,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import api from '../api/axios';

const RegisterScreen = ({navigation}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = () => {
    setIsLoading(true);
    // Perform registration logic here
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    const data = {
      firstname,
      lastname,
      email,
      password,
      role: "USER"
    };
    console.log(JSON.stringify(data));
    api
      .post('api/v1/auth/register', data, {
        headers: {
          service: 'auth'
        }
      })
      .then(response => {
        console.log(response.data);
        if(response.status === 200) {

          Alert.alert('Success ✅', 'Registered successfully');
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error', 'An error occurred, please try again!');
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsLoading(false);
      });
    
    console.log('Firstname: ', firstname);
    console.log('Lastname: ', lastname);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    // Reset the input fields
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  if(isLoading) {
    return <View style={{justifyContent: 'center', alignContent: 'center'}}><ActivityIndicator size='large' color='black'/></View>
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Firstname"
        value={firstname}
        autoCorrect={false}
        onChangeText={setFirstname}
        placeholderTextColor="grey"
      />
      <TextInput
        style={styles.input}
        placeholder="Lastname"
        value={lastname}
        autoCorrect={false}
        onChangeText={setLastname}
        placeholderTextColor="grey"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCorrect={false}
        autoCapitalize='none'
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="grey"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="grey"
        />
        <Pressable onPress={togglePasswordVisibility}>
          {showPassword ? (
            <MaterialIcons name="visibility" size={24} color="black" />
          ) : (
            <MaterialIcons name="visibility-off" size={24} color="black" />
          )}
        </Pressable>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="grey"
        />
        <Pressable onPress={toggleConfirmPasswordVisibility}>
          {showConfirmPassword ? (
            <MaterialIcons name="visibility" size={24} color="black" />
          ) : (
            <MaterialIcons name="visibility-off" size={24} color="black" />
          )}
        </Pressable>
      </View>
      <Pressable onPress={handleRegister} style={styles.button}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Register</Text>
      </Pressable>

      <Button title='Already have an account?' onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderColor: 'black',
  },
  button: {
    width: '100%',
    backgroundColor: 'black',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    marginRight: 10,
  },
});

export default RegisterScreen;
