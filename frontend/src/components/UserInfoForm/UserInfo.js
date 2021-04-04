import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './InfoForm';


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));


export default function Checkout() {
    const classes = useStyles();
    // const [activeStep, setActiveStep] = React.useState(0);

    // const handleNext = () => {
    //     setActiveStep(activeStep + 1);
    // };

    // const handleBack = () => {
    //     setActiveStep(activeStep - 1);
    // };

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" padding="30px">
                        Fill the Form Below
          </Typography>
                    
                    <React.Fragment>
                        {/* {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Form Submitted Successfully
                </Typography>
                            </React.Fragment>
                        ) : 
                        ( */}
                            <React.Fragment>
                            <AddressForm />
                                {/* <div className={classes.buttons}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                    >
                                        Submit
                                    </Button>
                                </div> */}
                            </React.Fragment>
                        {/* )} */}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}