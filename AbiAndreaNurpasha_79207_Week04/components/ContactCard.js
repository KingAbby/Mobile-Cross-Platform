import { Card, Avatar, Chip } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const ContactCard = ({ user }) => (
    <Card style={styles.card}>
        <Card.Title
            title={user.name}
            titleStyle={styles.name}
            subtitle={user.email}
            left={(props) => (
                <Avatar.Image {...props} source={{ uri: user.photo_url }} size={50} />
            )}
            right={(props) => (
                <Chip
                    icon="message"
                    onPress={() => { }}
                    style={styles.messageChip}
                    mode="outlined"
                    textStyle={{ color: 'white' }}
                >
                    Message
                </Chip>
            )}
        />
    </Card>
);

const styles = {
    card: {
        margin: 16,
        borderRadius: 12,
        elevation: 4,
        backgroundColor: 'white'
    },
    name: {
        fontWeight: 'bold'
    },
    messageChip: {
        marginRight: 16,
        backgroundColor: 'black'
    }
};

export default ContactCard;