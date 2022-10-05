import { 
    Container, 
    Avatar,
    InfoContainer,
    Text1,
    Text2, 
    ButtonsContainer
} from "./styles";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import { uz } from 'date-fns/locale';

const HorizontalOrder = ({ navigation, order })=>{
    return(
        <Container 
         onPress={()=>navigation.navigate("Buyurtma", {...order, order: order})}
        >
            <Avatar
             source={require('./images.png')}
            />
            <InfoContainer>
                <Text1>{order.client_name?.slice(0, 10)} dan buyurtma</Text1>
                <Text2>{format(new Date(order?.createdAt?.seconds*1000),"dd - MMMM HH:mm",  {locale: uz})}</Text2>
            </InfoContainer>
            <ButtonsContainer>
                <MaterialCommunityIcons
                   name='arrow-right-thin'
                   size={30}
                   color='#4F5E7B'
                 />
            </ButtonsContainer>
        </Container>
    )
};

export default HorizontalOrder;