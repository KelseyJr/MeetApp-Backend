import * as Yup from 'yup';

const UserCreated = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
});

const UserUpdated = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
  confirm_password: Yup.string()
    .required()
    .when('password', (password, field) =>
      password ? field.oneOf([Yup.ref('password')]) : field
    ),
});

export { UserCreated, UserUpdated };
