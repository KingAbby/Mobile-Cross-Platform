import React from "react";
import { View, Text, TextInput } from "react-native";

const Input = ({ name, onChangeText }) => {
    console.log(name);
    return (
        <View>
            <Text>Name</Text>
            <TextInput
                placeholder="Input your name"
                style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 8,
                }}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const NumberInput = ({ nim, onChangeText }) => {
    console.log(nim);
    return (
        <View>
            <Text>NIM</Text>
            <TextInput
                placeholder="Input your NIM"
                style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 8,
                }}
                onChangeText={onChangeText}
                keyboardType='numeric'
            />
        </View>
    );
};

export default {Input, NumberInput};
