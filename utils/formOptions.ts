import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(4, 'Минимальная длина 4 символа!')
        .required('Поле обязательно!'),
    email: Yup.string().email('Неправильный Email!')
        .required('Поле обязательно!'),
    password: Yup.string()
        .required('Поле обязательно!')
        .min(6, 'Минимальная длина пароля 6 символов!'),
    confirmPassword: Yup.string()
        .required('Поле обязательно!')
        .oneOf([Yup.ref('password')], 'Пароли не совпадают')

});

export const fullFormOptions = { resolver: yupResolver(validationSchema) };

const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Неправильный Email!')
        .required('Поле обязательно!'),
    password: Yup.string()
        .required('Поле обязательно!')
        .min(6, 'Минимальная длина пароля 6 символов!')
});


export const loginFormOptions = { resolver: yupResolver(loginValidationSchema) };

const shippingValidationSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Поле обязательно!')
        .min(6, 'Минимальная длина 6 символов!'),
    address: Yup.string()
        .required('Поле обязательно!'),
    city: Yup.string()
        .required('Поле обязательно!'),
    postalCode: Yup.string()
        .required('Поле обязательно!')
        .min(6, 'Минимальная длина 6 символов!'),
    country: Yup.string()
        .required('Поле обязательно!'),
});


export const shippingFormOptions = { resolver: yupResolver(shippingValidationSchema) };