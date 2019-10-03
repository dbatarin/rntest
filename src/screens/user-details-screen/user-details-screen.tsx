import React from 'react';
import {
  Button,
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import {inject, observer} from 'mobx-react';
import {IUser, IUserStore, USERS_STORE} from '../../stores/users';
import {styles} from './styles';

interface NavigationParams {
  user: IUser;
}

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  [USERS_STORE]: IUserStore;
}

interface IState {
  isEditMode: boolean;
  avatarUri: string;
  firstName: string;
  lastName: string;
  email: string;
}

@inject(USERS_STORE)
@observer
export class UserDetailsScreen extends React.Component<IProps, IState> {
  state = {
    isEditMode: false,
    avatarUri: '',
    firstName: '',
    lastName: '',
    email: '',
  };

  constructor(props: IProps) {
    super(props);

    const {
      navigation: {
        state: {params},
      },
    } = props;

    const user = params!.user;

    this.state = {
      ...this.state,
      avatarUri: user.picture.large,
      firstName: user.name.first,
      lastName: user.name.last,
      email: user.email,
    };
  }

  toggleEditMode = () => {
    this.setState(({isEditMode}) => ({isEditMode: !isEditMode}));
  };

  openImagePicker = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Select Avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      response => {
        if (response.uri) {
          this.setState({
            avatarUri: response.uri,
          });
        }
      },
    );
  };

  renderImage = () => {
    const {isEditMode, avatarUri} = this.state;

    const imageNode = (
      <Image source={{uri: avatarUri}} style={{width: 128, height: 128}} />
    );

    if (isEditMode) {
      return (
        <TouchableOpacity onPress={this.openImagePicker}>
          {imageNode}
        </TouchableOpacity>
      );
    }

    return imageNode;
  };

  onChangeFirstName = (firstName: string) => {
    this.setState({firstName});
  };

  onChangeLastName = (lastName: string) => {
    this.setState({lastName});
  };

  renderUserNames = () => {
    const {isEditMode, firstName, lastName} = this.state;

    if (isEditMode) {
      return (
        <>
          <TextInput onChangeText={this.onChangeFirstName} value={firstName} />
          <TextInput onChangeText={this.onChangeLastName} value={lastName} />
        </>
      );
    }

    return (
      <Text>
        {firstName} {lastName}
      </Text>
    );
  };

  onChangeEmail = (email: string) => {
    this.setState({email});
  };

  renderEmail = () => {
    const {isEditMode, email} = this.state;

    if (isEditMode) {
      return <TextInput onChangeText={this.onChangeEmail} value={email} />;
    }

    return <Text>{email}</Text>;
  };

  onSave = () => {
    const {
      [USERS_STORE]: userStore,
      navigation: {
        state: {params},
      },
    } = this.props;
    const {firstName, lastName, email, avatarUri} = this.state;
    const user = params!.user;

    userStore.updateUser(user, {firstName, lastName, email, avatarUri});

    this.toggleEditMode();
  };

  onDelete = () => {
    const {
      [USERS_STORE]: userStore,
      navigation: {
        state: {params},
        ...navigation
      },
    } = this.props;
    const user = params!.user;

    userStore.deleteUser(user.login.uuid);

    navigation.pop();
  };

  render() {
    const {isEditMode} = this.state;

    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.imageContainer}>{this.renderImage()}</View>
        <View>
          {this.renderUserNames()}
          {this.renderEmail()}
        </View>
        <View>
          <View style={styles.saveEditButtonsWrapper}>
            {isEditMode ? (
              <Button title={'Save'} onPress={this.onSave} />
            ) : (
              <Button title={'Edit'} onPress={this.toggleEditMode} />
            )}
          </View>
          {!isEditMode && (
            <Button title="Delete" color="red" onPress={this.onDelete} />
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}
