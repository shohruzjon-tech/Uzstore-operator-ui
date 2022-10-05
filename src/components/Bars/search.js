import * as React from "react";
import { Appbar, Divider, Menu, Searchbar } from "react-native-paper";

const TopBar = ({ navigation, searchFn, loading, setType }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <Appbar.Header style={{ backgroundColor: "#fff", elevation: 3 }}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Searchbar
        style={{ width: "72%", backgroundColor: "#fff" }}
        placeholder="Izlash..."
        elevation={0}
        onChangeText={(text) => searchFn(text)}
        loading={loading}
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="cog-outline" onPress={openMenu} />}
        style={{ backgroundColor: "#fff" }}
      >
        <Menu.Item
          icon="numeric"
          onPress={() => {
            setType("number");
            closeMenu();
          }}
          title="Buyurtma raqami orqali"
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            setType("phone");
            closeMenu();
          }}
          title="Telefon raqam orqali"
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            setType("name");
            closeMenu();
          }}
          title="Buyurtmachi ismi  orqali"
        />
      </Menu>
    </Appbar.Header>
  );
};

export default TopBar;
