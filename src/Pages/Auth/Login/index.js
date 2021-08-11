import {useNavigation} from '@react-navigation/native';
import {Formik, useFormik} from 'formik';
import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../Components/Atoms/Button';
import HeaderContent from '../../../Components/Atoms/HeaderContent';
import HeaderLogo from '../../../Components/Atoms/HeaderLogo';
import InputText from '../../../Components/Atoms/InputText';
import allActions from '../../../Config/Redux/Actions';
import {loginSchema} from '../../../Config/ValidationSchema/authValidationSchema';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {message, messages, user, visible, loading} = useSelector(
    state => state.auth,
  );
  const [form, setForm] = useState({email: '', password: ''});
  const {login, setVisible} = allActions.authAction;

  const formik = useFormik({
    initialValues: form,
    enableReinitialize: true,
    onSubmit: (e, a) => onFormSubmit(e, a),
    validationSchema: loginSchema,
  });

  const {
    values,
    setFieldValue,
    errors,
    setFieldTouched,
    touched,
    handleSubmit,
    isSubmitting,
  } = formik;

  const onChangeText = ({name, val}) => {
    setFieldValue(name, val);
    setForm(prevState => ({...prevState, [name]: val}));
  };

  const onFormSubmit = (value, {setSubmitting}) => {
    dispatch(login(value));
    setSubmitting(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} />
      <HeaderLogo source={require('../../../Assets/Logo/logo.jpeg')} />
      <Snackbar
        visible={visible}
        action={{
          label: 'Tutup',
          onPress: () => dispatch(setVisible()),
        }}>
        {message}
      </Snackbar>
      <View style={styles.contentContainer}>
        <HeaderContent
          title="Masuk"
          onPress={() => navigation.navigate('Auth')}
        />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{marginTop: hp(2)}}>
            <InputText
              placeholder={'Email'}
              name="email"
              value={values.email}
              error={errors.email}
              onChangeText={e => onChangeText(e)}
              onBlur={e => setFieldTouched(e)}
              isError={touched.email}
            />
            <InputText
              placeholder={'Kata Sandi'}
              name="password"
              value={values.password}
              error={errors.password}
              secureTextEntry
              errors={messages}
              onChangeText={e => onChangeText(e)}
              onBlur={e => setFieldTouched(e)}
              isError={touched.password}
            />
            <Button
              label="MASUK"
              onPress={handleSubmit}
              loading={loading || isSubmitting}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text>Belum Punya Akun? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: '#43AE1A'}}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#fff',
    height: '30%',
    paddingHorizontal: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -hp(4),
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopStartRadius: hp(4),
    borderTopEndRadius: hp(4),
    marginTop: -hp(4),
    paddingHorizontal: wp(3),
    paddingVertical: hp(3),
  },
  imageLogo: {
    height: hp(8),
    width: wp(43),
  },
  introContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hp(4),
  },
  authButton: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hp(4),
    justifyContent: 'flex-end',
  },
});

export default Login;
