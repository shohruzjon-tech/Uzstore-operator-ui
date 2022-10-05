import React, { useEffect, useState } from "react";
import { FlatList, Animated } from "react-native";
import { Container } from "./styles";
import { useSelector } from "react-redux";
import { getStreams } from "../../helpers";
import EmptyPage from "../../components/page-empty/empty";
import OrderCard from "../../components/cards/order";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Stream = () => {
  const admin = useSelector((state) => state.signin.admin);
  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const getNews = async () => {
    setLoading(true);
    try {
      const res = await getStreams(admin.token);
      setList(res.data);
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });

  return (
    <Container>
      <AnimatedFlatList
        scrollEventThrottle={16}
        data={list && list?.length ? list : []}
        renderItem={({ index, item }) => (
          <OrderCard {...{ index, y, item }} getNews={getNews} />
        )}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        onRefresh={getNews}
        ListEmptyComponent={<EmptyPage />}
        style={{ paddingTop: 10, paddingBottom: 20 }}
        {...{ onScroll }}
      />
    </Container>
  );
};

export default Stream;
