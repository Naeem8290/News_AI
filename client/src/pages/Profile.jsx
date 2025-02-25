import React from 'react';
import { Avatar, Tabs, Text, Button, Container, Card } from '@mantine/core';
import { getCookie } from '../utils/utils';

const Profile = () => {
    return (
        <Container className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
            <Card className="p-6 flex flex-col items-center text-center shadow-md">
                <Avatar
                    size={100}
                    radius="xl"
                    src="https://via.placeholder.com/100"
                    alt="User Avatar"
                />
                <Text className="text-xl font-semibold mt-4">
                    {getCookie('name') &&
                        getCookie('name').charAt(0).toUpperCase() + getCookie('name').slice(1).toLowerCase()}
                </Text>
                <Text className="text-gray-500">{getCookie('email')}</Text>
                <Button variant="filled" color="blue" className="mt-4">
                    Edit Profile
                </Button>
            </Card>

            <Tabs defaultValue="bookmarks" className="mt-6">
                <Tabs.List>
                    <Tabs.Tab value="bookmarks">📌 Bookmarks</Tabs.Tab>
                    <Tabs.Tab value="liked">❤️ Liked News</Tabs.Tab>
                    <Tabs.Tab value="ai-news">🤖 AI Recommendations</Tabs.Tab>
                    <Tabs.Tab value="preferences">⚙ Preferences</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="bookmarks" className="p-4">
                    <Text className="text-gray-700">No bookmarked articles yet.</Text>
                </Tabs.Panel>

                <Tabs.Panel value="liked" className="p-4">
                    <Text className="text-gray-700">No liked news articles.</Text>
                </Tabs.Panel>

                <Tabs.Panel value="ai-news" className="p-4">
                    <Text className="text-gray-700">
                        AI-powered news recommendations will appear here.
                    </Text>
                </Tabs.Panel>

                <Tabs.Panel value="preferences" className="p-4">
                    <Text className="text-gray-700">No preferences set.</Text>
                </Tabs.Panel>
            </Tabs>
        </Container>
    );
};

export default Profile;