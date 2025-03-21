import { ScrollView, View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { theme } from '../style/Theme';
import userData from '../data.json';
import Animated, { SlideInLeft, FadeIn } from 'react-native-reanimated';

const UserList = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            {userData.map((user, index) => {
                
                const animationDelay = 150 * index;
                
                return (
                    <Animated.View 
                        key={index}
                        entering={SlideInLeft.delay(animationDelay).springify()}
                    >
                        <View style={styles.userList}>
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() => navigation.navigate('Profile', { user })}
                            >
                                <Animated.Image
                                    source={{
                                        uri: user.photo_url,
                                    }}
                                    style={styles.avatar}
                                    entering={FadeIn.delay(animationDelay + 100)}
                                />
                                <View>
                                    <Animated.Text 
                                        style={styles.boldText}
                                        entering={FadeIn.delay(animationDelay + 200)}
                                    >
                                        {user.name}
                                    </Animated.Text>
                                    <Animated.Text
                                        entering={FadeIn.delay(animationDelay + 300)}
                                    >
                                        {user.email}
                                    </Animated.Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    userList: {
        padding: 10,
    },
    card: {
        flexDirection: 'row',
        padding: 10,
        gap: 10,
        borderRadius: 10,
        backgroundColor: '#f8f8f8',
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
});

export default UserList;