import {action, computed, observable} from 'mobx';
import axios from 'axios';
import {Alert} from 'react-native';
import _ from 'lodash';

export interface IUser {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    medium: string;
    large: string;
  };
  login: {
    uuid: string;
  };
}

interface INewUserData {
  firstName: string;
  lastName: string;
  email: string;
  avatarUri: string;
}

export interface IUserStore {
  list: IUser[];
  isLoading: boolean;
  searchText: string;
  fetchUser: () => void;
  updateUser: (user: IUser, newData: INewUserData) => void;
  deleteUser: (uuid: string) => void;
  setSearchText: (value: string) => void;
  filteredList: IUser[];
}

export const USERS_STORE = 'USERS_STORE';

class UsersStore implements IUserStore {
  @observable list: IUser[] = [];
  @observable isLoading: boolean = false;
  @observable searchText: string = '';

  @action fetchUser = async () => {
    this.isLoading = true;

    try {
      const {data} = await axios.get('https://randomuser.me/api/?results=30');

      this.list = data.results;
    } catch (e) {
      Alert.alert('Error', _.get(e, 'response', e.message));
    } finally {
      this.isLoading = false;
    }
  };

  @action updateUser = (user: IUser, newData: INewUserData) => {
    this.list = this.list.map((userOriginal: IUser) => {
      if (userOriginal.login.uuid === user.login.uuid) {
        return {
          ...userOriginal,
          name: {
            ...userOriginal.name,
            first: newData.firstName,
            last: newData.lastName,
          },
          email: newData.email,
          picture: {
            ...userOriginal.picture,
            medium: newData.avatarUri,
            large: newData.avatarUri,
          },
        };
      }

      return userOriginal;
    });
  };

  @action deleteUser = (uuid: string) => {
    this.list = this.list.filter(user => user.login.uuid !== uuid);
  };

  @action setSearchText = (value: string) => {
    this.searchText = value;
  };

  @computed get filteredList() {
    return this.list.filter((user: IUser) => {
      return (
        user.name.first.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.name.last.toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
  };
}

export const usersStore = new UsersStore();
