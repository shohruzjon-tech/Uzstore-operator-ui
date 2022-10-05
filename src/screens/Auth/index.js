import React from "react";
import { Text1, Text2 } from "../../global-styles/styles";
import {
  Container,
  Banner,
  ImageContainer,
  FormContainer,
  InputContainer,
  Input,
  ButtonContainer,
  FormikContainer,
  Button,
} from "./styles";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import schema from "./schema";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../redux/auth-redux/signin.slice";
import AuthLoader from "../../components/global-loader/auth-loader";

const LoginPage = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.signin.error);
  const isLoading = useSelector((state) => state.signin.isLoading);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(authUser(values));
    },
  });

  if (isLoading) return <AuthLoader />;

  return (
    <Container showsVerticalScrollIndicator={false}>
      <Text2
        style={{
          color: "#000000",
          textAlign: "center",
          paddingTop: 60,
          paddingBottom: 50,
          fontSize: 17,
        }}
      >
        Salom, xurmatli Operator
      </Text2>
      <ImageContainer>
        <Banner source={require("./img.png")} />
      </ImageContainer>
      <Text2
        style={{
          fontSize: 12,
          paddingLeft: 20,
          marginTop: 20,
          color: "red",
          height: 20,
          textAlign: "center",
        }}
      >
        {error}
      </Text2>
      <FormContainer>
        <FormikContainer style={{ marginTop: 20 }}>
          <InputContainer
            style={{
              borderColor:
                formik.errors.username && formik.touched.username
                  ? "red"
                  : "#1B1B1B",
            }}
          >
            <Input
              placeholder="Login"
              value={formik.values?.username}
              onChangeText={(text) => formik.setFieldValue("username", text)}
            />
            <FontAwesome name="user-o" size={23} color="#A2A2A2" />
          </InputContainer>
          <Text2
            style={{
              fontSize: 12,
              paddingLeft: 20,
              color: "red",
              height: 15,
            }}
          >
            {formik.errors.username && formik.touched.username
              ? formik.errors.username
              : undefined}
          </Text2>
        </FormikContainer>
        <FormikContainer>
          <InputContainer
            style={{
              borderColor:
                formik.errors.password && formik.touched.password
                  ? "red"
                  : "#1B1B1B",
            }}
          >
            <Input
              placeholder="Parol"
              value={formik.values?.password}
              onChangeText={(text) => formik.setFieldValue("password", text)}
              secureTextEntry={true}
            />
            <MaterialCommunityIcons
              name="lock-outline"
              size={28}
              color="#A2A2A2"
            />
          </InputContainer>
          <Text2
            style={{
              fontSize: 12,
              paddingLeft: 20,
              color: "red",
              height: 15,
            }}
          >
            {formik.errors.password && formik.touched.password
              ? formik.errors.password
              : undefined}
          </Text2>
        </FormikContainer>
      </FormContainer>
      <ButtonContainer>
        <Button onPress={() => formik.handleSubmit()}>
          <Text1 style={{ color: "#ffffff" }}>Kirish</Text1>
        </Button>
      </ButtonContainer>
      <Text2
        style={{
          color: "#666666",
          textAlign: "center",
          paddingTop: 60,
          paddingBottom: 50,
          fontSize: 17,
        }}
      >
        version: 1.0.0
      </Text2>
    </Container>
  );
};

export default LoginPage;
