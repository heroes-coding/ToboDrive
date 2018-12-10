import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, withSnackbar } from 'notistack';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

import { Browser } from '..'
import { Sidebar } from '../../components'
import Header from '../../components/Header'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

class Page extends Component {
  state = {
    sidebarVisible: true
  }

  handleClick = () => {
    this.props.enqueueSnackbar('I love snacks.');
  }

  handleClickVariant = (variant, message) => () => {
    // variant could be success, error, warning or info
    this.props.enqueueSnackbar(message, { variant });
  }

  toggleSidebar = () => { // USE SETSTATE
    this.setState({sidebarVisible: !this.state.sidebarVisible})
    console.log("sidebarVisible = " + this.state.sidebarVisible)
  }

  render () {
    return (
      <Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Sidebar visible={this.state.sidebarVisible} />
          <div style={{marginLeft: '210px'}}>
            <Header toggleButton={this.toggleSidebar} />
            <React.Fragment>
              <Button onClick={this.toggleSidebar}>Toggle Sidebar</Button>
            </React.Fragment>
            <Browser />
          </div>
        </MuiThemeProvider>
        
        <React.Fragment>
          <Button onClick={this.handleClick}>Show snackbar</Button>
          <Button onClick={this.handleClickVariant('success','Success')}>Show Success snackbar</Button>
          <Button onClick={this.handleClickVariant('warning','WARNING')}>Show Warning snackbar</Button>
          <Button onClick={this.handleClickVariant('error','ERROR')}>Show Error snackbar</Button>
          <Button onClick={this.handleClickVariant('info','Info')}>Show Info snackbar</Button>
        </React.Fragment>
      </Fragment>
    )
  }
}

Page.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

const MyPage = withSnackbar(Page);

function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyPage />
    </SnackbarProvider>
  );
}

export default IntegrationNotistack;