import {
  Container,
  Header,
  BodyContainer,
  Footer,
  InnerContainer,
  Text1,
  Text2,
  BlackBox,
  NameContainer,
  LineContainer,
  FooterSection,
  Text3,
  FooterSection2,
} from "./styles";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Dimensions,
  Animated,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { regions } from "../../regions";
import { useSelector } from "react-redux";
import { acceptOrder } from "../../helpers";
import Alert from "../alert/success";
import ErrorAlert from "../alert/error";
import { useState } from "react";

export const MARGIN = 5;
export const CARD_HEIGHT = 200 + MARGIN * 2;
const { height: wHeight } = Dimensions.get("window");
const height = wHeight - 64;
const styles = StyleSheet.create({
  card: {
    marginVertical: MARGIN,
    alignSelf: "center",
  },
});

const OrderCard = ({ y, index, item, getNews, taken, navigation }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const admin = useSelector((state) => state.signin.admin);
  const city = regions.find((reg) => reg.id === item?.city_id);
  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = -CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;
  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * CARD_HEIGHT],
        outputRange: [0, -index * CARD_HEIGHT],
        extrapolateRight: "clamp",
      })
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: "clamp",
    })
  );
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: "clamp",
  });
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });

  const getOrder = async () => {
    setLoading(true);
    try {
      await acceptOrder(admin.token, item?._id);
      setOpen(true);
      setMessage(
        "Buyurtmani qabul qildingiz! Iltimos, mijoz bilan o'z vaqatida bog'laning."
      );
      setLoading(false);
      getNews();
    } catch (error) {
      setError(true);
      let m = error?.response?.data?.message
        ? error?.response?.data?.message
        : `Nomalum xatolik yuz berdi! Tizim tamonotchilari bilan bog'laning! Xatolik kodi ${error?.code}`;
      setMessage(m);
      setLoading(false);
    }
  };

  return (
    <Animated.View
      style={[styles.card, { opacity, transform: [{ translateY }, { scale }] }]}
      key={index}
    >
      <Alert message={message} visible={open} setVisible={setOpen} />
      <ErrorAlert message={message} visible={error} setVisible={setError} />
      <Container rippleColor="rgba(0, 0, 0, .32)">
        <InnerContainer>
          <Header>
            <BlackBox>
              <Text1>5K</Text1>
            </BlackBox>
            <NameContainer>
              <Feather name="box" color="red" size={20} />
              <Text2 style={{ marginLeft: 10 }}>
                {item?.orderItems
                  ? item?.orderItems[0]?.productId?.name
                  : "Mahsulot"}
              </Text2>
            </NameContainer>
          </Header>
          <BodyContainer>
            <LineContainer>
              <FontAwesome name="user" size={20} color="green" />
              <Text2 style={{ marginLeft: 10 }}>{item.name}</Text2>
            </LineContainer>
            <LineContainer style={{ marginTop: 10 }}>
              <Ionicons name="location" size={20} color="red" />
              <Text2 style={{ marginLeft: 8 }}>{city?.label}</Text2>
            </LineContainer>
          </BodyContainer>
          <Footer>
            <FooterSection>
              <Text3>ID</Text3>
              <Text2>{item.number}</Text2>
            </FooterSection>
            {taken ? (
              <FooterSection2
                onPress={() =>
                  navigation.navigate("Buyurtma", { _id: item?._id })
                }
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Ionicons name="eye" size={20} color="#fff" />
                    <Text2 style={{ marginLeft: 8, color: "#fff" }}>
                      Ko'rish
                    </Text2>
                  </>
                )}
              </FooterSection2>
            ) : (
              <FooterSection2 onPress={isLoading ? undefined : getOrder}>
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Ionicons
                      name="add-circle-outline"
                      size={20}
                      color="#fff"
                    />
                    <Text2 style={{ marginLeft: 8, color: "#fff" }}>
                      Olish
                    </Text2>
                  </>
                )}
              </FooterSection2>
            )}
          </Footer>
        </InnerContainer>
      </Container>
    </Animated.View>
  );
};

export default OrderCard;
