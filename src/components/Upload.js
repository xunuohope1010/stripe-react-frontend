import React from "react";
import axios from 'axios';
import param from '../config/param';
import authHeader from "../services/auth-header";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import {Table} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default class UploadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null
        }
    }

    componentDidMount() {
        axios.get(param.URL + 'query', {headers: authHeader()}).then(res => {
            this.setState({response: res.data})
        })
    }

    onFileChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        })
    }

    onFileUploadHandler = () => {
        if (!this.state.selectedFile) {
            window.alert("file not selected!");
            return;
        }
        const data = new FormData();
        data.append('file', this.state.selectedFile);
        this.setState({loading: true, response: null})
        axios.post(param.URL + 'upload', data, {headers: authHeader()}).then(res => {
            if (res.status === 200) {
                window.alert(res.data.msg)
                this.componentDidMount();
            }
        }).catch(err => {
            window.alert(err.response.data.msg);
        })
    }

    render() {

        const showResult = () => {
            if (this.state.response) {
                return (
                    <div>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            Quota purchased
                                        </TableCell>
                                        <TableCell>
                                            {this.state.response['quota_purchased']}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Quota used
                                        </TableCell>
                                        <TableCell>
                                            {this.state.response['quota_used']}

                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        {
                                            (this.state.response['quota_purchased'] === 0) ? <TableCell colSpan="2">

                                            </TableCell> : <TableCell colSpan="2">
                                                <LinearProgress variant="determinate"
                                                                value={this.state.response['quota_used'] / this.state.response['quota_purchased'] * 100}/>
                                            </TableCell>
                                        }
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <input type={'file'} onChange={(e) => this.onFileChangeHandler(e)}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" color="secondary" onClick={() => this.onFileUploadHandler()}
                                        disabled={(this.state.response['quota_used'] === this.state.response['quota_purchased'])}>
                                    Upload
                                </Button>
                                {/*disabled={(this.state.suggestion['quota_used'] === this.state.suggestion['quota_purchased'])}*/}
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
