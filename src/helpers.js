import axios from "axios";
import { BASE_URL } from "./constants";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./services";
import uploadImageFromDevice from "./image-upload";

export async function handleLogin(params) {
  let res;
  var config = {
    method: "post",
    url: `${BASE_URL}/api/auth/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: params,
  };
  try {
    let result = await axios(config);
    res = result.data;
  } catch (error) {
    return error;
  }
  return res;
}

export async function getSingleOrder(token, id) {
  var config = {
    method: "GET",
    url: `${BASE_URL}/api/order/my/${id}`,
    headers: {
      "Content-Type": "application/json",
      auth: `12345${token}`,
    },
  };
  return await axios(config);
}

export async function getStreams(token) {
  var config = {
    method: "GET",
    url: `${BASE_URL}/api/order`,
    headers: {
      "Content-Type": "application/json",
      auth: `12345${token}`,
    },
  };

  return await axios(config);
}

export async function getUserData(token) {
  var config = {
    method: "GET",
    url: `${BASE_URL}/api/profile`,
    headers: {
      "Content-Type": "application/json",
      auth: `12345${token}`,
    },
  };
  return await axios(config);
}

export async function acceptOrder(token, id) {
  var config = {
    method: "PUT",
    url: `${BASE_URL}/api/order/taken/${id}`,
    headers: {
      "Content-Type": "application/json",
      auth: `12345${token}`,
    },
  };
  return await axios(config);
}

export async function getOrderByStatus(token, status) {
  var config = {
    method: "GET",
    url: `${BASE_URL}/api/order/my?status=${status}`,
    headers: {
      "Content-Type": "application/json",
      auth: `12345${token}`,
    },
  };
  return await axios(config);
}

export async function getProducts() {
  var config = {
    method: "GET",
    url: `https://alimp.uz/api/admin/products`,
  };
  return await axios(config);
}

export async function updateOrder(token, data, id) {
  var config = {
    method: "PUT",
    url: `${BASE_URL}/api/order/${id}`,
    headers: {
      "Content-Type": "application/json",
      auth: `12345${token}`,
    },
    data: data,
  };
  return await axios(config);
}

export async function getPaid(token, data) {
  var config = {
    method: "POST",
    url: `${BASE_URL}/api/payment`,
    headers: {
      "Content-Type": "application/json",
      auth: `12345${token}`,
    },
    data: data,
  };
  return await axios(config);
}

export async function getPaymentRequests(token) {
  var config = {
    method: "GET",
    url: `${BASE_URL}/api/payment`,
    headers: {
      "Content-Type": "application/json",
      auth: `12345${token}`,
    },
  };
  return await axios(config);
}

export async function updateUserSettings(token, data) {
  var config = {
    method: "PUT",
    url: `${BASE_URL}/api/profile`,
    headers: {
      "Content-Type": "application/json",
      auth: `12345${token}`,
    },
    data: data,
  };
  return await axios(config);
}

export async function searchByName(token, name) {
  var config = {
    method: "GET",
    url: `${BASE_URL}/api/order/search?name=${name}`,
    headers: {
      "Content-Type": "application/json",
      auth: `12345${token}`,
    },
  };
  return await axios(config);
}

export async function searchByPhone(token, phone) {
  var config = {
    method: "GET",
    url: `${BASE_URL}/api/order/search?phone=${phone}`,
    headers: {
      "Content-Type": "application/json",
      auth: `12345${token}`,
    },
  };
  return await axios(config);
}

export async function getOrderByNumber(token, data) {
  var config = {
    method: "POST",
    url: `${BASE_URL}/api/order/number`,
    headers: {
      "Content-Type": "application/json",
      auth: `12345${token}`,
    },
    data: data,
  };
  return await axios(config);
}

const getBlobFroUri = async (uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  return blob;
};

export async function uploadUserDocs(setpProgress, setUrl) {
  const url = await uploadImageFromDevice();
  const file = await getBlobFroUri(url);
  let name = Date.now();
  const storageRef = ref(storage, `images/${name}.jpg`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setpProgress(progress.toFixed(2));
    },
    (error) => {},
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setUrl(downloadURL);
        setpProgress(false);
      });
    }
  );
}
