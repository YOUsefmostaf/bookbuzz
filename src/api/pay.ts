import {create} from 'apisauce';

const headers: any = {
  Accept: 'application/json',
};
const api = create({
  baseURL: 'https://accept.paymob.com/api/',
});

export const pay = async (
  apiToken: any,
  total: any,
  cartItems: any,
  email: any,
  Fname: any,
  street: any,
  phone: any,
  city: any,
  lastName: any,
) => {
  let inares: any = undefined;
  await api
    .post('auth/tokens', {
      api_key: apiToken,
    })
    .then(async (responseOne: any) => {
      await api
        .post(
          'ecommerce/orders',
          {
            auth_token: responseOne.data.token,
            delivery_needed: 'false',
            amount_cents: total * 100,
            items: [],
            currency: 'EGP',
          },
          {
            headers,
          },
        )
        .catch(e => console.log(e))
        .then(async (responseTwo: any) => {
          const result: any = await api.post(
            'acceptance/payment_keys',
            {
              auth_token: responseOne.data.token,
              amount_cents: total * 100,
              expiration: '3600',
              order_id: responseTwo.data.id,
              billing_data: {
                apartment: 'NA',
                email: email,
                floor: 'NA',
                first_name: Fname,
                street: street,
                building: 'NA',
                phone_number: phone,
                shipping_method: 'NA',
                postal_code: 'NA',
                city: city,
                country: 'EG',
                last_name: lastName,
                state: 'NA',
              },
              currency: 'EGP',
              integration_id: '1676962',
              lock_order_when_paid: 'false',
            },
            {
              headers,
            },
          );

          inares = result.data;
          return result.data;
        })
        .catch(e => console.log('e', e));
    });
  //   tron.logImportant('res', inares);
  return inares;
};
