import jwt from 'jsonwebtoken';
import User from '../models/User';
import SessionValidation from '../validations/SessionValidation';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    if (!(await SessionValidation.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'User does not exists' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ message: 'Password does not match' });
    }

    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
