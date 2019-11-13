import React from "react";
import DropIn from "braintree-web-drop-in-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getToken, payment } from "../../actions/paymentActions";
import "../../stylesheets/payment.css"


class Payment extends React.Component {

    static propTypes = {
        clientT: PropTypes.array.isRequired,
        getToken: PropTypes.func.isRequired
    };
    instance;

    state = {
        clientToken: null,
        subscription_plan_id: ""
    };
    componentDidMount() {
        this.props.getToken();
        // this.state.clientToken = this.props.clientT.client_token;
        // console.log("clientToken", this.state.clientToken)
        // const { idvalue } = this.props.location.state;
        // const { idamount } = this.props.location.state;
        // console.log("id", idamount, idvalue);
    }

    async buy() {

        const subscription_plan_id = this.props.location.state.idvalue;
        // Send the nonce to your server
        const { nonce } = await this.instance.requestPaymentMethod();
        const payment_method_nonce = `${nonce}`;

        console.log(`${nonce}`);
        console.log(subscription_plan_id);
        // await fetch(`server.test/purchase/${nonce}`);
        const newPayment = {
            subscription_plan_id,
            payment_method_nonce
        };
        console.log(payment_method_nonce);
        console.log(subscription_plan_id);

        this.props.payment(newPayment);
    };
    // onReady() {
    //     console.log('Drop-In ready')
    // }ß
    // onError(err) {
    //     console.error(err)
    // }

    // onPaymentMethodReceived(payload) {
    //     console.log(payload)

    //     // Now that you have a nonce, send it to your
    //     // server to create a payment method or a transaction
    // }

    render() {

        const clientToken = this.props.clientT.client_token
        // console.log(clientToken);

        if (clientToken) {
            return (
                <div className="Payment-MainBlock">
                    <div>Amount
                        <input className="Payment-amount" type="text" id={this.props.location.state.idvalue} value={this.props.location.state.idamount} />
                    </div>
                    <div>Payment Details<center>
                        <DropIn
                            options={{ authorization: clientToken }}
                            onInstance={instance => (this.instance = instance)}

                        /></center>
                        <button onClick={this.buy.bind(this)}>submit</button>
                    </div>

                </div>
            );

        } else {
            return (
                <div>
                    <h1>Loading...</h1>

                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    clientT: state.paymentReducers.paymentToken
});
export default connect(
    mapStateToProps,
    { getToken, payment }
)(Payment);