import React, {Component} from "react";
import axios from 'axios'
import param from '../config/param'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: ""
        };
    }

    componentDidMount() {
        axios.get(param.URL + 'all').then(res => {
            this.setState({response: res.data.msg})
        })
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Typography variant="h3" gutterBottom>
                    {this.state.response}
                </Typography>
            </Grid>
        );
    }
}
