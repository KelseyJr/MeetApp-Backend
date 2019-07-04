import * as Yup from 'yup';

const MeetUpStoreValidation = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  localization: Yup.string().required(),
  date: Yup.date().required(),
  file_id: Yup.number().required(),
});

const MeetUpUpdateValidation = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  localization: Yup.string().required(),
  date: Yup.date().required(),
  file_id: Yup.number().required(),
});

export { MeetUpStoreValidation, MeetUpUpdateValidation };
