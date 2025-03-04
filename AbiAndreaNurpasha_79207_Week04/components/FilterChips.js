import { Surface, Chip } from 'react-native-paper';

const FilterChips = ({ selectedFilter, setSelectedFilter }) => (
    <Surface style={styles.surface}>
        {['All', 'Work', 'Friends', 'Family'].map((filter) => (
            <Chip
                key={filter}
                selected={selectedFilter === filter}
                onPress={() => setSelectedFilter(filter)}
                style={styles.chip}
                selectedColor="green"  // Text color when selected
                textStyle={{ color: 'white' }}  // Default text color
                showSelectedOverlay={true} // Shows background when selected
                elevation={0}
            >
                {filter}
            </Chip>
        ))}
    </Surface>
);

const styles = {
    surface: {
        flexDirection: 'row',
        padding: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        backgroundColor: 'white'
    },
    chip: {
        marginRight: 8,
        backgroundColor: 'black'
    }
};

export default FilterChips;