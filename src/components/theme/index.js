import React, { Component } from 'react';
import marked from "marked";
import "./style.css";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export class Theme extends Component {

    constructor(props) {
        super(props);
        this.state = { isToggleOn: false };
        this.handleClick = this.handleClick.bind(this);
        this.options = {
            title: {
                text: 'My chart'
            },
            series: [{
                data: [1, 2, 3]
            }]
        };
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        const text = { __html: marked(this.props.theme.text) };
        return <div className={"rp-theme-box " + (this.state.isToggleOn ? "selected" : "")} onClick={this.handleClick}>
            <h2>{this.props.theme.title}</h2>
            <img src={this.props.theme.image.fields.file.url} />
            <section dangerouslySetInnerHTML={text} />
            {this.state.isToggleOn && <HighchartsReact
                highcharts={Highcharts}
                options={this.options}
            />}
        </div>;
    }
}

