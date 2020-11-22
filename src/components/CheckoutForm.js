import React from "react";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "axios";
import Button from "@material-ui/core/Button";
import param from '../config/param'
import authHeader from "../services/auth-header";
// import { useHistory } from "react-router";

export const CheckoutForm = props => {
    const stripe = useStripe();
    const elements = useElements();
    const paymentData = props.dataFromParent;
    // const history = useHistory();

    const handleSubmit = async (event) => {
        props.sendData("checking");
        event.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (!error) {
            console.log("Stripe 23 | token generated!", paymentMethod);
            console.log(paymentData['quota_number'])
            try {
                const {id} = paymentMethod;
                const response = await axios.post(
                    param.URL + "payment",
                    {
                        amount: paymentData.amount,
                        description:paymentData.title,
                        quota_number:paymentData['quota_number'],
                        id: id,
                    },
                    {headers: authHeader()}
                );

                // window.alert(response.data.msg);
                props.sendData({message:response.data.msg, status:200});
                // history.push('/upload')
            } catch (error) {
                console.log("CheckoutForm.js 28 | ", error);
                props.sendData({message:error, status:400});
            }
        } else {
            console.log(error.message);
            props.sendData({message:error.message, status:400});
        }
    };

    return (
        <div>
            <CardElement/>
            <Button variant="contained" color="secondary" onClick={handleSubmit}>
                Pay $ {paymentData.amount/100}
            </Button>
        </div>
    );
};
