import React, { useState, useEffect } from "react";
import { Container } from "./styles";
import { FlatList, View, Animated } from "react-native";

import { useSelector } from "react-redux";
import { getOrderByStatus } from "../../helpers";
import EmptyPage from "../../components/page-empty/empty";
import CustomHeader from "../../components/custom-header";
import OrderCard from "../../components/cards/order";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Taken = ({ navigation, route }) => {
  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const admin = useSelector((state) => state.signin.admin);

  const getAllNew = async () => {
    setLoading(true);
    try {
      const result = await getOrderByStatus(admin.token, route?.params?.status);
      setList(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllNew();
  }, []);

  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });

  return (
    <>
      <Container>
        {route.params.isActive ? null : (
          <View style={{ marginBottom: 10 }}>
            <CustomHeader navigation={navigation} name="Buyurtmalar ro'yhati" />
          </View>
        )}
        <AnimatedFlatList
          data={list && list?.length ? list : []}
          ListEmptyComponent={<EmptyPage />}
          renderItem={({ index, item }) => (
            <OrderCard
              {...{ index, y, item }}
              taken
              getNews={getAllNew}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          refreshing={isLoading}
          onRefresh={getAllNew}
          style={{ paddingTop: 10, paddingBottom: 20 }}
          {...{ onScroll }}
        />
      </Container>
    </>
  );
};

export default Taken;
