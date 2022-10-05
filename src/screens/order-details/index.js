import React, { useEffect, useState } from "react";
import {
  Container,
  Item,
  Info,
  TotalContainer,
  StyledButton,
  ButtonContainer,
  FormContainer,
  InputContainer,
  Input,
  PickerContainer,
} from "../../components/orders/order-received-item/styles";
import {
  ViewConatiner,
  OrderListContainer,
  Text10,
  ProductsContainer,
  ProductCard,
  ProductAvatar,
  Text11,
  Text12,
  Button2,
  ButtonsContainer,
} from "./styles";
import {
  Text2,
  Text3,
  ButtonContained,
  Divider,
} from "../../global-styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Linking,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import schema from "../../components/orders/order-received-item/schema";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import CustomHeader from "../../components/custom-header";
import AddProductModal from "./modal";
import { deleteProduct } from "../../redux/order-product/product.slice";
import { regions } from "../../regions";
import { updateOrder } from "../../helpers";
import {
  addProduct,
  setProductList,
} from "../../redux/order-product/product.slice";
import { getSingleOrder } from "../../helpers";
import Alert from "../../components/alert/success";
import ErrorAlert from "../../components/alert/error";

const getStatus = (data) => {
  switch (data) {
    case "new":
      return "Yangi buyurtma";
    case "ready":
      return "Dastafkaga tayyor";
    case "onway":
      return "Yo'lda";
    case "delivered":
      return "Yetkazildi";
    case "hold":
      return "Hold";
    case "canceled":
      return "Atkaz";
    case "archived":
      return "Arxivda";
    default:
      return "yangi";
  }
};

const makeDefined = (data) => {
  switch (data) {
    case undefined:
      return "";
    case null:
      return "";
    default:
      return data;
  }
};

