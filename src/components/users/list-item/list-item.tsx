import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {IUser} from '../../../stores/users';
import {styles} from './styles';

interface IProps extends NavigationInjectedProps {
  item: IUser;
}

class UserListItemComponent extends React.Component<IProps> {
  onPress = () => {
    const {navigation, item} = this.props;

    navigation.push('UserDetails', {user: item});
  };

  render() {
    const {item} = this.props;

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.container}>
          <Image source={{uri: item.picture.medium}} style={styles.avatar} />
          <View style={styles.infoContainer}>
            <Text>
              {item.name.first} {item.name.last}
            </Text>
            <Text>{item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export const UserListItem = withNavigation(UserListItemComponent);
