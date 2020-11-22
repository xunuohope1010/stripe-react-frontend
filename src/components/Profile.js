import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import axios from 'axios'
import param from '../config/param'
import authHeader from "../services/auth-header";
import LinearProgress from '@material-ui/core/LinearProgress';

export default class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
            password: null,
            suggestion: null,
            process: 0
        }
    }

    componentDidMount() {
        this.setState({response: JSON.parse(localStorage.getItem('cookie'))})
        axios.get(param.URL + 'query', {headers: authHeader()}).then(res => {
            this.setState({suggestion: res.data})
        }).catch(err => {
            window.alert(err.response.data.msg)
        })
    }

    render() {

        const showResult = () => {
            if (this.state.suggestion) {
                return (
                    <div>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">

                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            username
                                        </TableCell>
                                        <TableCell>
                                            {this.state.response.username}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            email
                                        </TableCell>
                                        <TableCell>
                                            {this.state.response.email}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            First name
                                        </TableCell>
                                        <TableCell>
                                            {this.state.response.first_name}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Last name
                                        </TableCell>
                                        <TableCell>
                                            {this.state.response.last_name}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Quota purchased
                                        </TableCell>
                                        <TableCell>
                                            {this.state.suggestion['quota_purchased']}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Quota used
                                        </TableCell>
                                        <TableCell>
                                            {this.state.suggestion['quota_used']}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        {
                                            (this.state.suggestion['quota_purchased']===0)?<TableCell colSpan="2">

                                            </TableCell>:<TableCell colSpan="2">
                                                <LinearProgress variant="determinate"
                                                                value={this.state.suggestion['quota_used'] / this.state.suggestion['quota_purchased'] * 100}/>
                                            </TableCell>
                                        }
                                        {/*<TableCell colSpan="2">*/}
                                        {/*    <LinearProgress variant="determinate"*/}
                                        {/*                    value={this.state.suggestion['quota_used'] / this.state.suggestion['quota_purchased'] * 100}/>*/}
                                        {/*</TableCell>*/}
                                    </TableRow>
                                </TableBody>

                            </Table>

                        </TableContainer>
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
