import { View, TouchableOpacity, Image, Text } from "react-native";
import styled from "styled-components";



export const Container = styled(TouchableOpacity)`
    background: #ffffff;
    border-radius: 5px;
    elevation: 8;
    padding: 13px 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;


export const Avatar = styled(Image)`
    width: 40px;
    height: 40px;
    border-radius: 50px;
`; 

export const InfoContainer = styled(View)`

`;

export const Text1 = styled(Text)`
    color: #2b3445;
    font-size: 16px;
    font-weight: 600;
`;

export const Text2 = styled(Text)`
    color: #d23f57;
    font-size: 12px;
    font-weight: 500;
    margin-top: 5px;
`;

export const ButtonsContainer = styled(View)`
    
`;