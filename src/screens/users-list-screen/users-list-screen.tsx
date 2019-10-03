import React from 'react';
import {View} from 'react-native';
import {inject, observer} from 'mobx-react';
import {IUserStore, USERS_STORE} from '../../stores/users';
import {UsersList} from '../../components/users/list';

interface IProps {
  [USERS_STORE]: IUserStore;
}

@inject(USERS_STORE)
@observer
export class UsersListScreen extends React.Component<IProps> {
  componentDidMount(): void {
    const {[USERS_STORE]: usersStore} = this.props;
    usersStore.fetchUser();
  }

  render() {
    const {[USERS_STORE]: usersStore} = this.props;

    return (
      <View>
        <UsersList
          data={usersStore.list}
          onRefresh={usersStore.fetchUser}
          refreshing={usersStore.isLoading}
        />
      </View>
    );
  }
}
