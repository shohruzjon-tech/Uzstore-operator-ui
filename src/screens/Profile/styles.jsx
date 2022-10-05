import styled from "styled-components";
import {
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

export const Container = styled(ScrollView)``;

export const UserIntro = styled(View)`
  background: #ffffff;
  width: 95%;
  margin: 0 auto;
  border-radius: 8px;
  padding: 20px;
  elevation: 2;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Avatar = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export const InfoContainer = styled(View)`
  padding: 0 10px 0 25px;
`;

export const BalanceContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 0;
`;

export const GridContainer = styled(View)`
  width: 95%;
  margin: 20px auto;
`;

export const GridItem = styled(View)`
  background: #ffffff;
  width: 45%;
  border-radius: 8px;
  padding: 20px 15px;
  elevation: 2;
`;

export const ItemInfoContainer = styled(TouchableOpacity)``;

export const GridOddContainer = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`;

export const Input = styled(TextInput)`
  border: 1px solid #000;
  padding: 8px 20px;
  margin-top: 7px;
  border-radius: 5px;
`;

export const InputContainer = styled(View)`
  width: 95%;
  margin: 10px auto;
`;
