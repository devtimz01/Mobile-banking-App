import * as yup from 'yup'
import { AccountType } from '../enums/account-enums';

const userAccountSchema=yup.object({
    type: yup.string().trim().required().oneOf(Object.values(AccountType))

});

const validationSchema={
    userAccountSchema
};

export default validationSchema;