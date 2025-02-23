import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';

interface ProfileProps {
    name: string;
    age: number;
}

const Profile: React.FC<ProfileProps> = ({ name = 'Anonymous', age = 0 }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Updated Data:</Text>
            <Text style={styles.text}>Nama: {name}</Text>
            <Text style={styles.text}>Umur: {age} Tahun</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    text: {
        fontSize: 18
    },
});

export default Profile;