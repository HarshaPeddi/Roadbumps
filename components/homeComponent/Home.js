import React, { Component } from 'react';
import MapLayer from '../mapComponent/MapLayer'
import SideBar from '../sideBarComponent/sideBar'
import Chart from '../barChartComponent/BarChart';
import 'leaflet/dist/leaflet.css';
import { connect } from 'react-redux';
import { saveDates, saveBarchartDATA, saveBackgroundColorForBarchart, saveBorderColorForBarchart } from '../../redux/actions/chartActions';
import { DATES, DATA, BACKGROUND_COLOR_FOR_BARCHART, BORDER_COLOR_FOR_BARCHART } from "../../Helpers/Constants";
import DateAndTimePicker from '../sideBarComponent/dateTimePicker'
import {dateTimePickerFlag} from '../sideBarComponent/sideBar'



export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dates : DATES,
            data: DATA,
            backgroundColor: BACKGROUND_COLOR_FOR_BARCHART,
            borderColor: BORDER_COLOR_FOR_BARCHART,
            selectedDate: DATES[0],
            horizontalBarWidth: 51,
            chartContentContainerWidth : 57,
            outerBarChartContainerWidth : 1028,
            chartContainerRightPadding : "10%",
            dateTimePickerFlag: false
        }
    }

    resizeContainersAndBar = () => {
        var outerContainerWidth = 10.757 + (this.state.dates.length * 1.081)
        var barContentContainerWidth = 44 + (this.state.dates.length * 1.081)    
        var barWidth = 54 + (this.state.dates.length * 1.081)    

        this.setState({
            outerBarChartContainerWidth : outerContainerWidth,
            chartContentContainerWidth : barContentContainerWidth,   
            horizontalBarWidth: barWidth,         
        });
    }

    setRightPadding = () => {
        var rightPadding = 42.459458 - (this.state.dates.length * 0.486486)

        this.setState({
            chartContainerRightPadding : rightPadding
        });
    }

    componentWillMount() {
        this.resizeContainersAndBar()
        this.setRightPadding()
        this.props.dispatch(saveDates(this.state.dates))
        this.props.dispatch(saveBarchartDATA(this.state.data))
        this.props.dispatch(saveBackgroundColorForBarchart(this.state.backgroundColor))
        this.props.dispatch(saveBorderColorForBarchart(this.state.borderColor))
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.selectedDate !== this.state.selectedDate && nextProps.selectedDate !== undefined){
            this.setState({
                selectedDate : nextProps.selectedDate
            });
        } 
    }

    openCloseCalendarWindow =()=>{
        this.setState({
            dateTimePickerFlag:!this.state.dateTimePickerFlag
        });
    }

    render() {
        return (
            <div >
                <SideBar openCloseCalendarWindow={this.openCloseCalendarWindow}></SideBar>
                        {this.state.dateTimePickerFlag && <DateAndTimePicker openCloseCalendarWindow={this.openCloseCalendarWindow}></DateAndTimePicker>}
                <div className="map-container">
                    <MapLayer> </MapLayer>
                    <div className="bar-chart-container" style={{width: this.state.outerBarChartContainerWidth + "%", right: this.state.chartContainerRightPadding + "%"}}> 
                        <div className="bar-chart-content-container" style={{width: this.state.chartContentContainerWidth + "%"}}>
                            <div>
                                <Chart />
                            </div>
                            <div className="horizontal-bar">
                                <hr className="style1" style={{width: this.state.horizontalBarWidth + "%"}}></hr>
                            </div>
                            <div className="date-placeholder">
                                {this.state.selectedDate}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedDate: state.selectedDate
    };
};
Home= connect(mapStateToProps,null)(Home);