import { useState, useEffect } from "react";
import {
  Container,
  UserIntro,
  Avatar,
  InfoContainer,
  BalanceContainer,
  GridContainer,
  GridItem,
  ItemInfoContainer,
  GridOddContainer,
} from "./styles";
import { Text3, Text2, Text1 } from "../../global-styles/styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import format from "date-fns/format";
import { uz } from "date-fns/locale";
import { Text, TouchableOpacity, RefreshControl, View } from "react-native";
import PaymentModal from "./modal";
import { getUserData } from "../../helpers";
import { regions } from "../../regions";

const AdminStatistics = ({ navigation }) => {
  const admin = useSelector((state) => state.signin.admin);
  const [list, setList] = useState([]);
  const [user, setUser] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const region = regions.find((doc) => doc.id === user?.region);

  const getUserProfile = async () => {
    setLoading(true);
    try {
      const result = await getUserData(admin.token);
      setUser(result.data.operator);
      setList(result.data.userOrderCount);
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <>
      <Container
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getUserProfile} />
        }
      >
        {user ? (
          <PaymentModal
            setModalVisible={setOpen}
            modalVisible={open}
            user={user}
          />
        ) : null}
        <UserIntro>
          <Avatar source={{ uri: user?.avatar }} />
          <InfoContainer>
            <Text1 style={{ color: "#2b3445", marginLeft: 4 }}>
              {user?.name}
            </Text1>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <BalanceContainer>
                <FontAwesome5 name="coins" size={18} color="#FFCC00" />
                <Text3 style={{ marginLeft: 10, color: "#d23f57" }}>
                  {user?.balance
                    ?.toString()
                    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  so'm
                </Text3>
              </BalanceContainer>
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={{
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: "#4630EB",
                  marginLeft: 10,
                }}
              >
                <Text style={{ color: "#fff" }}>SO'ROV</Text>
              </TouchableOpacity>
            </View>
          </InfoContainer>
        </UserIntro>
        <GridContainer>
          <GridOddContainer>
            <GridItem>
              <ItemInfoContainer onPress={() => navigation.navigate("yangi")}>
                <Text2
                  style={{
                    textAlign: "center",
                    color: "#d23f57",
                    fontSize: 20,
                  }}
                >
                  {list?.new}
                </Text2>
                <Text2
                  style={{
                    textAlign: "center",
                    color: "#7d879c",
                    marginTop: 10,
                  }}
                >
                  Olinganlar
                </Text2>
              </ItemInfoContainer>
            </GridItem>
            <GridItem>
              <ItemInfoContainer onPress={() => navigation.navigate("tayyor")}>
                <Text2
                  style={{
                    textAlign: "center",
                    color: "#d23f57",
                    fontSize: 20,
                  }}
                >
                  {list?.ready}
                </Text2>
                <Text2
                  style={{
                    textAlign: "center",
                    color: "#7d879c",
                    marginTop: 10,
                  }}
                >
                  Dastafkaga tayyor
                </Text2>
              </ItemInfoContainer>
            </GridItem>
          </GridOddContainer>
          <GridOddContainer>
            <GridItem>
              <ItemInfoContainer onPress={() => navigation.navigate("onway")}>
                <Text2
                  style={{
                    textAlign: "center",
                    color: "#d23f57",
                    fontSize: 20,
                  }}
                >
                  {list?.onway}
                </Text2>
                <Text2
                  style={{
                    textAlign: "center",
                    color: "#7d879c",
                    marginTop: 10,
                  }}
                >
                  Yo'lda
                </Text2>
              </ItemInfoContainer>
            </GridItem>
            <GridItem>
              <ItemInfoContainer
                onPress={() => navigation.navigate("delivered")}
              >
                <Text2
                  style={{
                    textAlign: "center",
                    color: "#d23f57",
                    fontSize: 20,
                  }}
                >
                  {list?.delivered}
                </Text2>
                <Text2
                  style={{
                    textAlign: "center",
                    color: "#7d879c",
                    marginTop: 10,
                  }}
                >
                  Yetkazildi
                </Text2>
              </ItemInfoContainer>
            </GridItem>
          </GridOddContainer>
          <GridOddContainer>
            <GridItem>
              <ItemInfoContainer onPress={() => navigation.navigate("hold")}>
                <Text2
                  style={{
                    textAlign: "center",
                    color: "#d23f57",
                    fontSize: 20,
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {list?.hold}
                </Text2>
                <Text2
                  style={{
                    textAlign: "center",
                    color: "#7d879c",
                    marginTop: 10,
                  }}
                >
                  Hold
                </Text2>
              </ItemInfoContainer>
            </GridItem>
            <GridItem>
              <ItemInfoContainer onPress={() => navigation.navigate("atkaz")}>
                <Text2
                  style={{
                    textAlign: "center",
                    color: "#d23f57",
                    fontSize: 20,
                  }}
                >
                  {list?.canceled}
                </Text2>
                <Text2
                  style={{
                    textAlign: "center",
                    color: "#7d879c",
                    marginTop: 10,
                  }}
                >
                  Atkazlar
                </Text2>
              </ItemInfoContainer>
            </GridItem>
          </GridOddContainer>
          <GridOddContainer>
            <GridItem>
              <ItemInfoContainer
                onPress={() => navigation.navigate("archived")}
              >
                <Text2
                  style={{
                    textAlign: "center",
                    color: "#d23f57",
                    fontSize: 20,
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {list?.archived}
                </Text2>
                <Text2
                  style={{
                    textAlign: "center",
                    color: "#7d879c",
                    marginTop: 10,
                  }}
                >
                  Arxiv
                </Text2>
              </ItemInfoContainer>
            </GridItem>
          </GridOddContainer>
        </GridContainer>
        <UserIntro style={{ flexDirection: "column", marginBottom: 20 }}>
          <GridOddContainer>
            <ItemInfoContainer style={{ width: "50%" }}>
              <Text2 style={{ textAlign: "left", color: "#7d879c" }}>
                Telefon
              </Text2>
              <Text2
                style={{ textAlign: "left", color: "#2b3445", marginTop: 5 }}
              >
                {user?.phone}
              </Text2>
            </ItemInfoContainer>
            <ItemInfoContainer style={{ width: "40%" }}>
              <Text2 style={{ textAlign: "left", color: "#7d879c" }}>
                Viloyati
              </Text2>
              <Text2
                style={{ textAlign: "left", color: "#2b3445", marginTop: 5 }}
              >
                {region?.label}
              </Text2>
            </ItemInfoContainer>
          </GridOddContainer>
          <GridOddContainer>
            <ItemInfoContainer style={{ width: "60%" }}>
              <Text2 style={{ textAlign: "left", color: "#7d879c" }}>
                Qo'shilgan vaqti
              </Text2>
              <Text2
                style={{ textAlign: "left", color: "#2b3445", marginTop: 5 }}
              >
                {user
                  ? format(
                      new Date(user?.createdAt),
                      "dd - MMMM, yyyy, HH:mm",
                      {
                        locale: uz,
                      }
                    )
                  : undefined}
              </Text2>
            </ItemInfoContainer>
            <ItemInfoContainer style={{ width: "40%" }}>
              <Text2 style={{ textAlign: "left", color: "#7d879c" }}>
                Jami To'langan
              </Text2>
              <Text2
                style={{ textAlign: "left", color: "#d23f57", marginTop: 5 }}
              >
                {user?.paid?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                so'm
              </Text2>
            </ItemInfoContainer>
          </GridOddContainer>
        </UserIntro>
      </Container>
    </>
  );
};

export default AdminStatistics;
