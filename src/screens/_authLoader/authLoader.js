import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { withTheme, Button } from 'react-native-paper';
import firebase from 'react-native-firebase';
import { dispatch } from '../../store';

const authLoader = (props) => {
  const getAppConfig = async () => {
    await dispatch.app.getConfig();
  };

  const testing = () => {
    firebase.auth().signInAnonymously()
      .then((user) => {
        console.log('firebase', user.isAnonymous);
      })
      .catch((err) => {
        console.log('firebase err', err);
      });
  };

  useEffect(() => {
    console.log('authLoader didMount', props);
    getAppConfig();
    testing();
  }, []);

  const authUserState = () => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('authUserState', user);
    });
  };

  const signOut = async () => {
    await firebase.auth().signOut();
    console.log('signOut');
    authUserState();
  };

  const loginWithEmailAndPassword = async () => {
    try {
      const [email, password] = ['eze@test.com', '123456'];
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('response', response);
    } catch (error) {
      console.log('error', error);
    }
  };

  const createUserWithEmailAndPassword = async () => {
    try {
      const [email, password] = ['eze@test.com', '123456'];
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('response', response);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Loading info...</Text>
      <Button onPress={authUserState}>Text</Button>
      <Button onPress={signOut}>Sign out</Button>
      <Button onPress={createUserWithEmailAndPassword}>createUserWithEmailAndPassword</Button>
      <Button onPress={loginWithEmailAndPassword}>loginWithEmailAndPassword</Button>
    </View>
  );
};

export default withTheme(authLoader);
