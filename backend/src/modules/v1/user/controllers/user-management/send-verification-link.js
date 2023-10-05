import mailContent from "../../../../../utils/mail-content";
import { responseHandler } from "../../../../../utils/response-handler";
import { User } from "../../models/user-model";
import crypto from 'crypto';

class SendVerificationLink {

    constructor() {
    }

    /**
     * @description   API for Password Reset Token Link send thorugh Email 
     * @param {*} req /api/v1/user/password-reset-link-mail
     * @param {*} res 
     */

    async update(req, res) {

        try {

            const user = await User.findOne({ email: req.query.email }).exec()
            if (!user) return responseHandler.errorResponse(res, {}, "Email not found", 400);
            const updates = setToken(user.email)
            // send email 
            await mailContent.verificationMail(updates)
            if (updates) {
                return responseHandler.successResponse(res, {}, "Verification sent successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "Failed to send verification mail", 400);
            }
        }

        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new SendVerificationLink();


export const setToken = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Generate and set password reset token
            const resetToken = crypto.randomBytes(32).toString("hex");
            const resetTokenExpires = Date.now() + 3600000; // 60 minutes
            const updates = await User.findOneAndUpdate({ email: email }, { reset_token: resetToken, token_expires: resetTokenExpires }, { new: true });
            resolve(updates)
        }
        catch (err) {
            reject(err)
        }
    })
}

