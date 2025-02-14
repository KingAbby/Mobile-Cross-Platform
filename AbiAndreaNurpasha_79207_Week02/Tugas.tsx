import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';

const Tugas = () => {
    return (
        <ScrollView>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: 20
            }}>
                <Text style={styles.header}>WEEK 02</Text>
            </View>

            {/* Gambar 1 */}
            <View style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}>
                <Image
                    source={require('./assets/Cheddar The Ocelot.png')}
                    style={styles.gambar}
                />

                <Text
                    style={styles.text}>Abi Andrea Nurpasha
                </Text>

                <Text
                    style={styles.text}>00000079207
                </Text>
            </View>

            {/* Gambar 2 */}
            <View style={{
                flex: 3,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}>
                <Image
                    source={require('./assets/Kobo.jpg')}
                    style={styles.gambar}
                />

                <Text
                    style={styles.text}>Kobokan Aer
                </Text>

                <Text
                    style={styles.text}>00000099999
                </Text>
            </View>

            {/* Gambar 3 */}
            <View style={{
                flex: 4,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}>
                <Image
                    source={require('./assets/vergil.png')}
                    style={styles.gambar}
                />

                <Text
                    style={styles.text}>Vergil Alabama
                </Text>

                <Text
                    style={styles.text}>00000090909
                </Text>
            </View>

            {/* Gambar 4 */}
            <View style={{
                flex: 4,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}>
                <Image
                    source={require('./assets/patrick.png')}
                    style={styles.gambar}
                />

                <Text
                    style={styles.text}>Patrick Stress
                </Text>

                <Text
                    style={styles.text}>Patrick.Stress@Nicklodeon.TV
                </Text>
            </View>

            {/* Gambar 5 */}
            <View style={{
                flex: 4,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}>
                <Image
                    source={require('./assets/Amel.png')}
                    style={styles.gambar}
                />

                <Text
                    style={styles.text}>Amel
                </Text>

                <Text
                    style={styles.text}>Amelia.Watson@Hololive.EN
                </Text>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        fontWeight: 'bold'
    },

    text: {
        fontSize: 20,
        fontFamily: 'sans-serif',
        padding: 5
    },

    gambar: {
        width: 200,
        height: 200,
        borderRadius: '50%',
        margin: 10
    }
});

export default Tugas;