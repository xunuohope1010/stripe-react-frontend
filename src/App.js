import './App.css';
import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import LoginComponent from "./components/Login";
import SignupComponent from "./components/Signup";
import ProfileComponent from "./components/Profile";
import UploadComponent from "./components/Upload";
import PlanComponent from "./components/Plan";
import CheckoutComponent from "./components/Checkout";

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        }
    }


    componentDidMount() {
        this.setState({redirect: false})
        const cookie = JSON.parse(localStorage.getItem('cookie'));
        if (cookie) {
            this.setState({
                currentUser: cookie,
            })
        }
    }

    logOut = () => {
        localStorage.removeItem("cookie");
    }

    render() {

        const {currentUser} = this.state;
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        Interview
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>

                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    Profile
                                </Link>
                            </li>
                        )}

                        <li className="nav-item">
                            <Link to={"/plan"} className="nav-link">
                                Plan
                            </Link>
                        </li>

                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/upload"} className="nav-link">
                                    Upload
                                </Link>
                            </li>
                        )}

                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={() => this.logOut()}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/signup"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home}/>
                        <Route exact path="/login" component={LoginComponent}/>
                        <Route exact path="/signup" component={SignupComponent}/>
                        <Route exact path="/profile" component={ProfileComponent}/>
                        <Route exact path="/upload" component={UploadComponent}/>
                        <Route exact path="/plan" component={PlanComponent}/>
                        <Route path="/checkout/:id" component={CheckoutComponent}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

