import React from 'react';
import {FlatList, View} from 'react-native';
import {IUser} from '../../../stores/users';
import {UserListItem} from '../list-item';
import {styles} from './styles';

interface IProps {
  data: IUser[];
  refreshing: boolean;
  onRefresh: () => void;
}

export class UsersList extends React.Component<IProps> {
  renderItem = ({item}: {item: IUser}) => {
    return <UserListItem item={item} />;
  };

  keyExtractor = (item: IUser) => `user-${item.login.uuid}`;

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  render() {
    const {data, onRefresh, refreshing} = this.props;

    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={this.renderSeparator}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    );
  }
}
