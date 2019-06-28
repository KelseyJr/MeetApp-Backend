import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExist = User.findOne({ where: { email: req.body.email } });

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
