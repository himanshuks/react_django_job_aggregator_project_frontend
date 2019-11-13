import React, { Component } from "react";
import "../../stylesheets/login_signup.css";


export class Forgotpassword extends Component {
    state = {
        email: ""
    };

    onSubmit = e => {
        e.preventDefault();
        console.log("Working")
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {


        const { email } = this.state;
        return (
            <div className="container-fluidmain">
                <div className="container-fluid1">
                    <div className="loginmain">
                        <center><h1 className="text-centerlogin">forgot password</h1> </center>
                        <div className="containerlogin">

                            <div className="containerlogin1">
                                <form onSubmit={this.onSubmit}>


                                    <div className="form-group">
                                        <label className="formLabel">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            onChange={this.onChange}
                                            value={email}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">
                                            Recover Password
                  </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}

export default Forgotpassword;
