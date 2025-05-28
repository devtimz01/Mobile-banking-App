import  * as yup from "yup"

const transactionSchema = yup.object({
    amount:yup.number().required(),
    accountId: yup.string().trim().required()
});

export const transactionValidationSchema ={
    transactionSchema
}