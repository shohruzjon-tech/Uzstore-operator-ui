import styled from 'styled-components';
import { Text,  TouchableOpacity, View }  from 'react-native';


export const Text1 = styled(Text)`
    color: #1E0E62;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
`;


export const Text2 = styled(Text)`
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: #1E0E62;
`;


export const Text3 = styled(Text)`
    font-weight: 500;
    font-size: 15px;
    text-transform: uppercase;
    color: #000;
`;


export const ButtonOutlined = styled(TouchableOpacity)`
    border-radius: 7px;
    border: 1px solid red;
    padding: 13px 17px;
`;


export const ButtonContained = styled(TouchableOpacity)`
    border-radius: 7px;
    padding: 14px 25px;
    background: #2c76dc;
`;


export const Divider = styled(View)`
    height: 1px;
    width: 100%;
    background: #A59FC0;
    opacity: 0.7;
    margin: 25px 0;
`;