import User from '../models/User';
import { UserCreated, UserUpdated } from '../validations/UserValidation';

class UserController {
  async store(req, res) {
    if (!(await UserCreated.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const { name, email, password } = await User.create(req.body);
    return res.json({
      name,
      email,
      password,
    });
  }

  async update(req, res) {
    if (!(await UserUpdated.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }
    const { email } = req.body;
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      return res.status(401).json({ message: 'Email does not match' });
    }
    const { id, name } = await user.update(req.body);
    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
