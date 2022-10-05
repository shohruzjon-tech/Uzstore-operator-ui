import * as yup from "yup";

const schema = yup.object().shape({
  address: yup.string().required("To'liq manzil Kiritilishi shart"),
  extra_info: yup.string(),
  status: yup.string().required("Holat belgilanishi majburiy"),
});

export default schema;
