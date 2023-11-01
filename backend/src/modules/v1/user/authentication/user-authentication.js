import passport from 'passport';
import { Strategy } from 'passport-strategy';
import { User} from '../models/user-model';
import { responseHandler } from '../../../../utils/response-handler';
import { Session } from '../../admin/models/session-model';

class CustomuserAuthStrategy extends Strategy {
    constructor() {
        super();
    }

    async authenticate(req, options) {
        const token = req.headers.authorization;

        if (!token) {
            return this.fail('Missing authentication token', 401);
        }

        const sessionToken = token.split(' ')[1];

        try {
            const result = await Session.findOne({ session_token: sessionToken, status: 1 });

            if (!result) {
                return this.fail('Invalid session token', 401);
            }

            const user = await User.findById(result.user_id);

            if (!user) {
                return this.fail('Access denied', 401);
            }

            this.success(user);

        } catch (error) {
            return this.error('Internal server error', error);
        }
    }
}

// Create an instance of the custom strategy and use it with Passport
const customuserAuthStrategy = new CustomuserAuthStrategy();

class userAuthentication {
    constructor() {
        // Use the custom strategy instead of JWT
        passport.use('user-custom', customuserAuthStrategy);
    }

    async check(req, res, next) {
        passport.authenticate('user-custom', { session: false }, (err, user) => {
            if (err) {
                return responseHandler.errorResponse(res, err);
            }
            if (!user) {
                return responseHandler.errorResponse(res, {}, 'Authentication failed', 401);
            }

            req.user = user;
            next();
        })(req, res, next);
    }
}

export default new userAuthentication();