import { Button, Text, View } from 'react-native';
import React from 'react';

const Email = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Email List Page</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')} />
        </View>
    );
};

export default Email;