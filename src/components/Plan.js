import React from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import param from '../config/param';
import axios from 'axios';
import {AiOutlineCheckCircle} from 'react-icons/ai';

export default class PlanComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payment: false,
            response: []
        }

    }

    componentDidMount() {
        axios.get(param.URL + 'product').then(res => {
            this.setState({response: res.data})
        })
    }

    onSelectHandler = (event, id) => {
        this.props.history.push({pathname:"/checkout/" + id});
    }

    render() {

        return (
            <div>
                <Grid container spacing={3} style={{justifyContent:"center"}}>
                    {
                        this.state.response.map((value, key) => {
                            return(
                                <Grid item xs={4} key={key} >
                                    <Card>
                                        <CardContent>

                                            <Typography variant="h5" component="h2">
                                                {value['title']}
                                            </Typography>

                                            <Typography variant="h5" component="h2" style={{color:'blue'}}>
                                                $ {value['amount']/100}
                                            </Typography>
                                            <Typography variant="h6" component="p">
                                                <AiOutlineCheckCircle style={{color:'green'}}/>  {value['quota_number']} meetings
                                            </Typography>

                                            <Typography variant="h6" component="p">
                                                <AiOutlineCheckCircle style={{color:'green'}}/>  Microphone Recording
                                            </Typography>

                                            <Typography variant="h6" component="p">
                                                <AiOutlineCheckCircle style={{color:'green'}}/>  Phone Call Recording
                                            </Typography>

                                            <Typography variant="h6" component="p">
                                                <AiOutlineCheckCircle style={{color:'green'}}/>  Upload Audio Recording
                                            </Typography>

                                            <Typography variant="h6" component="p">
                                                <AiOutlineCheckCircle style={{color:'green'}}/>  Real Time Transcript
                                            </Typography>

                                            <Typography variant="h6" component="p">
                                                <AiOutlineCheckCircle style={{color:'green'}}/>  Search Transcript
                                            </Typography>

                                            <Typography variant="h6" component="p">
                                                <AiOutlineCheckCircle style={{color:'green'}}/>  World Class Editor
                                            </Typography>

                                            <Typography variant="h6" component="p">
                                                <AiOutlineCheckCircle style={{color:'green'}}/>  AI Augmented Memo
                                            </Typography>

                                            <Typography variant="h6" component="p">
                                                <AiOutlineCheckCircle style={{color:'green'}}/>  Download and Share Transcript
                                            </Typography>

                                            <Typography variant="h6" component="p">
                                                <AiOutlineCheckCircle style={{color:'green'}}/>  Zoom Integration
                                            </Typography>

                                            <Typography variant="h6" component="p">
                                                <AiOutlineCheckCircle style={{color:'green'}}/>  Google Calendar Integration
                                            </Typography>

                                            <Typography variant="h6" component="p">
                                                <AiOutlineCheckCircle />  CRM Integration
                                            </Typography>
                                            <Typography variant="h6" component="p">
                                                <AiOutlineCheckCircle />  Customized Feature
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button variant="contained" color="secondary" onClick={(e) => this.onSelectHandler(e, value['id'])}>
                                                Select
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })
                    }

                </Grid>

            </div>
        );
    }
}
