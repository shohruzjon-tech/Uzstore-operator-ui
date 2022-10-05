import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getProducts } from "../../helpers";
import { addProduct } from "../../redux/order-product/product.slice";
import { useDispatch } from "react-redux";

const AddProductModal = ({ open, setOpen, orderID }) => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getProductsList = async () => {
    setLoading(true);
    try {
      const result = await getProducts();
      setProducts(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsList();
  }, []);

  const updateOrder = (product) => {
    dispatch(addProduct(product));
    Alert.alert("", "Mahsulot buyurtmaga qo'shildi!", [
      {
        text: "Tushunarli",
        onPress: () => {},
        style: "cancel",
      },
    ]);
  };

  const filteredProducts = products.filter((item) =>
    item?.name?.toLowerCase()?.includes(query.toLocaleLowerCase())
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        setOpen(!open);
      }}
    >
      <ScrollView
        style={styles.centeredView}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getProductsList} />
        }
      >
        <View style={styles.header}>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View>
              <Ionicons
                name="md-arrow-back"
                size={28}
                color="#2b3445"
                onPress={() => setOpen(!open)}
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                width: "70%",
                color: "#2b3445",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Mahsulot qo'shish
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Mahsulotni qidirish"
              onChangeText={(text) => setQuery(text)}
            />
          </View>
          <View>
            {filteredProducts?.map((item) => {
              return (
                <View key={item?._id} style={styles.item}>
                  <Image
                    source={{ uri: item?.image }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 40,
                    }}
                  />
                  <View>
                    <Text style={{ color: "#000", fontSize: 18 }}>
                      {item?.name?.slice(0, 8)}
                    </Text>
                    <Text
                      style={{ color: "#000", fontSize: 15, marginTop: 10 }}
                    >
                      {item?.price
                        ?.toString()
                        ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      so'm
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#4630EB",
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      marginLeft: 8,
                    }}
                    onPress={() => updateOrder(item)}
                  >
                    <Text style={{ color: "#fff" }}>QO'SHISH</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ffffff",
    elevation: 6,
    padding: 10,
    paddingLeft: 22,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  centeredView: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  item: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    elevation: 4,
    marginBottom: 10,
  },
});

export default AddProductModal;
