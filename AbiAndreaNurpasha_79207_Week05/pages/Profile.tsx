import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Title, Paragraph, Divider } from 'react-native-paper';
import { RouteProp, useRoute } from '@react-navigation/native';
import { theme, spacing, shadow } from '../styles/Theme';

interface User {
  name: string;
  email: string;
  photo_url: string;
}

type ProfileRouteParams = {
  Profile: {
    user: User;
  };
};

const Profile = () => {
  const route = useRoute<RouteProp<ProfileRouteParams, 'Profile'>>();
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: user.photo_url }}
          style={styles.profileImage}
        />
        <Title style={styles.name}>{user.name}</Title>
      </View>

      <Card style={[styles.card, shadow.medium]}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Contact Information</Title>
          <Divider style={styles.divider} />

          <View style={styles.infoContainer}>
            <Paragraph style={styles.label}>Email:</Paragraph>
            <Paragraph style={styles.value}>{user.email}</Paragraph>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: spacing.md,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: spacing.xs,
  },
  divider: {
    marginBottom: spacing.md,
  },
  infoContainer: {
    marginBottom: spacing.sm,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: theme.colors.primary,
  },
  value: {
    fontSize: 16,
  },
});

export default Profile;