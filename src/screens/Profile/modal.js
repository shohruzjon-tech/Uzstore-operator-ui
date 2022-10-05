import React, { useEffect } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Input, InputContainer } from "./styles";
import { DataTable } from "react-native-paper";
import { useSelector } from "react-redux";
import RowComponent from "./row";
import { getPaid, getPaymentRequests } from "../../helpers";

const PaymentModal = ({ modalVisible, setModalVisible, user }) => {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const admin = useSelector((state) => state.signin.admin);
  const [list, setList] = React.useState([]);

  const getListOfPayments = async () => {
    try {
      const res = await getPaymentRequests(admin.token);
      setList(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getListOfPayments();
  }, []);

  const addDoc = async () => {
    if (text?.length < 10 || !text) {
      Alert.alert("Xatolik", "Karta raqami juda qisqa");
      return;
    }
    if (parseInt(number) < 10000 && parseInt(number) > 0) {
      Alert.alert("Xatolik", "Eng kamida 10 ming sum yechishingiz mumkin.");
      return;
    }
    if (parseInt(number) === 0) {
      Alert.alert("Xatolik", "Hisobingizda mablag' mavjud emas");
      return;
    }
    if (parseInt(number) < 0) {
      Alert.alert("Xatolik", "Sizda qarzdorlik mavjud!");
      return;
    }
    setLoading(true);
    try {
      await getPaid(admin.token, {
        card: text,
        amount: number,
      });
      setLoading(false);
      getListOfPayments();
      onChangeNumber("");
      onChangeText("");
      Alert.alert("", "To'lov uchun so'rovingiz muvaffaqqiyatli yuborildi!", [
        {
          text: "Tushunarli",
          onPress: () => {},
          style: "cancel",
        },
      ]);
    } catch (error) {
      setLoading(false);
      Alert.alert("Xatolik", error.response.data.message);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <ScrollView style={styles.centeredView}>
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
                onPress={() => setModalVisible(!modalVisible)}
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
              To'lov uchun so'rov
            </Text>
          </View>
        </View>
        <InputContainer style={{ marginTop: 25 }}>
          <Text
            style={{
              textAlign: "left",
              width: "70%",
              color: "#2b3445",
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            To'lov uchun karta raqami
          </Text>
          <Input
            placeholder="Karta raqami"
            keyboardType="numeric"
            onChangeText={onChangeText}
            value={text}
          />
        </InputContainer>
        <InputContainer>
          <Text
            style={{
              textAlign: "left",
              width: "70%",
              color: "#2b3445",
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            To'lov so'mmasi
          </Text>
          <Input
            placeholder="To'lov summasi"
            keyboardType="numeric"
            onChangeText={onChangeNumber}
            value={number}
          />
        </InputContainer>
        <View
          style={{
            paddingHorizontal: 10,
            paddingBottom: 10,
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={addDoc}
            style={{
              backgroundColor: "#4630EB",
              paddingHorizontal: 20,
              paddingVertical: 10,
              width: "60%",
              borderRadius: 5,
              marginLeft: "auto",
              marginRight: "auto",
              marginVertical: 20,
            }}
          >
            {!isLoading ? (
              <Text style={{ color: "#fff", textAlign: "center" }}>
                SO'ROV JO'NATISH
              </Text>
            ) : (
              <ActivityIndicator size="large" color="#ffffff" />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              textAlign: "left",
              marginBottom: 15,
              width: "70%",
              color: "#2b3445",
              fontWeight: "bold",
              fontSize: 17,
              paddingHorizontal: 15,
            }}
          >
            So'rovlar tarixi
          </Text>
          <ScrollView horizontal={true} vertical={false}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={{ width: 150 }}>ID</DataTable.Title>
                <DataTable.Title style={{ width: 250 }}>Vaqti</DataTable.Title>
                <DataTable.Title style={{ width: 200 }}>
                  Hisob raqam
                </DataTable.Title>
                <DataTable.Title style={{ width: 150 }}>
                  So'ralgan Summa
                </DataTable.Title>
                <DataTable.Title style={{ width: 250 }}>
                  Admin umumiy balansi
                </DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Holat</DataTable.Title>
                <DataTable.Title style={{ width: 200 }}>Habar</DataTable.Title>
              </DataTable.Header>
              {list?.reverse()?.map((item) => (
                <RowComponent key={item?._id} {...item} {...user} />
              ))}
            </DataTable>
          </ScrollView>
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
    backgroundColor: "#fff",
  },
});

export default PaymentModal;
