import React from 'react';
import Screen from './Screen';
import Profile from '../ProfilePage/Profile';
import NewsFeedContainer from '../Feeds/NewsFeedContainer';
import CreateEventContainer from '../Event/CreateEventContainer';
import FriendListContainer from '../Friend/FriendListContainer';
import SearchFilterContainer from '../Friend/SearchFilterContainer';

export const ProfileScreen = ({ navigation }) => <Screen navigation={navigation} screen={<Profile />} />;
export const NewsFeedScreen = ({ navigation }) => <Screen navigation={navigation} screen={<NewsFeedContainer />} />;
export const CreateEventScreen = ({ navigation }) => <Screen navigation={navigation} screen={<CreateEventContainer />} />;
export const FriendListScreen = ({ navigation }) => <Screen navigation={navigation} screen={<FriendListContainer />} />;
export const SearchUserScreen = ({ navigation }) => <Screen navigation={navigation} screen={<SearchFilterContainer />} />;
export const SignOutScreen = ({ navigation }) => <Screen navigation={navigation} screen={<Login />} />;

/*
*/
