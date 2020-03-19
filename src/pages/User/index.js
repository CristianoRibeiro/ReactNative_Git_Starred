/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Load,
} from './styles';

export default function User({ route, navigation }) {
  const [start, setStart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const { user } = route.params;

  useEffect(() => {
    _goData();
  }, [page]);

  // eslint-disable-next-line no-underscore-dangle
  async function _goData() {
    try {
      const response = await api.get(
        `/users/${user.login}/starred?per_page=30&page=${page}`
      );

      if (response.data.length > 0)
        setStart(start => [...start, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  function handleNavigate(start) {
    // console.tron.log(user);

    navigation.navigate('Detail', { start });
  }

  function onEndReached() {
    setLoading(true);
    setPage(page + 1);
    setLoading(false);
  }

  function renderFooter() {
    return loading ? (
      <Load>
        <ActivityIndicator size="large" />
      </Load>
    ) : null;
  }

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      <Stars
        data={start}
        keyExtractor={start => String(start.id)}
        renderItem={({ item }) => (
          <Starred onPress={() => handleNavigate(item)}>
            <OwnerAvatar source={{ url: item.owner.avatar_url }} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
            <Icon name="keyboard-arrow-right" size={20} color="#000" />
          </Starred>
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={7}
        ListFooterComponent={renderFooter}
      />
    </Container>
  );
}
