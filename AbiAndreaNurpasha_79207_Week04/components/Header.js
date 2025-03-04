import { View, Text } from 'react-native';
import { IconButton } from 'react-native-paper';

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.title}>Contacts</Text>
    <IconButton 
      icon="dots-vertical" 
      size={24}
      onPress={() => {}}
      style={styles.icon}
    />
  </View>
);

const styles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  icon: {
    margin: 0,
  }
};

export default Header;