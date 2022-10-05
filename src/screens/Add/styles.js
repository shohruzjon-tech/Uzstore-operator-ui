import styled from "styled-components";
import { View, TouchableOpacity, TextInput, Image, Text } from "react-native";

export const Container = styled(View)`
  background: #fff;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
`;

export const UserAvatarContainer = styled(View)`
  width: 90px;
  position: relative;
`;

export const Avatar = styled(Image)`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const AvatarTop = styled(TouchableOpacity)`
  background: rgb(227, 233, 239);
  width: 40px;
  height: 40px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const Input = styled(TextInput)`
  width: 100%;
  padding: 15px 25px;
`;

export const InputContainerAll = styled(View)`
  border: 1px solid #1b1b1b;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  margin-top: 30px;
`;

export const FormContainer = styled(View)``;

export const ButtonContainer = styled(View)``;

export const Button = styled(TouchableOpacity)`
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  padding: 12px 20px;
  background: #4630eb;
  width: 120px;
`;

export const ButtonText = styled(Text)`
  color: #fff;
  font-weight: 800;
  text-align: center;
  width: 100%;
`;