const ReceivedOrder = ({
  navigation,
  route: {
    params: { _id },
  },
}) => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [error, setErr] = useState(false);
  const [sms, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const orderProducts = useSelector((state) => state.orderProduct.list);
  const admin = useSelector((state) => state.signin.admin);
  const [isLoading, setLoading] = useState(false);
  const [isGetLoading, setGetLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    phone,
    name,
    city_id,
    status,
    createdAt,
    address,
    message,
    extra_info,
    note,
    number,
    orderItems,
    streamId,
  } = data;

  const updateOrderProduct = (product) => {
    dispatch(deleteProduct(product));
  };

  const openPhone = () => {
    Linking.openURL(`tel:${phone}`);
  };

  const formik = useFormik({
    initialValues: {
      address: makeDefined(address),
      extra_info: makeDefined(extra_info),
      status: status,
      city_id: city_id,
      message: makeDefined(message),
      note: makeDefined(note),
      name: name,
      phone: phone,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(true);
      const dataPost = orderProducts.map((doc) => ({
        productId: doc._id,
        quantity: doc.quantity,
      }));
      try {
        await updateOrder(
          admin.token,
          {
            ...values,
            orderItems: dataPost,
          },
          _id
        );
        setSuccess(true);
        setLoading(false);
        setMessage("Buyurtma yangilandi!");
      } catch (error) {
        let msg = error?.response?.data?.message
          ? error?.response?.data?.message
          : `Nomalum xatolik! Iltimos tizim taminotchilari bilan bog'laning! Xato kodi: ${error?.code}`;
        setLoading(false);
        setErr(true);
        setMessage(msg);
      }
    },
  });

  const totalPrice = orderItems?.reduce((a, b) => {
    return a + b.productId.price * b.quantity;
  }, 0);

  const getOrderData = async () => {
    setGetLoading(true);
    try {
      const res = await getSingleOrder(admin.token, _id);
      setData(res?.data);
      dispatch(setProductList(res?.data?.orderItems));
      setGetLoading(false);
    } catch (error) {
      let msg = error?.response?.data?.message
        ? error?.response?.data?.message
        : `Nomalum xatolik! Iltimos tizim taminotchilari bilan bog'laning! Xato kodi: ${error?.code}`;
      setErr(true);
      setMessage(msg);
      setGetLoading(false);
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  useEffect(() => {
    formik.setFieldValue("address", address ? address : "");
    formik.setFieldValue("extra_info", extra_info ? extra_info : "");
    formik.setFieldValue("status", status ? status : "");
    formik.setFieldValue("city_id", city_id ? city_id : "");
    formik.setFieldValue("message", message ? message : "");
    formik.setFieldValue("note", note ? note : "");
    formik.setFieldValue("name", name ? name : "");
    formik.setFieldValue("phone", phone ? phone : "");
  }, [data]);

  return (
    <ViewConatiner
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      refreshControl={
        <RefreshControl refreshing={isGetLoading} onRefresh={getOrderData} />
      }
    >
      <CustomHeader navigation={navigation} name="Buyurtma haqida" />
      <AddProductModal open={open} setOpen={setOpen} orderID={_id} />
      <Alert message={sms} visible={success} setVisible={setSuccess} />
      <ErrorAlert message={sms} visible={error} setVisible={setErr} />
      <ButtonsContainer>
        <Button2 onPress={() => setOpen(true)}>
          <Text style={{ color: "#fff" }}>MAHSULOT QO'SHISH</Text>
        </Button2>
      </ButtonsContainer>
      <TotalContainer>
        <Container>
          <Item>
            <Ionicons
              name="information-circle-outline"
              size={25}
              color="#A59FC0"
            />
            <Info>
              <Text3>Raqami</Text3>
              <Text2 style={{ color: "#d23f57" }}>{number}</Text2>
            </Info>
          </Item>
          <Item>
            <Foundation name="telephone" size={25} color="#A59FC0" />
            <Info>
              <Text3>Telefon</Text3>
              <Text2>{phone}</Text2>
            </Info>
          </Item>
          <Item>
            <Ionicons name="logo-usd" size={25} color="#A59FC0" />
            <Info>
              <Text3>Qiymati</Text3>
              <Text2>
                {totalPrice?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                so'm
              </Text2>
            </Info>
          </Item>
          <Item>
            <Ionicons name="time-outline" size={25} color="#A59FC0" />
            <Info>
              <Text3>Vaqti</Text3>
              <Text2>
                {createdAt
                  ? format(new Date(createdAt), "dd - MMMM HH:mm", {
                      locale: uz,
                    })
                  : null}
              </Text2>
            </Info>
          </Item>
          <Item>
            <Ionicons name="md-sync-circle-sharp" size={25} color="#A59FC0" />
            <Info>
              <Text3>Holati</Text3>
              <Text2 style={{ color: "#d23f57" }}>{getStatus(status)}</Text2>
            </Info>
          </Item>
        </Container>
        <Divider />
        <FormContainer>
          <InputContainer>
            <Text2>Ismi</Text2>
            <Input
              placeholder="Ismi"
              name="name"
              value={formik.values.name}
              onChangeText={(text) => formik.setFieldValue("name", text)}
            />
            <Text2 style={{ color: "red", fontSize: 11 }}>
              {formik.errors.name && formik.touched.name
                ? formik.errors.name
                : undefined}
            </Text2>
          </InputContainer>
          <InputContainer>
            <Text2>Telefon raqami</Text2>
            <Input
              placeholder="Telefon raqami"
              name="phone"
              value={formik.values.phone}
              onChangeText={(text) => formik.setFieldValue("phone", text)}
            />
            <Text2 style={{ color: "red", fontSize: 11 }}>
              {formik.errors.phone && formik.touched.phone
                ? formik.errors.phone
                : undefined}
            </Text2>
          </InputContainer>
          <InputContainer>
            <Text2>Viloyati</Text2>
            <PickerContainer>
              <Picker
                selectedValue={formik.values.city_id}
                name="city_id"
                onValueChange={(itemValue, itemIndex) =>
                  formik.setFieldValue("city_id", itemValue)
                }
              >
                {regions?.map((item) => (
                  <Picker.Item
                    key={item?.id}
                    label={item?.label}
                    value={item?.id}
                  />
                ))}
              </Picker>
            </PickerContainer>
          </InputContainer>
          <InputContainer>
            <Text2>To'liq Manzil</Text2>
            <Input
              placeholder="Manzil"
              name="address"
              value={formik.values.address}
              onChangeText={(text) => formik.setFieldValue("address", text)}
              multiline
              numberOfLines={3}
            />
            <Text2 style={{ color: "red", fontSize: 11 }}>
              {formik.errors.address && formik.touched.address
                ? formik.errors.address
                : undefined}
            </Text2>
          </InputContainer>
          <InputContainer>
            <Text2>Qo'shimcha malumotlar</Text2>
            <Input
              placeholder={`Qo'shimcha malumotlar`}
              numberOfLines={8}
              style={{ height: 100 }}
              name="extra_info"
              value={formik.values.extra_info}
              onChangeText={(text) => formik.setFieldValue("extra_info", text)}
            />
          </InputContainer>
          {streamId ? (
            <InputContainer>
              <Text2>Admin uchun habar</Text2>
              <Input
                placeholder={`Admin uchun habar`}
                name="note"
                value={formik.values.note}
                onChangeText={(text) => formik.setFieldValue("note", text)}
                multiline
                numberOfLines={8}
                style={{ height: 100 }}
              />
            </InputContainer>
          ) : null}
          <InputContainer>
            <Text2>Holati</Text2>
            <PickerContainer>
              <Picker
                selectedValue={formik.values.status}
                name="status"
                onValueChange={(itemValue, itemIndex) =>
                  formik.setFieldValue("status", itemValue)
                }
              >
                <Picker.Item label="Yangi" value="new" />
                <Picker.Item label="Dasrafkaga tayyor" value="ready" />
                <Picker.Item label="Yo'lda" value="onway" />
                <Picker.Item label="yetkazildi" value="delivered" />
                <Picker.Item label="Hold" value="hold" />
                <Picker.Item label="Atkaz" value="canceled" />
                <Picker.Item label="Arxivga" value="archived" />
              </Picker>
            </PickerContainer>
          </InputContainer>
        </FormContainer>
        <OrderListContainer>
          <Text10>Mijoz buyurtma qilgan mahsulotlar</Text10>
          <ProductsContainer>
            {orderProducts?.map((item) => {
              return (
                <ProductCard key={item?._id}>
                  <ProductAvatar source={{ uri: item?.image }} />
                  <View>
                    <Text11>{item?.name.slice(0, 7)}</Text11>
                    <Text12>
                      {item?.price
                        ?.toString()
                        ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      so'm
                    </Text12>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => dispatch(addProduct(item))}
                      style={{
                        backgroundColor: "#14a800",
                        padding: 8,
                        borderRadius: 8,
                      }}
                    >
                      <AntDesign name="plus" color="#fff" size={15} />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: "#373f50",
                        marginRight: 10,
                        marginLeft: 10,
                        fontSize: 18,
                      }}
                    >
                      {item?.quantity || 1}
                    </Text>
                    <TouchableOpacity
                      onPress={() => updateOrderProduct(item)}
                      style={{
                        backgroundColor: "#c00",
                        padding: 8,
                        borderRadius: 8,
                      }}
                    >
                      <AntDesign name="minus" color="#fff" size={15} />
                    </TouchableOpacity>
                  </View>
                </ProductCard>
              );
            })}
          </ProductsContainer>
          <ButtonContainer style={{ marginTop: 20, marginBottom: 60 }}>
            <StyledButton color="green" onPress={openPhone}>
              <Ionicons name="call" size={20} color="#fff" />
            </StyledButton>
            <ButtonContained
              onPress={isLoading ? undefined : formik.handleSubmit}
              style={{ width: 120, alignItems: "center" }}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size={20} />
              ) : (
                <Text2 style={{ color: "white" }}>Saqlash</Text2>
              )}
            </ButtonContained>
          </ButtonContainer>
        </OrderListContainer>
      </TotalContainer>
    </ViewConatiner>
  );
};

export default ReceivedOrder;
