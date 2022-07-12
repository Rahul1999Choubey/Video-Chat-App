import React from 'react'
import { AppBar,Typography } from '@mui/material' 
import { makeStyles } from '@material-ui/core/styles'  ;

const useStyles = (theme) => ({
  appBar: {
      borderRadius: 15,
      margin: '30px 100px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '600px',
      border: '2px solid black',
  
      [theme.breakpoints.down('xs')]: {
        width: '90%',
      },
    },
    image: {
      marginLeft: '15px',
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
});



const Header = () => {
    // const classes = useStyles() ;  //using it as a hook;
  return (
    
    <React.Fragment >
        <AppBar   position="static" color = "inherit">
            <Typography variant = "h2" align = "center "  >
                Video Chat
            </Typography>
        </AppBar>
    </React.Fragment>
    
  )
}

export default Header