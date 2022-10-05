import * as yup from 'yup';

const schema = yup.object().shape({
    client_full_address: yup.string().required('Tuliq manzil Kiritilishi shart'),
    client_name: yup.string().required('Mijoz ismi kiritilishi shart'),
    client_phoneNumber: yup.string().required('Mijoz Telefon raqami kiritlishi shart'),
    city_id: yup.number().required('Mijoz viloyati kiritlishi shart'),
    client_extra_info: yup.string(),
    status: yup.string().required('Holat belgilanishi majburiy'),
});


export default schema;