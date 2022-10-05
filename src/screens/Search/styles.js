import styled from "styled-components";
import { View, TouchableOpacity, TextInput, Text } from "react-native";

export const ContainerBG = styled(View)`
  background: #fff;
  margin: 10px;
  padding: 15px 5px;
  border-radius: 10px;
`;

export const Button = styled(TouchableOpacity)`
  padding: 15px 15px;
  background: #4630eb;
  width: 95px;
  height: 100%;
`;

export const ButtonText = styled(Text)`
  color: #fff;
  font-weight: 800;
  text-align: center;
  width: 100%;
`;

export const Input = styled(TextInput)`
  width: 100%;
  padding: 15px 25px;
`;

export const InputContainer = styled(View)`
  border: 1px solid #1b1b1b;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  width: 75%;
`;
