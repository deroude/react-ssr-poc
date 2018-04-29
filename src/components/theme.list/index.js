import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Theme } from '../theme';
import { themeCollectionLoad } from '../../actions';


class ThemeList extends Component {

    componentWillMount() {
        if (!this.props.themes || this.props.themes.length <= 0)
            this.props.loadThemes();
    }

    render() {
        if (this.props.themes && this.props.themes.length > 0) {
            const themes = this.props.themes.map(t => <Theme key={t.id} theme={t}></Theme>);
            return <div>{themes}</div>;
        }
        if (this.props.loading) {
            return <span>Loading...</span>;
        }
        if (this.props.loadError) {
            return <span>Error...</span>;
        }
        return null;
    }
}

ThemeList.serverFetch = themeCollectionLoad;

const mapStateToProps = (state) => {
    return { themes: state.themes, loading: state.loading, loadError: state.loadError };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadThemes: () => dispatch(themeCollectionLoad())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeList);