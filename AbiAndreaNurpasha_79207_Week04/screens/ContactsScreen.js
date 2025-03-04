import { ScrollView, RefreshControl } from 'react-native';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import ContactCard from '../components/ContactCard';

const ContactsScreen = ({ userData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredUsers = userData.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            setTimeout(() => setRefreshing(false), 2000);
          }}
        />
      }
    >
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FilterChips selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
      {filteredUsers.map((user) => (
        <ContactCard key={user.email} user={user} />
      ))}
    </ScrollView>
  );
};

export default ContactsScreen;