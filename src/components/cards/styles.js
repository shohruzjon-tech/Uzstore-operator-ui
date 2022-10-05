import { View, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Text, TouchableRipple, AnimatedFAB } from "react-native-paper";

export const Container = styled(TouchableRipple)`
  elevation: 1;
  background: #ffffff;
  width: 93%;
  margin: 0 auto 20px auto;
  border-radius: 10px;
`;

export const InnerContainer = styled(View)``;

export const Header = styled(View)`
  display: flex;
  flex-direction: row;
`;

export const BlackBox = styled(View)`
  background: #000000;
  padding: 10px 15px;
  border-top-left-radius: 10px;
`;

export const NameContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
`;

export const LineContainer = styled(View)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
`;

export const BodyContainer = styled(View)`
  padding: 10px 20px;
  display: flex;
  align-items: flex-start;
`;

export const Footer = styled(View)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 0 0 20px;
  border-top-color: #ddd;
  border-top-width: 2px;
`;

export const FooterSection = styled(View)`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right-color: #ddd;
  border-right-width: 2px;
  padding: 10px 0;
`;

export const FooterSection2 = styled(TouchableOpacity)`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background: #4630eb;
  height: 100%;
  border-bottom-right-radius: 10px;
`;

export const Text1 = styled(Text)`
  color: #fff;
  font-weight: 800;
`;

export const Text2 = styled(Text)`
  color: #000000;
  font-weight: 700;
  font-size: 15px;
`;

export const Text3 = styled(Text)`
  color: #666666;
`;

export const Fab = styled(AnimatedFAB)``;
