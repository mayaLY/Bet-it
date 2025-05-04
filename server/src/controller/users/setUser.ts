import { Request, Response } from 'express';
import { User } from '../../models/user/userModel';

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        console.log(email, password)

        const user = await User.findOne({ email, password });

        if (user) {
            console.log("user", user)
            res.cookie('userId', user._id, { maxAge: 1000 * 60 * 60 * 24 * 1 });
            res.status(200).send({ ok:true });
        } else {
            res.status(401).send({ error: 'Invalid email or password' });
        }

    } catch (error) {
        console.error(error)
        res.status(500).send(error);

    }
}

export async function register(req: Request, res: Response) {
    try {
        const { email, password, name } = req.body;

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