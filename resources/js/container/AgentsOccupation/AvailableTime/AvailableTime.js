import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import "react-widgets/dist/css/react-widgets.css";
import styles from "./AvailableTime_Style";
import DayTimeTable from "../../../components/Navigation/Calendar/DayTimeTable/DayTimeTable";
import axios from 'axios';
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { throws } from "assert";
import moment from "moment";

class AvailableTime extends React.Component {
    state = {
        open: false,
        week_index: 0,
        specificDays: {},
        finished_render: false,
        weekly: {
            Monday: {
                standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                // interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                // interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_start_time: null,
                interval_end_time: null,
                interval_checkbox: false
                },
            Tuesday: {
                standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_start_time: null,
                interval_end_time: null,
                // interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                // interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_checkbox: false
            },
            Wednesday: {
                standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_start_time: null,
                interval_end_time: null,
                // interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                // interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_checkbox: false
            },
            Thursday: {
                standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_start_time: null,
                interval_end_time: null,
                // interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                // interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_checkbox: false
            },
            Friday: {
                standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                // interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                // interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_start_time: null,
                interval_end_time: null,
                interval_checkbox: false
            },
            Saturday: {
                standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_start_time: null,
                interval_end_time: null,
                // interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                // interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_checkbox: false
            },
            Sunday: {
                standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_start_time: null,
                interval_end_time: null,
                // interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
                // interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
                interval_checkbox: false
            }
        }
        // weekly: {
        //     Monday: {
        //         standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
        //         standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
        //         interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
        //         interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
        //         },
        //     Tuesday: {
        //         standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
        //         standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
        //         interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
        //         interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
        //     },
        //     Wednesday: {
        //         standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
        //         standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
        //         interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
        //         interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
        //     },
        //     Thursday: {
        //         standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
        //         standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
        //         interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
        //         interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
        //     },
        //     Friday: {
        //         standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
        //         standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
        //         interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
        //         interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
        //     },
        //     Saturday: {
        //         standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
        //         standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
        //         interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
        //         interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
        //     },
        //     Sunday: {
        //         standard_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
        //         standard_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
        //         interval_start_time: new Date(new Date().setHours(0, 0, 0, 0)),
        //         interval_end_time: new Date(new Date().setHours(23, 0, 0, 0)),
        //     }
        // }
    };

    handleNextWeek(){
        var week = this.state.week_index+7;
        this.setState({ week_index: week });
        console.log('Click next week');
    };

    handlePrevWeek(){
        var week = this.state.week_index-7;
        this.setState({ week_index: week });
        console.log('Click next week');
    };

