import styled from "styled-components";
import { SafeAreaView, Text, TextInput, View } from "react-native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
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

export const Error = styled(Text)`
  font-size: 12px;
  color: red;
  margin-top: 4px;
  height: 14px;
`;
