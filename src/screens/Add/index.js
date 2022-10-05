import { useState, useEffect } from "react";
import {
  Container,
  UserAvatarContainer,
  Avatar,
  AvatarTop,
  Input,
  FormContainer,
  InputContainerAll,
  ButtonContainer,
  Button,
  ButtonText,
} from "./styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView, ActivityIndicator, Alert, Text } from "react-native";
import { useSelector } from "react-redux";
import { getUserData, updateUserSettings, uploadUserDocs } from "../../helpers";
import {
  PickerContainer,
  InputContainer,
} from "../../components/orders/order-received-item/styles";
import { Picker } from "@react-native-picker/picker";
import { Text2 } from "../../global-styles/styles";
import { regions } from "../../regions";

const AddOrder = () => {
  const admin = useSelector((state) => state.signin.admin);

  const [user, setUser] = useState(undefined);
  const [avatar, setAvatar] = useState("./assets/folder.jpg");
  const [name, setName] = useState("");
  const [telegramID, setTelegramID] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [pr, setPr] = useState(undefined);
  const getUserProfile = async () => {};

  const updateUser = async () => {
    setLoading(true);
    try {
      setLoading(false);
      getUserProfile();
      Alert.alert("✅ 👍", "Buyurtma qo'shildi!", [
        {
          text: "Tushunarli",
          onPress: () => {},
          style: "cancel",
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Xatolik",
        error.response.data.message
          ? error.response.data.message
          : error.message,
        [
          {
            text: "Tushunarli",
            onPress: () => {},
            style: "cancel",
          },
        ]
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <FormContainer>
          <InputContainerAll>
            <Input
              placeholder="Ism va Familiya"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </InputContainerAll>
          <InputContainerAll>
            <Input placeholder="Telefon raqam" value={user?.username} />
          </InputContainerAll>
          <InputContainer>
            <PickerContainer>
              <Picker
                selectedValue="new"
                name="status"
                // onValueChange={(itemValue, itemIndex) =>
                //   formik.setFieldValue("status", itemValue)
                // }
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
          <InputContainerAll>
            <Input placeholder="To'liq manzili" value={user?.phone} />
          </InputContainerAll>
          <InputContainerAll>
            <Input
              placeholder="Buyurtma soni"
              value={user?.phone}
              keyboardType="number-pad"
            />
          </InputContainerAll>
          <InputContainerAll>
            <Input
              multiline
              numberOfLines={6}
              sx={{ height: 70 }}
              placeholder="Qo'shimcha malumotlar"
              value={user?.phone}
            />
          </InputContainerAll>
          <ButtonContainer>
            <Button onPress={isLoading ? undefined : updateUser}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ButtonText>Saqlash</ButtonText>
              )}
            </Button>
          </ButtonContainer>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};

export default AddOrder;
