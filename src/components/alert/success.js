import { Button, Paragraph, Dialog, Portal } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import { View } from "react-native";

const Alert = ({ visible, setVisible, message }) => {
  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <AntDesign name="checkcircleo" color="green" size={30} />
        </View>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Tushunarli</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default Alert;
