import {Request, Response, NextFunction} from 'express';

import * as smsService from '../services/sms';
import BadRequestError from '../errors/BadRequestError';

import senderIds from '../constants/constants';
import { isNTC } from 'src/utils/guessPhoneNumber';
import { isNCELL } from 'src/utils/guessPhoneNumber';

export const sms = async (req: Request, res: Response, next: NextFunction) => {
    const {
        SMSREQUEST : {
            email = "",
            password = "",
            mobile = "",
            message = ""
        } = {}
    } = req.body;

    let result = {
        status: 0,
        message: "",
        body : {}
    };
    try {
        if(email === "" || password === "" || mobile === "" || message === "" ) {
            throw new BadRequestError("Bad Request")
        }

        const token = await smsService.fetchToken(email, password);
        
        let senderId = "";
        if(isNTC(mobile)){
            senderId = senderIds.ntcSenderId;
        }else if(isNCELL(mobile)) {
            senderId = senderIds.ncellSenderId;
        }
        if(senderId === "") throw new BadRequestError("Mobile Number not supported");

        const smsResponse = await smsService.send(token, mobile, message, senderId);

        result = {
            status: 200,
            message:"OK",
            body : smsResponse
        }

    }catch(error){
        
        result = {
            status: 400,
            message: "Bad Request",
            body: error
        }
    }

    res.status(result.status).send(result);
}