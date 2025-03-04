import { SafeAreaView, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Header from './components/Header';
import ContactsScreen from './screens/ContactsScreen';
import userData from './data.json';
import { theme } from './styles/Theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={theme.colors.primary} barStyle="dark-content" />
        <Header />
        <ContactsScreen userData={userData} />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
};