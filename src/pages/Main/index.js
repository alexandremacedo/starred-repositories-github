import React, { Component } from 'react';
import { KeyBoard, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';
import api from '../../services/api';

export default class Main extends Component {
  // eslint-disable-next-line react/sort-comp
  static navigationOptions = {
    title: 'Usuários',
  };

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    newUser: '',
    users: [],
    loading: false,
    failure: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');
    if (users) {
      this.setState({
        users: JSON.parse(users),
      });
    }
  }

  async componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    this.setState({ loading: true, failure: false });

    try {
      const { users, newUser } = this.state;

      if (newUser === '') throw 'Adicione o usuário desejado';

      const hasUser = await users.find(
        user => user.login.toLowerCase() === newUser.toLowerCase()
      );

      if (hasUser) throw 'Usuário já adicionado';

      const response = await api.get(`/users/${newUser}`);

      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      this.setState({
        users: [data, ...users],
        newUser: '',
        loading: false,
      });
    } catch (failure) {
      this.setState({
        failure: true,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }

    KeyBoard.dismiss();
  };

  handleNavigate = user => {
    const { navigation } = this.props;
    navigation.navigate('User', { user });
  };

  render() {
    const { users, newUser, loading, failure } = this.state;
    return (
      <Container>
        <Form>
          <Input
            value={newUser}
            failure={failure}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
                <Icon name="add" size={20} color="#fff" />
              )}
          </SubmitButton>
        </Form>
        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
