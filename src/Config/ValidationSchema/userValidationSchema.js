import * as yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const addUserValidationSchema = yup.object().shape({
  fullname: yup.string().required('Nama Lengkap Tidak Boleh Kosong'),
  email: yup
    .string()
    .email('Email Tidak Valid')
    .required('Email Tidak Boleh Kosong'),
  phone: yup
    .string()
    .required('No HP Tidak Boleh Kosong')
    .matches(phoneRegExp, 'No HP tidak valid'),
});

export const updatePasswordValidationSchema = yup.object().shape({
  old_password: yup
    .string()
    .required('Kata Sandi Sebelumnya Tidak Boleh Kosong'),
  new_password: yup
    .string()
    .min(6, 'Kata sandi minimal terdiri 6 karakter')
    .required('Kata sandi tidak boleh kosong'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('new_password'), null], 'Kata sandi tidak sesuai')
    .required('Konfirmasi Kata sandi tidak boleh kosong'),
});
