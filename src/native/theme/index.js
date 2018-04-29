import React, { Component } from 'react';
import marked from "marked";
import { Text, View, Image } from 'react-native';

export class Theme extends Component {

    constructor(props) {
        super(props);
        this.state = { isToggleOn: false };
        this.handleClick = this.handleClick.bind(this);        
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        const text = { __html: marked(this.props.theme.text) };
        return <View className={"rp-theme-box " + (this.state.isToggleOn ? "selected" : "")} onClick={this.handleClick}>
            <Text>{this.props.theme.title}</Text>
            <Image source={this.props.theme.image.fields.file.url} />
        </View>;
    }
}

