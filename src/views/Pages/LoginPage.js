import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import passwordHash from 'password-hash'
import {withRouter} from "react-router";
import Cookies from 'universal-cookie';
import * as utility from "Class/MainClass.js";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import axios from "axios";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import Badge from "components/Badge/Badge.js";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { setConstantValue } from "typescript";

const useStyles = makeStyles(styles);

export default function LoginPage() {


  const cookies = new Cookies("pantryOn", { path: '/' })
  const state = {    
    buttonStatevalue: "",
    emailState:"",
    emailValue:"",
    passwordState:"",
    passwordValue:"",
    passwordMessage:""

  };

  const [
    passwordMessage, setPasswordMessage
] = React.useState("");

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  



const  change = (event, stateName, type, stateNameEqualTo) => {


  
    state[stateName + "Value"] = event.target.value;

    switch (type) {      
      case "length":
        if (utility.verifyLength(event.target.value, stateNameEqualTo)) {
          state[stateName + "State"] = "success";
        } else {
          state[stateName + "State"]= "error";
        }
        break;
      case "email":
        if (utility.verifyEmail(event.target.value)) {
          state[stateName + "State"]="success";
        } else {
          state[stateName + "State"]= "error";
        }
        break;
      default:
        break;
    }
    state[stateName] = event.target.value;

  }


 const handleLogin= () => {
  
  
     var email = state.emailValue;
     var password = state.passwordValue;
 

      var url = utility.apiURL() + 'user.php?type=getUserLogin&v1='+ email + '&v2=' + password + '&auth=' +utility.getAuth();
     
 
      //first store the entered data
    axios.get(url)
    .then(response => {    

      
      if (response.data != false)
      {
        
          cookies.set('email', email, { path: '/' ,maxAge : '18000'});                    
          const path = utility.getHomeDashboardURL();
          setPasswordMessage(<Redirect from="/" to="/admin" />);
         // props.history.push(path);
      }
      else
      {
              
        setPasswordMessage(   <Badge color="danger">Your E-Mail or Password are incorrect</Badge>);
      }

    })
    .catch(function (error) {
      console.log(error);
    });
    
  
    
}

state.passwordValue="";
state.emailValue=""
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form>
          
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
                <div className={classes.socialLine} style={{display:"none"}} >
                  {[
                    "fab fa-facebook-square",
                    "fab fa-twitter",
                    "fab fa-google-plus"
                  ].map((prop, key) => {
                    return (
                      <Button
                        color="transparent"
                        justIcon
                        key={key}
                        className={classes.customButtonClass}
                      >
                        <i className={prop} />
                      </Button>
                    );
                  })}
                </div>
              </CardHeader>
              <CardBody>                
                <CustomInput
                  labelText="Email..."
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: (event => change(event, "email", "email")),
                    
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    autoComplete: "off"
                  }}
                />
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: (event => change(event, "password", "length",5)),
                    
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    type: "password",
                    autoComplete: "off"
                  }}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button color="rose" simple size="lg" block  onClick={handleLogin}>
                  Let{"'"}s Go
            
                </Button>
                {passwordMessage}
              </CardFooter>
            </Card>

            
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
