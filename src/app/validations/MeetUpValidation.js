import * as Yup from 'yup';

const MeetUpValidation = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  localization: Yup.string().required(),
  date: Yup.date().required(),
  file_id: Yup.number().required(),
});

export default MeetUpValidation;
