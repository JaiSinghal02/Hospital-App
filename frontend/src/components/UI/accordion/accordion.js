import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import DescriptionIcon from '@material-ui/icons/Description';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: '95px 40px',

  },
  accord: {
    backgroundColor: '#b9d3f8',
  },
  heading: {
    fontSize: theme.typography.pxToRem(22),
    fontWeight: theme.typography.fontWeightRegular,
  },
  margin: {
    margin: theme.spacing(1),
  },
  margin2: {
    marginRight: '0'
  },
  name: {
    marginTop: theme.spacing(2),
    width: "160px",
    marginRight: '0',
    marginLeft: '10px',
  },
  time: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  noBooking: {
    marginLeft: "20px",
    fontSize: theme.typography.pxToRem(17),
  },
  accordDetail: {
    paddingRight: '0',
    paddingLeft: '2px',
    display: 'flex',
    flexDirection: 'column'
  }
}));

function accordion(props) {
  const classes = useStyles();
  let bookings, header
  if (props.mode === "PATIENT") {
    header = "Past Bookings"
    let dates = []
    let today = new Date()
    let today_date = today.getFullYear() + "-" + (Math.floor((today.getMonth() + 1) / 10) === 0 ? ("0" + (today.getMonth() + 1)) : (today.getMonth() + 1)) + "-" + (Math.floor((today.getDate()) / 10) === 0 ? ("0" + (today.getDate())) : (today.getDate()))
    let disab = []
    for (let i in props.data) {
      dates.push(i)
      if (i < today_date) {
        disab.push("true")
      }
      else {
        disab.push("false")
      }
    }
    bookings = dates.map((date, index) => {
      return (
        <AccordionDetails key={index} disabled={disab[index]}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>
                {"Date: " + date}
              </Typography>

            </Grid>
            <Grid item xs={6}>
              <Typography >
                {"Time: " + props.data[date]}
              </Typography>

            </Grid>
          </Grid>
        </AccordionDetails>
      )
    })
  }
  else if (props.mode === "STAFF") {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dates = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let m = months[parseInt(props.selectedDate.slice(5, 7)) - 1]
    let y = props.selectedDate.slice(0, 4)
    let d = props.selectedDate.slice(8)
    header = "Appointments on:  " + m + " " + d + " " + y
    let data = props.data
    if (data) {
      if (data.length === 0) {
        bookings = <p className={classes.noBooking}>No Bookings</p>
      }
      else {
        bookings = data.map((user, index) => {
          return (
            <AccordionDetails key={user["id"]} className={classes.accordDetail}>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <Typography className={classes.name}>
                  {"Name: " + user["name"]}

                </Typography>
                <Fab color="primary" size="small" className={classes.margin}>
                  <DescriptionIcon onClick={() => { props.showUserInfo(user["id"]) }} />

                </Fab>
              </div>
              <div style={{ width: '100%' }}>
                <Typography className={classes.time}>
                  {"Time: " + user["slot"][props.selectedDate]}
                </Typography>

              </div>
              <hr />
            </AccordionDetails>

          )
        })

      }
    }
  }
  return (
    <div className={classes.root}>
      <Accordion className={classes.accord}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{header}</Typography>
        </AccordionSummary>
        <hr />
        {bookings}
      </Accordion>
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
      {/* <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion> */}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    selectedDate: state.date
  }
}

export default connect(mapStateToProps)(accordion);
