import * as ImagePicker from "expo-image-picker";

const hasMediaLibraryPermissionGranted = async () => {
  let granted = false;

  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.canAskAgain || permission.status === "denied") {
    granted = false;
  }

  if (permission.granted) {
    granted = true;
  }

  return granted;
};

const uploadImageFromDevice = async () => {
  let imgURI = null;
  const storagePermissionGranted = await hasMediaLibraryPermissionGranted();

  // Discard execution when  media library permission denied
  if (!storagePermissionGranted) return imgURI;

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
  });

  if (!result.cancelled) {
    imgURI = result.uri;
  }

  return imgURI;
};

export default uploadImageFromDevice;
