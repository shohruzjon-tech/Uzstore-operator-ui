import styled from "styled-components";
import { View, Pressable, TextInput, Modal } from "react-native";

export const TotalContainer = styled(View)`
  background-color: #ffffff;
  padding: 0 10px 10px 10px;
  border-radius: 10px;
  border-color: green;
  margin-top: 20px;
`;

export const Container = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 20px 5px;
  background: #ddd;
  border-radius: 5px;
`;

export const Item = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
  margin-top: 20px;
`;

export const Info = styled(View)`
  padding-left: 10px;
  flex-direction: column;
  align-items: flex-start;
`;

export const ButtonContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StyledButton = styled(Pressable)`
  border-radius: 50px;
  background: ${(props) => props.color};
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  elevation: 3;
`;

export const PickerContainer = styled(View)`
  border: 1px solid #a59fc0;
  padding: 10px;
  border-radius: 10px;
  height: 60px;
  margin-top: 5px;
`;

export const FormContainer = styled(View)``;

export const InputContainer = styled(View)`
  margin-top: 15px;
`;

export const Input = styled(TextInput)`
  border: 1px solid #a59fc0;
  padding: 10px;
  border-radius: 10px;
  margin-top: 5px;
  height: 60px;
`;

export const StyledModal = styled(Modal)`
  background: #ffffff;
`;