    handleAvailability(user_id){
        this.setState({ open: true });
        if(this.props.token){
           var res = axios.get('/api/availability/'+this.props.token);
        }
        else {
            var res =    axios.get('/api/availability',{
                params: {
                  vref: user_id
                }
              })
        }
        
            res.then(response => {
                console.log(response);
                let days = response.data.days;
                // let timezone = Moment(response.data.days.Monday.standard_start_time).tz(response.data.timezone);
                // console.log(timezone);
                let days_copy = Object.assign({}, this.state.weekly);
                var keys = Object.keys(days); 
                var specificDaysArr = {};
                var specificDaysObj = {};

                // for(var i = 0; i < keys.length-7; i++) { 
                for(var i = 0; i < 7; i++) { 

                    let d_start = new Date();
                    let d_end = new Date();
                    days_copy[keys[i]].standard_start_time = new Date(days[keys[i]].standard_start_time.date); 
                    days_copy[keys[i]].standard_end_time= new Date(days[keys[i]].standard_end_time.date); 
                    if(days[keys[i]].interval_start_time && days[keys[i]].interval_start_time.date){
                        days_copy[keys[i]].interval_start_time  = new Date(days[keys[i]].interval_start_time.date); 
                    }
                    if(days[keys[i]].interval_end_time && days[keys[i]].interval_end_time.date){
                        days_copy[keys[i]].interval_end_time  = new Date(days[keys[i]].interval_end_time.date); 
                    }

                    // this.setState({ weekly: days[key] });
                    var key = (keys[i]) ; 
                    console.log(days[key]) 
                }

            for(var i = 7; i < keys.length; i++){
                specificDaysArr['specific_start_date'] = new Date(days[keys[i]].standard_start_time.date); 
                specificDaysArr['specific_end_date'] = new Date(days[keys[i]].standard_end_time.date); 
                // specificDaysArr['date'].specific_interval_start_date = new Date(days[keys[i]].specific_interval_start_date); 
                // specificDaysArr['date'].specific_interval_end_date = new Date(days[keys[i]].specific_interval_end_date); 
                // specificDaysObj.push(specificDaysArr);
                // specificDaysObj[new Date(days[keys[i]].standard_start_time.date).toLocaleDateString(navigator.language)] = specificDaysArr;
                
                if(i+1 >= keys.length){
                    var a = moment(new Date(days[keys[i]].standard_start_time.date));
                    var b = moment(new Date(days[keys[i]].standard_end_time.date));
                    // var a = moment( specificDaysObj[new Date(days[keys[i]].standard_start_time.date)]);
                    // var b = moment( specificDaysObj[new Date(days[keys[i]].standard_end_time.date)]);
                    if(a.startOf('day') != b.startOf('day')){
                        var time = b.toDate();
                        // console.log(time);
                        // time.set({hour:0,minute:0,second:0,millisecond:0});
                        // time.toISOString();
                        // time.format();

                        // b.setHours(0);
                        // b.setMinutes(0);
                        // b.setSeconds(0);
                        // b.setMilliseconds(0)
                        specificDaysArr['specific_start_date'] = time;
                        // days_copy[keys[i]].standard_start_time  = new Date(days[b.format('YYYY-MM-DD')].standard_start_time); 
                        // specificDaysObj[new Date(days[keys[i]].standard_start_time.date).toLocaleDateString(navigator.language)] = specificDaysArr;
                    }
                }

                specificDaysObj[new Date(days[keys[i]].standard_end_time.date).toLocaleDateString(navigator.language)] = specificDaysArr;
                
                specificDaysArr = [];
            }
                this.setState({ 
                    weekly: days_copy,
                    specificDays: specificDaysObj,
                    finished_render: true
                });
            })
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, user_id } = this.props;

        return (
            <div>
                <Button
                    onClick={() => this.handleAvailability(user_id)}
                    // onClick={this.handleAvailability}
                    variant="contained"
                    size="small"
                    classes={{ root: classes.button }}
                >
                    Check Availability
                </Button>
                {this.state.finished_render ?
                    <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    >
                        <div
                            className={`${classes.paper} ${
                                classes.centerScheduler
                            }`}
                        >
                            <Typography variant="h6" id="modal-title">
                            {this.props.user == 'owner'?
                                'Your availability':
                                'Select dates'
                            }
                            </Typography>
                            {this.state.week_index > 0 ?
                            <IconButton  onClick={() => this.handlePrevWeek()}>
                                <ChevronLeftIcon/>
                            </IconButton> : ''}
                            <IconButton  onClick={() => this.handleNextWeek()}>
                                <ChevronRightIcon/>
                            </IconButton>
                            <DayTimeTable user={this.props.user} week_index={this.state.week_index} weekly={this.state.weekly} specificDays={this.state.specificDays}/>
                            <Button
                                size="medium"
                                onClick={this.handleTimeSlot}
                                classes={{ root: classes.button }}
                            >
                                Checkout
                            </Button>
                        </div>
                    </Modal> :  
                    ''
            }
            </div>
        );
    }
}

AvailableTime.propTypes = {
    classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const AvailableTimeWrapped = withStyles(styles)(AvailableTime);

export default AvailableTimeWrapped;
