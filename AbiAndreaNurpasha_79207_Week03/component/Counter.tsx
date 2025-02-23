import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';

interface ICounter {
    handleIncrement: () => void;
    handleDecrement: () => void;
    value: number;
}

const Counter = ({ handleDecrement, handleIncrement, value }: ICounter) => {
    return (
        <View style={styles.container}>
            <Button title="Increment" onPress={handleIncrement} />
            <Button title="Decrement" onPress={handleDecrement} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 20,
        backgroundColor: 'lightblue',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        alignItems: 'center'
    }
});

export default Counter;