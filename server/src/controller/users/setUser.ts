import { Request, Response } from 'express';
import { User } from '../../models/user/userModel';
//import jwt from 'jwt-simple';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function login(req: any, res: any) {
  try {
    const secret = process.env.JWT_SECRET as string;
    const { email, password } = req.body;

    console.log(email, password);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    // JWT payload
    const payload = {
      userId: user._id,
      email: user.email,
      fullName: user.fullname,
    };

    // Generate JWT token
    const token = jwt.sign(payload, secret, { expiresIn: '1d' });

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return res.status(200).send({ ok: true, user: payload });

  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
}

export async function register(req: any, res: any) {
    try {
      
        const { email, password, name } = req.body;
        console.log(email,password,name);

        //save username and password to database
        const user = new User({ email, password, name });


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'User already exists' })
        }

        await user.save()
        //@ts-ignore


        res.status(200).send({ ok: true });

    } catch (error) {
        console.error(error)
        res.status(500).send(error);

    }
}