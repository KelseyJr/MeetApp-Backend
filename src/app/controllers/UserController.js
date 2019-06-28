import User from '../models/User';
import { UserCreated } from '../validations/UserValidation';

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
}

export default new UserController();
