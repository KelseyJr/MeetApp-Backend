import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendEmail({
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: `Novo inscrito em seu MeetUp`,
      template: 'subscription',
      context: {
        organizer: meetup.User.name,
        user: user.name,
        email: user.email,
        meetupName: meetup.title,
        date: meetup.date,
      },
    });
  }
}

export default new SubscriptionMail();
