import { Searchbar } from 'react-native-paper';

const CustomSearchBar = ({ searchQuery, setSearchQuery }) => (
  <Searchbar
    placeholder="Search contacts"
    onChangeText={setSearchQuery}
    value={searchQuery}
    style={styles.searchBar}
  />
);

const styles = {
  searchBar: {
    margin: 16,
    elevation: 4,
    borderRadius: 8
  }
};

export default CustomSearchBar;