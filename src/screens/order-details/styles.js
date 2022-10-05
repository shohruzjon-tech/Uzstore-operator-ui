import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components";

export const Button1 = styled(TouchableOpacity)`
  background: #e88533;
  padding: 12px 17px;
  border-radius: 10px;
  flex-direction: row;
`;

export const Button2 = styled(TouchableOpacity)`
  background: #4630eb;
  padding: 12px 17px;
  border-radius: 10px;
  flex-direction: row;
`;

export const ViewConatiner = styled(ScrollView)`
  background: #ffffff;
  padding: 20px 0;
`;

export const OrderListContainer = styled(View)``;

export const Text10 = styled(Text)`
  color: #373f50;
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
`;

export const Text11 = styled(Text)`
  color: #373f50;
  font-size: 15px;
  font-weight: 500;
`;

export const Text12 = styled(Text)`
  color: #d23f57;
  font-size: 12px;
  font-weight: 500;
  margin-top: 5px;
`;

export const ProductsContainer = styled(View)`
  padding: 20px 0;
`;

export const ProductCard = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  elevation: 5;
  padding: 17px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const ProductAvatar = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const ButtonsContainer = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
  align-items: center;
`;
