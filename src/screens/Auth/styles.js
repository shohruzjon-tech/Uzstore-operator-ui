import styled from "styled-components";
import {
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export const Container = styled(ScrollView)`
  width: 100%;
`;

export const ImageContainer = styled(View)`
  padding: 0 50px;
`;

export const Banner = styled(Image)`
  width: 100%;
  height: 200px;
`;

export const FormContainer = styled(View)`
  padding: 0 20px;
`;

export const FormikContainer = styled(View)`
  margin-bottom: 20px;
`;

export const InputContainer = styled(View)`
  border: 1px solid #1b1b1b;
  border-radius: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
`;

export const Input = styled(TextInput)`
  width: 90%;
  padding: 15px 25px;
`;

export const ButtonContainer = styled(View)`
  padding: 0 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Button = styled(TouchableOpacity)`
  background-color: #4630eb;
  width: 100%;
  border-radius: 35px;
  padding: 20px 0;
  align-items: center;
`;
