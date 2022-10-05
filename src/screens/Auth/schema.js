import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required("Login kiritilishi shart"),
  password: yup
    .string()
    .min(4, "Parol juda qisqa!")
    .required("Parol kiritilishi shart"),
});

export default schema;
