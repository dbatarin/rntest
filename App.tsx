import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {UsersListScreen} from './src/screens/users-list-screen/users-list-screen';
import {UserDetailsScreen} from './src/screens/user-details-screen/user-details-screen';

const AppNavigator = createStackNavigator({
  UsersList: {
    screen: UsersListScreen,
    navigationOptions: {
      title: 'User List',
    },
  },
  UserDetails: {
    screen: UserDetailsScreen,
    navigationOptions: {
      title: 'User details',
    },
  },
});

export default createAppContainer(AppNavigator);
