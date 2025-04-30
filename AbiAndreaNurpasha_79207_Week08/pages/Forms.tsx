import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getPostById, updatePost } from '../services/axios';

interface FormsProps {
    route: {
        params: {
            postId: number;
            post?: {
                title: string;
                body: string;
                userId: number;
            };
            onUpdate?: (data: any) => void;
        };
    };
    navigation: any;
}

export default function Forms({ route, navigation }: FormsProps) {
    const { postId, post } = route.params;
    const [title, setTitle] = useState(post ? post.title : '');
    const [body, setBody] = useState(post ? post.body : '');
    const [userId, setUserId] = useState(post ? post.userId : null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!post) {
            getPostById(postId).then((res) => {
                if (res.status === 200) {
                    setTitle(res.data.title);
                    setBody(res.data.body);
                    setUserId(res.data.userId);
                }
            }).catch(error => {
                Alert.alert('Error', 'Failed to load post details');
            });
        }
    }, [postId, post]);

    const handleUpdate = () => {
        if (!title.trim() || !body.trim()) {
            Alert.alert('Validation Error', 'Title and body cannot be empty');
            return;
        }
        setLoading(true);
        const updatedData = {
            id: postId,
            title,
            body,
            userId: userId || 1
        };
        updatePost(postId, updatedData)
            .then((res) => {
                Alert.alert('Success', 'Post updated successfully', [
                    {
                        text: 'OK',
                        onPress: () => {
                            if (route.params && route.params.onUpdate) {
                                route.params.onUpdate(updatedData);
                            }
                            navigation.goBack();
                        }
                    }
                ]);
            })
            .catch(error => {
                Alert.alert('Error', 'Failed to update post');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Post</Text>

            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title"
            />

            <Text style={styles.label}>Body</Text>
            <TextInput
                style={[styles.input, styles.bodyInput]}
                value={body}
                onChangeText={setBody}
                placeholder="Enter content"
                multiline
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleUpdate}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Updating...' : 'Update Post'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 16,
    },
    bodyInput: {
        height: 150,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});