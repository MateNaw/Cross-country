import passport from 'passport';
import passportJWT from 'passport-jwt';
import db from '../settings/db';
import {Strategy} from 'passport-local';
import {loginUserQuery, authUserQuery} from '../settings/queries';
import {secret} from '../settings/environments';
import bcrypt from 'bcrypt';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default()=>{
    passport.use(new Strategy({
        usernameField: 'login',
        passwordField: 'pass'
    },
        async (login, pass, done)=>{
            try {
                const user = await db.query(loginUserQuery, [login]);
                if(user.length != 0) {
                    const doesMatch = await bcrypt.compare(pass, user[0].pass);
                    if (doesMatch)
                        return done(null, user);
                    else
                        return done(null, false, {message: 'Wprowadzone dane są niepoprawne.'});
                }else
                    return done(null, false, {message: 'Wprowadzone dane są niepoprawne.'});
            }catch(err){
                console.error(err);
                return done(err, false, {message: 'Wystąpił błąd podczas logowania.'});
            }
        }
    ));

    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    },
        async (payload, done)=>{
            try{
                const user = await db.query(authUserQuery, [payload.log]);
                return done(null, user)
            }catch(err){
                console.error(err);
                return done(err);
            }
        }
        ))
}