import { theme } from '../style/Theme';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Navigation List</Text>
            <Button
                title="Email"
                onPress={() => navigation.navigate('Email')} />
            <Text>User List</Text>
            <Button
                title="User List"
                onPress={() => navigation.navigate('UserList')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default HomeScreen;