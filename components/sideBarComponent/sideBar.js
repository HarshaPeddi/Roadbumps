import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import FordLogo from '../../Images/FordOval_Blue_RGB_v1.svg';
import EditIcon from '../../Images/EditIcon.svg';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {latLongGeo} from '../../Helpers/convertcsv'
import {findMinAndMax, getDates} from '../../Helpers/Constants'
import DateAndTimePicker from '../sideBarComponent/dateTimePicker';
import { saveDates } from '../../redux/actions/chartActions';

const Range = Slider.Range;

class SideBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            latLongGeo:latLongGeo,
            mageRange: {
                min: 0,
                max: 0
            },
            counRange: {
                min: 0,
                max: 0
            },
            magValue: [0, 0],
            couValue: [0, 0],
            dateTimePickerFlag: false,
            range: null,
            type: 'POTHOLE'
        }
        this.onChangeMagnitudeSlider = this.onChangeMagnitudeSlider.bind(this);
        this.onChangeCountSlider = this.onChangeCountSlider.bind(this);
        this.getMinMaxCount = this.getMinMaxCount.bind(this);
    }

    componentDidMount() {
        this.getMinMaxCount('POTHOLE');
    }

    getMinMaxCount(type) {        
        const [magMin, magMax] = findMinAndMax(latLongGeo.features, 'magnitude', type.toUpperCase(), this.state.range);
        const [couMin, couMax] = findMinAndMax(latLongGeo.features, 'events_count', type.toUpperCase(), this.state.range);
        this.setState({
            mageRange: {
                min: magMin,
                max: magMax
            },
            counRange: {
                min: couMin,
                max: couMax
            },
            magValue: [magMin, magMax],
            couValue: [couMin, couMax],
            type
        });
    }

    onChangeMagnitudeSlider(value) {
        this.setState({magValue: value}, () => {
            const element = document.querySelector('.magnitude-scroll .rc-slider-handle-1');
            element.setAttribute('data-before', this.state.magValue[0]);
            const element2 = document.querySelector('.magnitude-scroll .rc-slider-handle-2');
            element2.setAttribute('data-before', this.state.magValue[1]);
        });
    }

    onChangeCountSlider(value) {
        this.setState({couValue: value}, () => {
            const element = document.querySelector('.count-scroll .rc-slider-handle-1');
            element.setAttribute('data-before', this.state.couValue[0]);
            const element2 = document.querySelector('.count-scroll .rc-slider-handle-2');
            element2.setAttribute('data-before', this.state.couValue[1]);
        });
    }

    radioButtonController= (radioButtonName)=>{
        if(this.state.radioButtonClicked===radioButtonName){
            this.setState({
                radioButtonClicked:'',
                radioButtonFlag:false
            });
        }else{
            if (this.state.selecEventCloseOpen) {
                this.setState({
                    radioButtonClicked:radioButtonName + " ",
                    radioButtonFlag:!this.state.radioButtonFlag
                });
            } else {
                this.getMinMaxCount(radioButtonName);
                this.setState({
                    radioButtonClicked:radioButtonName,
                    radioButtonFlag:!this.state.radioButtonFlag
                });
            }
        }
    }

    openCloseCalendarWindow = (range, applied)=>{
        this.setState({
            dateTimePickerFlag:!this.state.dateTimePickerFlag,
            range: applied ? range : this.state.range
        }, () => {
            if (applied) {
                this.getMinMaxCount(this.state.type);
                this.props.dispatch(saveDates(getDates(range.startDate.clone(), range.endDate.clone())));
            }
        });
    }

    render() {
        const { mageRange: { min, max }, counRange, range = {} } = this.state;
        const { startDate = {}, endDate } = range || {};
        const { _locale = {} } = startDate || {};
        return(
        <div className="side-bar-container">
            <div className="imageBlock">
                <div className="imagePlaceHolder">
                    <img className="ford-logo"  src ={FordLogo}></img>
                </div>
            </div>

            <div className="TextBlock">
                <p className="textArea">Citywide pothole and bumps road map</p>
            </div>

            <div className="radioSelectorBlock">
                <div className="anamolyTextContainer">
                    <text>Anomaly :</text>
                </div>
                <div className="radioSelectorcontainer">
                    <div onClick={()=>{this.radioButtonController('Pothole')}} className="anamoly-sources hover-hand">
                        <div className="radio-button">
                            <div className={['float-left',(this.state.radioButtonClicked==='Pothole')?'radio-selector-on':'radio-selector-off'].join(" ")}></div>
                            <div className={['float-left',(this.state.radioButtonClicked==='Pothole')?'source-name-selected':'source-name-deselected'].join(" ")}>Pothole</div>
                        </div>
                    </div>
                    <div onClick={()=>{this.radioButtonController('Bump')}} className="anamoly-sources hover-hand">
                        <div className="radio-button">
                            <div className={['float-left',(this.state.radioButtonClicked==='Bump')?'radio-selector-on':'radio-selector-off'].join(" ")}></div>
                            <div className={['float-left',(this.state.radioButtonClicked==='Bump')?'source-name-selected':'source-name-deselected'].join(" ")}>Bump</div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="line"/>
            <div className="magnitude-component">
                <div className="MagnitudeTextContainer">
                    <text>Magnitude:</text>
                    <div className="scrollbar magnitude-scroll">
                        <Range allowCross={false} className="hover-hand" min={min} max={max} value={this.state.magValue} onChange={this.onChangeMagnitudeSlider} marks={{[min]: min, [max]: max}}/>
                    </div>
                    <div  className={this.state.radioButtonClicked === 'Bump' ? 'bump-image-container' : 'hidden'}/>
                    <div  className={this.state.radioButtonClicked === 'Pothole' ? 'Pothole-image-container' : 'hidden'}/>
                </div>
            </div>
            <hr className="line"/>
            <div className="magnitude-component">
                <div className="anamolyTextContainer">
                    <text>Count:</text>
                    <div className="scrollbar count-scroll">
                        <Range allowCross={false} className="hover-hand" min={counRange.min} max={counRange.max} value={this.state.couValue} onChange={this.onChangeCountSlider} marks={{[counRange.min]: counRange.min, [counRange.max]: counRange.max}}/>
                    </div>       
                </div>
            </div>
            <hr className="line"/>
            <div className="Date-picker-container">
                <div className="anamolyTextContainer">
                    <text>Date:</text>
                </div>

                <Row className="date-time-text-container ">
                    {range && startDate._d && <>
                        <Col className="month-text float-left">{_locale._monthsShort[startDate._d.getMonth()]}</Col>
                        <Col className="day-text float-left">{startDate._d.getDate()}</Col>
                        <Col className="day-text float-left"> - </Col>

                        <Col className="month-text float-left">{_locale._monthsShort[endDate._d.getMonth()]}</Col>
                        <Col className="day-text float-left">{endDate._d.getDate()}</Col>
                        <Col className="day-text float-left"> , </Col>
                        <Col className="time-text float-left">{endDate._d.getFullYear()}</Col>
                    </>}
                    {(!range || !startDate._d ) && <Col className="select-text">Select Date</Col>}

                    <div className="edit-icon float-left hover-hand" onClick={this.openCloseCalendarWindow}>
                        <img className="edit-icon-url" src={EditIcon}></img>                         
                    </div>
                </Row>
            </div>
            
            <div className="anamoly-selecton-display-box">
                <span className="anamoly-selecton-display-text">{this.state.radioButtonClicked}</span>
            </div>
            {this.state.dateTimePickerFlag && <DateAndTimePicker openCloseCalendarWindow={this.openCloseCalendarWindow}></DateAndTimePicker>}
        </div>

        )
    }
}

export default connect()(SideBar);

