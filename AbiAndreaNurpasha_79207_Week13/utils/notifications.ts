import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Import the required type for triggers
import { SchedulableTriggerInputTypes } from 'expo-notifications';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    
    // Use the basic method without EAS
    try {
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Push token:', token);
    } catch (error) {
      console.error('Error getting push token:', error);
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export async function scheduleLocalNotification(
  title: string, 
  body: string, 
  successCount?: number,
  failureCount?: number,
  delayInSeconds?: number
) {
  try {
    // Add success and failure counts to the body if provided
    let notificationBody = body;
    
    if (typeof successCount === 'number' || typeof failureCount === 'number') {
      notificationBody += '\n\n';
      if (typeof successCount === 'number') {
        notificationBody += `${successCount} successful, `;
      } else {
        notificationBody += '0 successful, ';
      }
      
      if (typeof failureCount === 'number') {
        notificationBody += `${failureCount} unsuccessful`;
      } else {
        notificationBody += '0 unsuccessful';
      }
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: notificationBody,
        data: { data: 'goes here' },
      },
      // Use proper trigger format with the correct type enum
      trigger: delayInSeconds 
        ? { 
            seconds: delayInSeconds,
            channelId: 'default',
            type: SchedulableTriggerInputTypes.TIME_INTERVAL,
          } 
        : null, // explicit null for immediate notification
    });
    console.log('Notification scheduled successfully');
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
}
