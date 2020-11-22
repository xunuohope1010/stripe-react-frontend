import React from "react";
import axios from 'axios';
import param from '../config/param';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {CheckoutForm} from "./CheckoutForm";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";

const stripeTestPromise = loadStripe(param.PUBLIC_KEY);

export default class CheckoutComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            response:null,
            processing:false
        }
        this.getData = this.getData.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem('cookie')==null){
            this.props.history.push("/login")
            // window.location.reload()
        }
        axios.get(param.URL+'select?id='+this.props.match.params.id).then(res=>{
            this.setState({response:res.data});
        })
    }

    getData(val){
        // do not forget to bind getData in constructor
        console.log(val);
        if (val==="checking"){
            this.setState({processing:true})
        }
        else {
            this.setState({processing:false})
            // this.forceUpdate()
            window.alert(val.message)
            if (val.status===200){
                this.props.history.push("/upload")
            }

        }
    }

    render() {

        const showProcessing = ()=>{
            if (this.state.processing){
                return (
                    <div>
                        <CircularProgress />
                    </div>
                )
            }
        }

        const showResult = ()=>{
            if (this.state.response){
                return (
                    <div>

                        <Grid container spacing={3} style={{justifyContent: 'center',}}>
                            <Grid item xs={4}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    Plan
                                                </TableCell>
                                                <TableCell>
                                                    {this.state.response['title']}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    Price
                                                </TableCell>
                                                <TableCell>
                                                    $ {this.state.response['amount']/100}
                                                </TableCell>

                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    Quota number
                                                </TableCell>
                                                <TableCell>
                                                    {this.state.response['quota_number']}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>

                                    </Table>
                                </TableContainer>
                            </Grid>

                            <Grid item xs={4}>
                                <Card>
                                    <CardContent>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <Elements stripe={stripeTestPromise}>
                                                    <CheckoutForm dataFromParent={this.state.response} sendData={this.getData} />
                                                </Elements>

                                            </Grid>
                                            <Grid item xs={12}>
                                                {showProcessing()}
                                            </Grid>

                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                    </div>


                )
            }
        }

        return (
            <div>
                {showResult()}
            </div>
        );
    }
}
