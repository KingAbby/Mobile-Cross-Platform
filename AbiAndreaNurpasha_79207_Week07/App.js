import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, { SlideInDown, SlideInLeft, SlideInRight } from 'react-native-reanimated';
import UserList from './pages/UserList';
import Profile from './pages/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      if (width < height) {
        setOrientation('portrait');
      } else {
        setOrientation('landscape');
      }
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View entering={SlideInLeft}>
        <Text>Screen Width: {screenWidth}</Text>
      </Animated.View>
      <Animated.View entering={SlideInRight}>
        <Text>Screen Height: {screenHeight}</Text>
      </Animated.View>
      <Animated.View entering={SlideInDown}>
        <Text>Orientation: {orientation}</Text>
      </Animated.View>
      <Animated.View entering={SlideInDown.delay(300)} style={styles.buttonContainer}>
        <Button
          title="Go to User List"
          onPress={() => navigation.navigate('UserList')}
        />
      </Animated.View>
    </View>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserList" component={UserList} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  box: {
    width: 120,
    height: 120,
    backgroundColor: '#b58df1',
    borderRadius: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: 200,
  }
});