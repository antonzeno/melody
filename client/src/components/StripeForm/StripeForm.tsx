import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StripeForm = ({ artist }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const { user } = useRecoilValue(authState);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);

            if (!stripe || !elements) {
                return;
            }

            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: process.env.REACT_APP_CLIENT_URL + "/artists/" + artist.id,
                },
                redirect: "if_required",
            });

            if (error) {
                setError(error.message);
            }
        } catch (error) {
            setError(error);
        } finally {
            createOrder();
            setSubmitting(false);
        }
    };

    const createOrder = async () => {
        const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/order/create", {
            data: {
                amount: 20,
                userId: user.id,
                artistId: artist.id,
            },
        });
        if (response.status === 200) {
            navigate("/artists/" + artist.id);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <div className="d-flex justify-content-center flex-column align-items-center mt-3">
                {error && <div className="alert alert-danger">{error}</div>}
                <button className="btn btn-primary" disabled={submitting}>
                    {submitting ? "Processing payment ..." : "Confirm payment"}
                </button>
            </div>
        </form>
    );
};

export default StripeForm;
