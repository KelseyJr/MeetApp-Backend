import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import SubsciptionMail from '../jobs/SubscriptionMail';
import Queue from '../../lib/Queue';
import User from '../models/User';

class SubscriptionController {
  async store(req, res) {
    const user_id = req.userId;
    const meetup_id = req.params.id;

    const meetup = await Meetup.findOne({
      where: { id: meetup_id },
      include: [User],
    });
    const user = await User.findByPk(user_id);

    if (meetup.user_id === user_id) {
      return res
        .status(401)
        .json({ error: 'You can not subscribe in your own meetup' });
    }

    if (meetup.past) {
      return res.status(401).json({
        error:
          'This meetup already happened. You can not subscribe to it anymore',
      });
    }

    const checkDate = await Subscription.findOne({
      where: { user_id },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });
    if (checkDate) {
      return res
        .status(401)
        .json({ error: 'You can not subscribe in two meetups' });
    }

    const subscription = await Subscription.create({
      user_id,
      meetup_id: meetup.id,
    });

    await Queue.add(SubsciptionMail.key, {
      meetup,
      user,
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
