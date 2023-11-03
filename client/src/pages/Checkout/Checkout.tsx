import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StripeForm from "../../components/StripeForm/StripeForm";

const Checkout = () => {
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE);
    const {
        state: { artist },
    } = useLocation();
    const [state, setState] = useState({
        clientSecret: "",
        loading: true,
    });

    useEffect(() => {
        state.clientSecret === "" &&
            axios
                .post(
                    "https://api.stripe.com/v1/payment_intents",
                    new URLSearchParams({
                        amount: "2000",
                        currency: "usd",
                    }).toString(),
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            Authorization: `Bearer ${process.env.REACT_APP_STRIPE_SECRET}`,
                        },
                    },
                )
                .then((response) => {
                    setState((prevState) => ({
                        ...prevState,
                        clientSecret: response.data.client_secret,
                    }));
                })
                .catch((error) => {
                    console.error("Error creating payment intent:", error);
                })
                .finally(() =>
                    setState((prevState) => ({ ...prevState, loading: false })),
                );
    }, []);

    const options = { clientSecret: state.clientSecret };

    return (
        <div className="container bg-dark shadow shadow-md p-3">
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="bold text-muted">Order details:</div>
                    <div className="order-details">
                        <div>Artist: {artist.name}</div>
                        <div>Price: $20,0 USD</div>
                        -----------------------
                        <div>Total: $20,0 USD</div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    {!state.loading && (
                        <Elements stripe={stripePromise} options={options}>
                            <StripeForm artist={artist} />
                        </Elements>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
