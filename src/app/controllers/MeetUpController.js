import { parseISO, isBefore } from 'date-fns';
import Meetup from '../models/Meetup';
import {
  MeetUpStoreValidation,
  MeetUpUpdateValidation,
} from '../validations/MeetUpValidation';

class MeetUpController {
  async index(req, res) {
    const user_id = req.userId;
    const meetup = await Meetup.findAll({ where: { user_id } });
    return res.json(meetup);
  }

  async store(req, res) {
    if (!(await MeetUpStoreValidation.isValid(req.body))) {
      return res.status(401).json({ error: 'MeetUp validation fails' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res
        .status(401)
        .json({ error: 'Past date is not allowed to create a meetup!' });
    }

    const user_id = req.userId;

    const meetup = await Meetup.create({
      ...req.body,
      user_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    if (!(await MeetUpUpdateValidation.isValid(req.body))) {
      return res.status(401).json({ error: 'MeetUp validation fails' });
    }

    const meetup = await Meetup.findByPk(req.params.id);

    const user_id = req.userId;

    if (meetup.user_id !== user_id) {
      return res
        .status(401)
        .json({ error: 'You can not update meetup from others users' });
    }

    if (meetup.past) {
      return res.status(401).json({ error: 'You can not update past meetup' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res
        .status(401)
        .json({ error: 'Past date is not allowed to update a meetup!' });
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);
    const user_id = req.userId;

    if (meetup.user_id !== user_id) {
      return res
        .status(401)
        .json({ error: 'You can not update meetup from others users' });
    }

    if (meetup.past) {
      return res.status(401).json({ error: 'You can not delete past meetup' });
    }

    await meetup.destroy();

    return res.send();
  }
}

export default new MeetUpController();
