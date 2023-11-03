import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";

const StripeForm = ({ artist }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url:
                    process.env.REACT_APP_CLIENT_URL + "/artists/" + artist.id,
            },
        });

        if (error) {
            setError(error.message);
            console.error(error);
        } else {
            console.log("success");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <div className="d-flex justify-content-center flex-column align-items-center mt-3">
                {error && <div className="alert alert-danger">{error}</div>}
                <button className="btn btn-primary">Confirm payment</button>
            </div>
        </form>
    );
};

export default StripeForm;
