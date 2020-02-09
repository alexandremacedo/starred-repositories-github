import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  padding: 20px 20px 0 20px;
  background: #1e1e2a;
`;

export const Header = styled.View`
  align-items: center;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #7b7791;
`;
export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #eee;
`;
export const Name = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

export const Bio = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: #7b7791;
  margin-top: 5px;
  text-align: center;
`;

export const Stars = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
  height: 101%;
`;

export const Starred = styled.TouchableOpacity`
  background: #44404d;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
`;
export const OwnerAvatar = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background: #eee;
`;
export const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`;
export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #fff;
`;
export const Author = styled.Text`
  font-size: 13px;
  color: #7b7791;
  margin-top: 2px;
`;
