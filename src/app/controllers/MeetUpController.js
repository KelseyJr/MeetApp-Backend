import { startOfHour, parseISO, isBefore } from 'date-fns';
import Meetup from '../models/Meetup';
import MeetUpValidation from '../validations/MeetUpValidation';

class MeetUpController {
  async store(req, res) {
    if (!(await MeetUpValidation.isValid(req.body))) {
      return res.status(401).json({ error: 'MeetUp validation fails' });
    }

    const { title, description, localization, date, file_id } = req.body;

    const hourStart = startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date())) {
      return res
        .status(401)
        .json({ error: 'Past date is not allowed to create a meetup!' });
    }

    const meetup = await Meetup.create({
      title,
      description,
      localization,
      date,
      file_id,
      user_id: req.userId,
    });

    return res.json(meetup);
  }
}

export default new MeetUpController();
