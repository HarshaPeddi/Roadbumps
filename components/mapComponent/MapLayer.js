import React, { createRef, Component } from 'react';
import { Map, TileLayer, Polyline } from 'react-leaflet';
import { LATLNG } from "../../Helpers/Constants"
import { latLongGeo } from './convertcsv';
import { connect } from 'react-redux';

const mapsUrl = process.env.REACT_APP_MAPS_TILE_URL + "/maptile/2.1/maptile/newest/normal.night.grey/{z}/{x}/{y}/256/png?app_id=" + process.env.REACT_APP_MAPS_APP_ID + "&app_code=" + process.env.REACT_APP_MAPS_APP_CODE;
export default class MapLayer extends Component {
    constructor(props) {
        super(props)
        this.selectedDate = this.props.inputType;
        this.state = {
            zoom: 14,
            latlng: LATLNG,
            latLongGeo: latLongGeo,
            consoleLog: this.consoleLog(),
            selectedDate: this.selectedDate,
            selectedFeatures: [],
            onClickFlag : false
        };
        this.mapRef = React.createRef();
    }
    consoleLog = () => {
        console.log("from console.log");
    }

    componentDidMount() {
        const { latLongGeo } = this.state;
        for (let i = 0; i < latLongGeo.features.length; i++) {
            const feature = latLongGeo.features[i];
            const { lat0, lng0, lat1, lng1 } = feature.properties;
            const distance = this.mapRef.current.leafletElement.distance([lat0, lng0], [lat1, lng1]);
            latLongGeo.features[i].distance = distance * 3.28084;
        }
        this.setState({ latLongGeo }, () => {
            console.log('Geo Object', this.state.latLongGeo);
            console.log('distance alone', this.state.latLongGeo.distance);
        });
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.selectedDate !== this.state.selectedDate && nextProps.selectedDate !== undefined){
            var selectedFeatures = []
            this.state.latLongGeo.features.map((feature) => {
                if(feature.properties.period_start_time === nextProps.selectedDate){
                    selectedFeatures.push(feature)
                }
            })
            this.setState({
                selectedDate : nextProps.selectedDate,
                selectedFeatures : selectedFeatures,
                onClickFlag : true     
            });
        }
    }

    render() {
        const position = [this.state.latlng.lat, this.state.latlng.lng]
        {
            var tempShort = 10000;
            var tempLong = 0;
        }
        const validSelectedDate = this.state.selectedDate;
        let poly;
        console.log(this.state.onClickFlag);

        if(this.state.onClickFlag){
            poly = (this.state.selectedFeatures.map((feature) => {
                if (feature.distance <= tempShort) {
                    tempShort = feature.distance;
                }
                if (feature.distance >= tempLong) {
                    tempLong = feature.distance;
                }
                return <div onClick={this.state.consoleLog}>
                    <Polyline key={feature.properties.id} positions={[
                        [feature.properties.lat0, feature.properties.lng0], [feature.properties.lat1, feature.properties.lng1]
                    ]}
                        color={
                            feature.properties.events_count === 1 ? 'red' :
                                feature.properties.events_count === 2 ? 'light blue' :
                                    feature.properties.events_count === 3 ? 'green' :
                                        feature.properties.events_count === 4 ? 'maroon' :
                                            feature.properties.events_count === 5 ? 'blue' : 'red'
                        }
                    />
                </div>
            }));
        } else {
            poly = undefined;
        }
        return (
            <div>
                <Map
                    center={position}
                    zoom={this.state.zoom}
                    maxZoom={20}
                    style={{ height: "100vh" }}
                    ref={this.mapRef}
                >
                    <TileLayer
                        url={mapsUrl}
                        attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>Here Maps</a> contributors, Imagery © <a href='https://www.mapbox.com/'>Here Maps</a>"
                    />
                    { poly }
                </Map>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedDate: state.selectedDate,
        latLongGeo: state.latLongGeo
    };
};
MapLayer= connect(mapStateToProps,null)(MapLayer);