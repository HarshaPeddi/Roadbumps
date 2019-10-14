import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { DateRange } from 'react-date-range';
import 'rc-time-picker/assets/index.css';
import { connect } from 'react-redux';

export default class DateAndTimePicker extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = this.props.data
        // this.disabledMinutes = this.disabledMinutes.bind(this);
        // this.setFromOpen = this.setFromOpen.bind(this);
        // this.setToOpen = this.setToOpen.bind(this);
        // this.setFromClose = this.setFromClose.bind(this);
        // this.setToClose = this.setToClose.bind(this);
        // const isFromClosable = false;
        // const isToClosable = false;
        // const prevToValue = this.state.toTime
        // const prevFromValue = this.state.fromTime
        this.handleRangeChange = this.handleRangeChange.bind(this);
    }


    handleRangeChange(range) {
        this.setState({
            range
        });
    }

    applyClick = () => {
        // this.state.dateRange.selection.startDate.setHours(moment(this.state.fromTime).hours(), moment(this.state.fromTime).minutes())
        // this.state.dateRange.selection.endDate.setHours(moment(this.state.toTime).hours(), moment(this.state.toTime).minutes())
        // this.props.data.dateRange = this.state.dateRange;
        // this.props.data.fromTime = this.state.fromTime;
        // this.props.data.toTime = this.state.toTime;
        // this.props.getSelectedDateAndTime(this.state);
        this.props.openCloseCalendarWindow(this.state.range, true);
    }

    cancelClick = () => {
        this.props.openCloseCalendarWindow();
    }

    // onChangeFromTime = (value) => {
    //     if(value!==null){
    //         this.isFromClosable = false
    //         this.setState({
    //             fromTime: value
    //         });
    //         if(this.state.dateRange.selection.startDate.getTime() === this.state.dateRange.selection.endDate.getTime() && value.isAfter(this.state.toTime)){
    //             this.setState({
    //                 toTime: value
    //             });
    //         }
    //     }else{
    //         this.isFromClosable = true
    //     }
    // }

    // onChangeToTime = (value)=>{
    //     if(value!==null){
    //         this.isToClosable = false
    //         if( this.state.dateRange.selection.startDate.getTime() === this.state.dateRange.selection.endDate.getTime()){
    //             if(value.isSameOrAfter(this.state.fromTime)){
    //                 this.setState({
    //                     toTime: value
    //                 });
    //             }
    //         }else{
    //             this.setState({
    //                 toTime: value
    //             });
    //         }
    //     }else{
    //         this.isToClosable = true
    //     }
    // }

    // disabledHours = () => {
    //     this.state.dateRange.selection.startDate.setHours(0,0,0,0)
    //     this.state.dateRange.selection.endDate.setHours(0,0,0,0)
    //     let hours = this.generateOptions(24,[-1])
    //     if(this.state.dateRange.selection.startDate.getTime() === this.state.dateRange.selection.endDate.getTime() && this.state.fromTime.minutes() === 59){
    //         return hours.slice(0,this.state.fromTime.hours()+1);
    //     }else if(this.state.dateRange.selection.startDate.getTime() === this.state.dateRange.selection.endDate.getTime()){
    //         return hours.slice(0,this.state.fromTime.hours());
    //     }else{
    //         return []
    //     }
    // }

    // generateOptions(length, excludedOptions) {
    //     const arr = [];
    //     for (let value = 0; value < length; value++) {
    //       if (excludedOptions.indexOf(value) < 0) {
    //         arr.push(value);
    //       }
    //     }
    //     return arr;
    //   }

    // disabledMinutes(h) {
    //     if(this.state.dateRange.selection.startDate.getTime() === this.state.dateRange.selection.endDate.getTime()){
    //         if(h===this.state.fromTime.hours()){
    //             return this.generateOptions(this.state.fromTime.minutes(), [-1]);
    //         }else{
    //             return this.generateOptions(0, [-1]);
    //         }
    //     }
    // }

    // setFromClose() {
    //     if(this.isFromClosable){
    //         this.setState({
    //             fromOpen: false
    //         });
    //     }else{
    //         this.setState({
    //             fromTime: this.prevFromValue,
    //             toTime: this.prevToValue,
    //             fromOpen: false
    //         });
    //     }
    // }

    // setToClose() {
    //     if(this.isToClosable){
    //         this.setState({
    //             toOpen: false
    //         });
    //     }else{
    //         this.setState({
    //             toTime: this.prevToValue,
    //             toOpen: false
    //         });
    //     }
    // }

    // setToOpen() {
    //     this.setState({
    //         toOpen: true
    //     });
    //     this.isToClosable = false
    //     this.prevToValue = this.state.toTime
    // }

    // setFromOpen() {
    //     this.setState({
    //         fromOpen: true
    //     });
    //     this.isFromClosable = false
    //     this.prevFromValue = this.state.fromTime
    //     this.prevToValue = this.state.toTime
    // }
     
    render() {
        const tickmarkSvgBlack = <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 24 16"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>;
        const tickmarkSvgGreen = <svg xmlns="http://www.w3.org/2000/svg" fill="#61AB0C" width="12px" height="12px" viewBox="0 0 24 16"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>;
        return (
            <div >
                <div className="date-time-modal">
                    <div className="date-time-modal-content">
                        <Row className="date-picker-container">
                            <DateRange
                                className="date-picker-temp"
                                onChange={this.handleRangeChange}
                                moveRangeOnFirstSelection={false}
                              //  ranges={[this.state.dateRange.selection]}
                                maxDate={new Date()}
                                numberOfMonths={1}
                                className={'PreviewArea'}
                            />

                            {/* <Calendar
                                className="date-picker-temp"
                              //  onChange={this.handleRangeChange.bind(this, 'dateRange')}
                                moveRangeOnFirstSelection={false}
                              //  ranges={[this.state.dateRange.selection]}
                                maxDate={new Date()}
                                numberOfMonths={1}
                                className={'PreviewArea'}
                            /> */}
                        </Row>
                        <Row onClick={this.applyClick} className="accept-button hover-hand">Apply</Row>
                        <Row onClick={this.cancelClick} className="cancel-button hover-hand">Cancel</Row>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedSources:state.selectedSources
    };
};
DateAndTimePicker= connect(mapStateToProps,null)(DateAndTimePicker);