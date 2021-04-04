import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Backdrop from '../UI/backdrop/backdrop'
import PopUp from '../UI/PopUp/PopUp';
import { useState,useEffect } from 'react';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  
  const classes = useStyles();
  const [formobj, changeForm] = useState({ title: "Sign up", info: "Already have an account? Sign in" });
  const [user, changeUser] = useState("Patient");
  const [loading,changeLoading] =useState(false)
  const [popup,changePopUp] =useState({message:"",severity:""}) //severity= "error,warning,info,success"
  const [signuperr,changeSignUpError]=useState([false,false,false,false,false,false]);
  const [siginerr,changeSignInError]=useState([false,false]);
  const [authErr,changeAuthErr]=useState("");
  useEffect(()=>{
    let arr1=Array(6).fill(false)
    changeSignUpError(arr1)
    let arr2=Array(2).fill(false)
    changeSignInError(arr2)
    changeAuthErr("")
  },[formobj["title"],user])
  const changeFormValues = () => {
    if (formobj["title"] === "Sign in") { changeForm(prev => ({ ...prev, title: "Sign up", info: "Already have an account? Sign in" })) }
    else { changeForm(prev => ({ ...prev, title: "Sign in", info: "New User? Sign up" })) }

  }
  const toggleLoading = ()=>{
    changeLoading(prev=>!prev)
  }
  const changeType = () => {
    if (user === "Patient") { changeUser("Staff"); changeForm(prev => ({ ...prev, title: "Sign in"})) }
    else { changeUser("Patient"); changeForm(prev => ({ ...prev, title: "Sign in" })) }
  }
  const validateEmail= (email)=>{
    let check=true;
    const re= /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    check&=re.test(email)
    return check
  }
  const afterAuth = (user)=>{
    localStorage.setItem('token',user["token"])
    localStorage.setItem('first_name',user["first_name"])
    localStorage.setItem('last_name',user["last_name"])
    localStorage.setItem('email',user["email"])
    changePopUp(prev=>({...prev,message:"Authentication Successful",severity:"success"}))
    setTimeout(()=>{
      props.history.push('/account/signup/addinfo')

    },2000)
  }
  const validateForm = (mode,user,p1,p2="")=>{
    let check=false;
    if(mode==="Signup"){
      let arr=Array(6).fill(false)
        if(user["first_name"].trim().length<3){arr[0]=true}
        if(user["last_name"].trim().length<3){arr[1]=true}
        if(user["username"].trim().length<4){arr[2]=true}
        if(user["username"].trim()==="Hospital_Admin" || user["username"].trim()==="GetWellSoon_Staff"){arr[2]=true}
        if(!validateEmail(user["email"])){arr[3]=true}
        if(p1.trim().length<5){arr[4]=true}
        if(p1!==p2){arr[5]=true}
        for(let i=0;i<6;++i){if(arr[i]){check=arr[i]}}
        changeSignUpError(arr);
    }
    else{
      let arr=Array(2).fill(false)
        if(user["username"].trim().length<4){arr[0]=true}
        if(p1.trim().length<5){arr[1]=true}
        for(let i=0;i<2;++i){if(arr[i]){check=arr[i]}}
        changeSignInError(arr);
    }
    if(check){
      changePopUp(prev=>({...prev,message:"Please check your entries",severity:"Error"}))
    }
    return check
  }
  const submitAuthForm = (e)=>{
    e.preventDefault()
    toggleLoading();
    if(formobj["title"]==="Sign up"){
    const first_name=e.target[0].value
    const last_name=e.target[2].value
    const username=e.target[4].value
    const email=e.target[6].value
    const password1=e.target[8].value
    const password2=e.target[10].value
    const user={username: username,password: password1,email: email,first_name: first_name,last_name: last_name};
    if(validateForm("Signup",user,password1,password2)){
      toggleLoading();
    }
    else{
      axios.post("http://localhost:8000/api/account/signup",user)
        .then(res=>{console.log(res);toggleLoading();afterAuth(res.data)} )
        .catch(err=>{console.log(err);changeAuthErr(err.response.data.message);toggleLoading();})
    }
  }
    
    else{
      const username=e.target[0].value
      const password=e.target[2].value
      const user={username: username,password:password};
      if(validateForm("Signin",user,password)){
        toggleLoading();
        changeAuthErr("")
      }
      else{

        axios.post("http://localhost:8000/api/account/login",user)
          .then(res=>{console.log(res);toggleLoading();afterAuth(res.data)})
          .catch(err=>{console.log(err.response.data); changeAuthErr(err.response.data.message); toggleLoading();})
      }
    }
    

  }

  let password2 = null;
  let email=null;
  let first_name=null;
  let last_name=null;
  if (user == "Patient" && formobj["title"] === "Sign up") {
    first_name = <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="first_name"
      label="First Name"
      required="true"
      id="first_name"
      autoFocus
      error={signuperr[0]}
    />
    last_name = <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="last_name"
      label="Last Name"
      required="true"
      id="last_name"
      error={signuperr[1]}
    />
    password2 = <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password2"
      label="Re-enter Password"
      type="password"
      required="true"
      id="password2"
      autoComplete="current-password"
      error={signuperr[5]}
      helperText={signuperr[5]?"Passwords (Case-Sensitive) must match":""}
    />
    email=<TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    name="email"
    label="Email Address"
    required="true"
    id="email"
    autoComplete="email"
    error={signuperr[3]}
  />
  }
  let loader=null
  if(loading){loader=<Backdrop open="true"/>}
  else{loader=null}
  let showErr=authErr
  let showPopUp=null;
  if(popup["message"] !==""){
    showPopUp=<PopUp severity={popup["severity"]} open="true" message={popup["message"]}/>
    setTimeout(()=>{
      changePopUp(prev=>({...prev,message:"",severity:""}))
    },3000)
  }
  return (
    <Container component="main" maxWidth="xs">
      {loader}
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" style={{ paddingBottom: "10px",paddingLeft:"25px" }}>
          {user} Authentication
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {formobj["title"]}
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e)=>submitAuthForm(e)}>
          {first_name}
          {last_name}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            error="true"
            required="true"
            label="User Name"
            helperText={formobj["title"]=="Sign up"?"It will be used for future login":""}
            name="username"
            autoComplete="username"
            error={signuperr[2] || siginerr[0]}
            helperText={signuperr[2]?"User Name must be 4 or more characters":""}
          />
          {email}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            required="true"
            id="password"
            autoComplete="current-password"
            error={signuperr[4] || siginerr[1]}
            helperText={(signuperr[4] || siginerr[1])?"Password must be 6 or more characters long":""}
          />
          {password2}
          <div>

          {showErr}
          </div>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
          >
            {formobj["title"]}
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="#" variant="body2" onClick={changeFormValues}>
                {(user === "Patient" ? formobj["info"] : "")}
              </Link>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: "10px" }}>
              <Link href="#" variant="body2" onClick={changeType}>
                {(user === "Staff" ? "Patient Login Here" : "Staff Login Here")}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
      {showPopUp}
    </Container>
  );
}