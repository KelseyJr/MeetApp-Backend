import Sequelize, { Model } from 'sequelize';
import { isAfter } from 'date-fns';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        localization: Sequelize.STRING,
        date: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isAfter(new Date(), this.date);
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Subscription, { foreignKey: 'meetup_id' });
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.File, { foreignKey: 'file_id' });
  }
}

export default Meetup;
