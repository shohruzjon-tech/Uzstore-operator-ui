import { useState, useEffect } from "react";
import {
  Container,
  UserAvatarContainer,
  Avatar,
  AvatarTop,
  Input,
  FormContainer,
  InputContainer,
  ButtonContainer,
  Button,
  ButtonText,
} from "./styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView, ActivityIndicator, Alert, Text } from "react-native";
import { useSelector } from "react-redux";
import { getUserData, updateUserSettings, uploadUserDocs } from "../../helpers";

const Settings = () => {
  const admin = useSelector((state) => state.signin.admin);

  const [user, setUser] = useState(undefined);
  const [avatar, setAvatar] = useState("./assets/folder.jpg");
  const [name, setName] = useState("");
  const [telegramID, setTelegramID] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [pr, setPr] = useState(undefined);
  const getUserProfile = async () => {
    try {
      const result = await getUserData(admin.token);
      setUser(result.data.operator);
      setAvatar(result.data.operator.avatar);
      setTelegramID(result.data.operator.telegramID?.toString());
      setName(result.data.operator.name);
    } catch (error) {
      Alert.alert("Xatolik", error.response.data.message, [
        {
          text: "Tushunarli",
          onPress: () => {},
          style: "cancel",
        },
      ]);
    }
  };


  const updateUser = async () => {
    setLoading(true);
    try {
      await updateUserSettings(admin.token, {
        name: name,
        telegramID: telegramID,
        avatar: avatar,
      });
      setLoading(false);
      getUserProfile();
      Alert.alert("✅ 👍", "Profil yangilandi!", [
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

  const uploadUserAvatar = async () => {
    await uploadUserDocs(setPr, setAvatar);
    setPr(undefined);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <UserAvatarContainer>
          <Avatar source={{ uri: avatar }} />
          <AvatarTop onPress={uploadUserAvatar}>
            <MaterialCommunityIcons
              name="camera-enhance"
              size={20}
              color="#0f3460"
            />
          </AvatarTop>
        </UserAvatarContainer>
        <Text
          style={{
            marginTop: 10,
            color: "#4630EB",
          }}
        >
          {pr ? `${pr} % yuklandi` : ""}
        </Text>
        <FormContainer>
          <InputContainer>
            <Input
              placeholder="Ism va Familiya"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </InputContainer>
          <InputContainer>
            <Input placeholder="Login" value={user?.username} disabled />
          </InputContainer>
          <InputContainer>
            <Input placeholder="Telefon raqam" value={user?.phone} />
          </InputContainer>
          <InputContainer>
            <Input
              placeholder="Telegram ID"
              value={telegramID ? telegramID : ""}
              onChangeText={(text) => setTelegramID(text)}
            />
          </InputContainer>
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

export default Settings;
