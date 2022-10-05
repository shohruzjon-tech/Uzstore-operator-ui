import { useState } from "react";
import { getOrderByNumber, searchByName, searchByPhone } from "../../helpers";
import { useSelector } from "react-redux";
import TopBar from "../../components/Bars/search";

import { FlatList, Animated } from "react-native";
import EmptyPage from "../../components/page-empty/empty";
import OrderCard from "../../components/cards/order";
import { Text } from "react-native-paper";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const getName = (n) => {
  switch (n) {
    case "number":
      return "Buyurtma raqami orqali qidirilmoqda";

    case "phone":
      return "Buyurtma mijoz telefon raqami orqali qidirilmoqda";

    case "name":
      return "Buyurtma mijoz ismi orqali qidirilmoqda";

    default:
      return "Nomalum qidiruv shakli!";
  }
};

const Search = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [type, setType] = useState("number");
  const admin = useSelector((state) => state.signin.admin);

  const getResult = async (number) => {
    setLoading(true);
    try {
      const res = await getOrderByNumber(admin.token, {
        orderNumber: number,
        _id: admin._id,
      });
      let dt = res?.data?._id ? [res.data] : res.data;
      setList(dt);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getResultByName = async (query_name) => {
    setLoading(true);
    try {
      const res = await searchByName(admin.token, query_name);
      setList(res?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getResultByPhone = async (query_phone) => {
    setLoading(true);
    try {
      const res = await searchByPhone(admin.token, query_phone);
      setList(res?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });

  return (
    <>
      <TopBar
        navigation={navigation}
        searchFn={
          type === "number"
            ? getResult
            : type === "phone"
            ? getResultByPhone
            : type === "name"
            ? getResultByName
            : undefined
        }
        loading={isLoading}
        setType={setType}
      />
      {!list || list?.length === 0 ? (
        <Text
          style={{
            color: "#666666",
            fontSize: 14,
            textAlign: "center",
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
        >
          {getName(type)}...
        </Text>
      ) : null}
      <AnimatedFlatList
        data={list && list?.length ? list : []}
        ListEmptyComponent={<EmptyPage />}
        renderItem={({ index, item }) => (
          <OrderCard {...{ index, y, item }} taken navigation={navigation} />
        )}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: 10, paddingBottom: 20 }}
        {...{ onScroll }}
      />
    </>
  );
};

export default Search;
