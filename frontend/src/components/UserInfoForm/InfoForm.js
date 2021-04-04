import React,{useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Backdrop from '../UI/backdrop/backdrop'
import PopUp from '../UI/PopUp/PopUp'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        height: '70px'
    },
    button: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(1),
    },
}));

export default function AddressForm() {
    const classes = useStyles();
    let fn=localStorage.getItem("first_name")
    let ln=localStorage.getItem("last_name")
    let email=localStorage.getItem("email")
    // useEffect(()=>{
    //     console.log(info)
    // })
    const [info,changeInfo]=useState({first_name: fn,last_name:ln,address:"",city:"",state:"",pincode:"",phone_number:""})
    const [err,changeError]=useState([false,false,false,false,false,false,false]);
    const [formErr,changeFormError]=useState("");
    const [loading,changeLoading] =useState(false)
    const [popup,changePopUp] =useState({message:"",severity:""}) //severity= "error,warning,info,success"
    const toggleLoading = ()=>{
        changeLoading(prev=>!prev)
      }
    const changeFN = (e)=>{
        changeInfo(prev=>({...prev,first_name: e.target.value}))
    }
    const changeLN = (e)=>{
        changeInfo(prev=>({...prev,last_name: e.target.value}))
    }
    const changeAddress = (e)=>{
        changeInfo(prev=>({...prev,address: e.target.value}))
    }
    const changeCity = (e)=>{
        changeInfo(prev=>({...prev,city: e.target.value}))
    }
    const changeState = (e)=>{
        changeInfo(prev=>({...prev,state: e.target.value}))
    }
    const changePincode= (e)=>{
        changeInfo(prev=>({...prev,pincode: e.target.value}))
    }
    const changePhoneNumber= (e)=>{
        changeInfo(prev=>({...prev,phone_number: e.target.value}))
    }
    const submitUserInfo = ()=>{
        toggleLoading();
        if(!validateInfo()){
            let user={}
            let token=localStorage.getItem("token");
            user["name"]=info["first_name"].trim()+" "+info["last_name"].trim()
            user["phone_number"]="2345678901"
            user["email"]=email
            user["address"]=info["address"]
            user["pincode"]=info["pincode"]
            axios.post("http://localhost:8000/api/account/signup/addinfo",user,{headers:{'Authorization': `Token ${token}`}})
                .then(res=> {console.log(res,"response");toggleLoading();})
                .catch(err=> {console.log(err.response.data); changeFormError(err.response.data.detail);toggleLoading();})
        }
        else{
            toggleLoading();
        }
    }

    const validateInfo = ()=>{
        let check=false
        let arr=Array(7).fill(false)
        if(info["first_name"].trim().length<3){arr[0]=true}
        if(info["last_name"].trim().length<4){arr[1]=true}
        if(info["address"].trim().length<6){arr[2]=true}
        if(info["city"].trim().length<3){arr[3]=true}
        if(info["state"].trim().length<3){arr[4]=true}
        if(info["pincode"].trim().length!==6){arr[5]=true}
        let re=/[0-9]{6}/
        arr[5]=!re.test(info["pincode"])
        if(info["phone_number"].trim().length!==10){arr[6]=true}
        re=/\d{10}/
        arr[6]=!re.test(info["phone_number"])
        arr.forEach(val=>{
            if(val){check=val}
        })
        changeError(arr);
        if(check){
            changePopUp(prev=>({...prev,message:"Please check your entries",severity:"Error"}))
        }
        return check;
    }
    let showErr=formErr
    let loader=null
  if(loading){loader=<Backdrop open="true"/>}
  else{loader=null}
  let showPopUp=null
  if(popup["message"] !==""){
    showPopUp=<PopUp severity={popup["severity"]} open="true" message={popup["message"]}/>
    setTimeout(()=>{
      changePopUp(prev=>({...prev,message:"",severity:""}))
    },3000)
  }
    return (
        <React.Fragment>
            {loader}
            <Typography variant="h6" gutterBottom>
                Patient Information
      </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        defaultValue={fn}
                        onChange={(e)=>changeFN(e)}
                        error={err[0]}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        defaultValue={ln}
                        onChange={(e)=>changeLN(e)}
                        error={err[1]}
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address"
                        name="address"
                        label="Address line"
                        fullWidth
                        autoComplete="addressline"
                        onChange={(e)=>changeAddress(e)}
                        error={err[2]}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="city"
                        onChange={(e)=>changeCity(e)}
                        error={err[3]}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="state" name="state" label="State/Province/Region" fullWidth onChange={(e)=>changeState(e)} error={err[4]}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        onChange={(e)=>changePincode(e)}
                        error={err[5]}
                        helperText={err[5]?"Pincode must be 6 digits":""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="phoneNumber"
                        name="phoneNumber"
                        label="Mobile Number"
                        fullWidth
                        autoComplete="phone-number"
                        onChange={(e)=>changePhoneNumber(e)}
                        error={err[6]}
                        helperText={err[6]?"Mobile Number should be 10 digits":""}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                <Typography display="inline">
                    {showErr}
            </Typography>

                </Grid>
                <div className={classes.buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={submitUserInfo}
                    >
                        Submit
                                    </Button>
                </div>
            </Grid>
            {showPopUp}
        </React.Fragment>
    );
}