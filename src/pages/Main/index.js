import React, { Component } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import api from '../../services/api';
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

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  async componentDidMount() {
    // await AsyncStorage.clear();
    const users = await AsyncStorage.getItem('users');
    if (users) this.setState({ users: JSON.parse(users) });
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState !== users)
      AsyncStorage.setItem('users', JSON.stringify(users));
  }

  handlerAddUser = async () => {
    const { users, newUser } = this.state;

    this.setState({ loading: true });

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false,
    });

    Keyboard.dismiss();
  };

  handleNavigate = user => {
    const { navigation } = this.props;
    // console.tron.log(user);

    navigation.navigate('User', { user });
  };

  renderListItem = item => {
    return (
      <User>
        <Avatar source={{ uri: item.avatar }} />
        <Name>{item.name}</Name>
        <Bio>{item.bio}</Bio>

        <ProfileButton onPress={() => this.handleNavigate(item)}>
          <ProfileButtonText> Ver perfil</ProfileButtonText>
        </ProfileButton>
      </User>
    );
  };

  render() {
    const { users, newUser, loading } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuários"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handlerAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handlerAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => this.renderListItem(item)}
        />
      </Container>
    );
  }
}
