import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationEvents } from 'react-navigation';
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
} from './styles';

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  loading: {
    alignSelf: 'center',
    marginVertical: 20,
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default class User extends Component {
  static navigationOptions = () => ({
    title: 'Stars',
  });

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    stars: [],
    page: 1,
    loading: true,
    loadingMore: false,
    openWebView: false,
    item: {},
  };

  async componentDidMount() {
    this.loadStars();
  }

  loadStars = async () => {
    const { navigation } = this.props;
    const { page, stars } = this.state;
    const user = navigation.getParam('user');

    this.setState({ loadingMore: true });

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        per_page: 10,
        page,
      },
    });

    this.setState({
      stars: [...stars, ...response.data],
      page: page + 1,
      loading: false,
      loadingMore: false,
    });
  };

  renderGithubContent() {
    const { item } = this.state;
    console.log(`https://github.com/${item.owner.login}/${item.name}`);

    return (
      <>
        <WebView
          source={{
            uri: `https://github.com/${item.owner.login}/${item.name}`,
          }}
          style={{ flex: 1 }}
          javaScriptEnabled
          domStorageEnabled
        />
        <NavigationEvents
          onWillFocus={() => {
            this.setState({ openWebView: false });
          }}
        />
      </>
    );
  }

  renderItem = ({ item }) => (
    <Starred
      onPress={async () => {
        this.setState({ openWebView: true, item });
        await this.renderGithubContent();
      }}
    >
      <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
      <Info>
        <Title>{item.name}</Title>
        <Author>{item.owner.login}</Author>
      </Info>
    </Starred>
  );

  renderFooter = () => {
    const { loadingMore, stars } = this.state;
    if (loadingMore || stars.length < 10) return null;

    return (
      <View style={styles.loading}>
        <ActivityIndicator
          color="#fff"
          size={30}
          style={styles.activityIndicator}
        />
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, openWebView } = this.state;
    const user = navigation.getParam('user');
    if (openWebView) {
      return this.renderGithubContent();
    }
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <ActivityIndicator
            color="#fff"
            size={30}
            style={styles.activityIndicator}
          />
        ) : (
            <Stars
              data={stars}
              keyExtractor={star => String(star.id)}
              onEndReached={this.loadStars}
              onEndReachedThreshold={0.1}
              renderItem={this.renderItem}
              ListFooterComponent={this.renderFooter}
            />
          )}
      </Container>
    );
  }
}
