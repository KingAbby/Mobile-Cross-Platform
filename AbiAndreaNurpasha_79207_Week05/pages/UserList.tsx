import { ScrollView, View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { theme } from '../style/Theme';
import userData from '../data.json';

const UserList = ({ navigation }) => {
    return (
        <ScrollView>
            {userData.map((user) => {
                return (
                    <View style={styles.userList} key={user.name}>
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate('Profile', { user })
                            }
                        >
                            <Image
                                source={{
                                    uri: user.photo_url,
                                }}
                                style={styles.avatar}
                            />
                            <View>
                                <Text style={styles.boldText}>{user.name}</Text>
                                <Text>{user.email}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    userList: {
        padding: 10,
    },
    card: {
        flexDirection: 'row',
        padding: 10,
        gap: 10,

        borderRadius: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default UserList;