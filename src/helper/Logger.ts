import 'text-encoding-polyfill';
import Toast from 'react-native-toast-message';
import Joi from 'joi';
const AddressSchema = Joi.object().keys({
  name: Joi.string().required().min(2).max(50).messages({
    'string.base': 'الاسم مطلوب حد ادنى 2 وحد اقصي 50 حرف',
    'string.empty': 'الاسم مطلوب حد ادنى 2 وحد اقصي 50 حرف',
    'string.min': 'الاسم مطلوب حد ادنى 2 وحد اقصي 50 حرف',
    'string.max': 'الاسم مطلوب حد ادنى 2 وحد اقصي 50 حرف',
    'any.required': 'الاسم مطلوب حد ادنى 2 وحد اقصي 50 حرف',
  }),
  number: Joi.string().required().min(10).max(12).messages({
    'string.base': ' رقم الموبايل مطلوب مكون من كود الدولة ورقم الموبايل ',
    'string.empty': ' رقم الموبايل مطلوب مكون من كود الدولة ورقم الموبايل ',
    'string.min': ' رقم الموبايل مطلوب مكون من كود الدولة ورقم الموبايل ',
    'string.max': ' رقم الموبايل مطلوب مكون من كود الدولة ورقم الموبايل ',
    'any.required': ' رقم الموبايل مطلوب مكون من كود الدولة ورقم الموبايل ',
  }),
  gov: Joi.string().required().min(5).max(50).messages({
    'string.base': 'المحافظة المطلوبة للتسليم حد ادنى 5 احرف وحد اقصي 50 حرف',
    'string.empty': 'المحافظة المطلوبة للتسليم حد ادنى 5 احرف وحد اقصي 50 حرف',
    'string.min': 'المحافظة المطلوبة للتسليم حد ادنى 5 احرف وحد اقصي 50 حرف',
    'string.max': 'المحافظة المطلوبة للتسليم حد ادنى 5 احرف وحد اقصي 50 حرف',
    'any.required': 'المحافظة المطلوبة للتسليم حد ادنى 5 احرف وحد اقصي 50 حرف',
  }),
  city: Joi.string().required().min(3).max(50).messages({
    'string.base': ' المدينة مطلوبة للتسليم حد ادنى 3 احرف وحد اقصي 50 حرف',
    'string.empty': ' المدينة مطلوبة للتسليم حد ادنى 3 احرف وحد اقصي 50 حرف',
    'string.min': ' المدينة مطلوبة للتسليم حد ادنى 3 احرف وحد اقصي 50 حرف',
    'string.max': ' المدينة مطلوبة للتسليم حد ادنى 3 احرف وحد اقصي 50 حرف',
    'any.required': ' المدينة مطلوبة للتسليم حد ادنى 3 احرف وحد اقصي 50 حرف',
  }),
  street: Joi.string().required().min(3).max(50).messages({
    'string.base': ' الشارع مطلوب للتسليم حد ادنى 3 احرف وحد اقصي 50 حرف',
    'string.empty': ' الشارع مطلوب للتسليم حد ادنى 3 احرف وحد اقصي 50 حرف',
    'string.min': ' الشارع مطلوب للتسليم حد ادنى 3 احرف وحد اقصي 50 حرف',
    'string.max': ' الشارع مطلوب للتسليم حد ادنى 3 احرف وحد اقصي 50 حرف',
    'any.required': ' الشارع مطلوب للتسليم حد ادنى 3 احرف وحد اقصي 50 حرف',
  }),
  building: Joi.string().required().min(1).max(50).messages({
    'string.base': ' رقم المبني مطلوب للتسليم حد ادنى 1 احرف وحد اقصي 50 حرف',
    'string.empty': ' رقم المبني مطلوب للتسليم حد ادنى 1 احرف وحد اقصي 50 حرف',
    'string.min': ' رقم المبني مطلوب للتسليم حد ادنى 1 احرف وحد اقصي 50 حرف',
    'string.max': ' رقم المبني مطلوب للتسليم حد ادنى 1 احرف وحد اقصي 50 حرف',
    'any.required': ' رقم المبني مطلوب للتسليم حد ادنى 1 احرف وحد اقصي 50 حرف',
  }),
  floor: Joi.string().required().min(1).max(50).messages({
    'string.base': ' رقم الطابق مطلوب للتسليم حد ادنى 1 احرف وحد اقصي 50 ',
    'string.empty': ' رقم الطابق مطلوب للتسليم حد ادنى 1 احرف وحد اقصي 50 ',
    'string.min': ' رقم الطابق مطلوب للتسليم حد ادنى 1 احرف وحد اقصي 50 ',
    'string.max': ' رقم الطابق مطلوب للتسليم حد ادنى 1 احرف وحد اقصي 50 ',
    'any.required': ' رقم الطابق مطلوب للتسليم حد ادنى 1 احرف وحد اقصي 50 ',
  }),
  Apartment: Joi.string().required().min(1).max(50).messages({
    'string.base': 'رقم الشقة مطلوب للتسليم حد ادنى 1 احرف وحد اقصي 50',
    'string.empty': 'رقم الشقة مطلوب للتسليم حد ادنى 1 احرف وحد اقصي 50',
    'string.min': 'رقم الشقة مطلوب للتسليم حد ادنى 1 احرف وحد اقصي 50',
    'string.max': 'رقم الشقة مطلوب للتسليم حد ادنى 1 احرف وحد اقصي 50',
    'any.required': 'رقم الشقة مطلوب للتسليم حد ادنى 1 احرف وحد اقصي 50',
  }),
});
const ProfileSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).messages({
    'string.base':
      'الاسم الاول من اسمك مطلوب كحد ادنى 2 احرف الى 50 حرف حد اقصي',
    'string.empty':
      'الاسم الاول من اسمك مطلوب كحد ادنى 2 احرف الى 50 حرف حد اقصي',
    'string.min':
      'الاسم الاول من اسمك مطلوب كحد ادنى 2 احرف الى 50 حرف حد اقصي',
    'string.max':
      'الاسم الاول من اسمك مطلوب كحد ادنى 2 احرف الى 50 حرف حد اقصي',
    'any.required':
      'الاسم الاول من اسمك مطلوب كحد ادنى 2 احرف الى 50 حرف حد اقصي',
  }),
  last_name: Joi.string().min(2).max(50).messages({
    'string.base':
      'الاسم الثانى من اسمك مطلوب كحد ادنى 2 احرف الى 50 حرف حد اقصي',
    'string.empty':
      'الاسم الثانى من اسمك مطلوب كحد ادنى 2 احرف الى 50 حرف حد اقصي',
    'string.min':
      'الاسم الثانى من اسمك مطلوب كحد ادنى 2 احرف الى 50 حرف حد اقصي',
    'string.max':
      'الاسم الثانى من اسمك مطلوب كحد ادنى 2 احرف الى 50 حرف حد اقصي',
    'any.required':
      'الاسم الثانى من اسمك مطلوب كحد ادنى 2 احرف الى 50 حرف حد اقصي',
  }),
  phone: Joi.string().min(5).max(15).messages({
    'string.base': 'رقم الموبايل مطلوب مكون من كود الدولة ثم رقم الموبايل',
    'string.empty': 'رقم الموبايل مطلوب مكون من كود الدولة ثم رقم الموبايل',
    'string.min': 'رقم الموبايل مطلوب مكون من كود الدولة ثم رقم الموبايل',
    'string.max': 'رقم الموبايل مطلوب مكون من كود الدولة ثم رقم الموبايل',
    'any.required': 'رقم الموبايل مطلوب مكون من كود الدولة ثم رقم الموبايل',
  }),
  email: Joi.string()
    .email({tlds: {allow: false}})
    .messages({
      'string.base': 'رقم الموبايل مطلوب مكون من كود الدولة ثم رقم الموبايل',
      'string.empty': 'رقم الموبايل مطلوب مكون من كود الدولة ثم رقم الموبايل',
      'string.min': 'رقم الموبايل مطلوب مكون من كود الدولة ثم رقم الموبايل',
      'string.max': 'رقم الموبايل مطلوب مكون من كود الدولة ثم رقم الموبايل',
      'any.required': 'رقم الموبايل مطلوب مكون من كود الدولة ثم رقم الموبايل',
    }),
  birthdate: Joi.date().allow(null, '').optional(),
});
export const validateAddress = (data: any) => {
  let {error, value, warning} = AddressSchema.validate(data);
  return {error, value, warning};
};
export const _try = (func: any) => {
  try {
    return func;
  } catch (error) {
    Toast.show({type: 'error', text1: error});
  }
};

export const validateProfile = (data: any) => {
  let result = ProfileSchema.validate(data);
  return result;
};
