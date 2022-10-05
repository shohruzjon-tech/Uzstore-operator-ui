import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import styled from "styled-components";

export const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
`;

export const Item = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #ffffff;
  border-radius: 5px;
  elevation: 8;
  padding: 13px 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
`;

export const Name = styled(Text)`
  text-align: center;
`;

export const Avatar = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`;

export const Button = styled(TouchableOpacity)`
  background: #4630eb;
  padding: 8px 15px;
  border-radius: 10px;
`;
