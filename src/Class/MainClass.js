import React from "react";
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import axios from 'axios'
import passwordHash from 'password-hash'
import Cookies from 'universal-cookie';
import SweetAlert from "react-bootstrap-sweetalert";
import Close from "@material-ui/icons/Close";
import Edit from "@material-ui/icons/Edit";
import { parse } from "querystring";

// don't propagate the react-router props
export const getAuth=()=>
{
// do stuff
    return 'aQLDDlUXqeZ4aOh0i9AX';
}

export const apiURL=()=>
{
  
    return "https://api.pantryon.com/API/V1/iOT/"
}


export const getHomeRoute = () => {
    return window.location = "/Admin";
  };


  
export const jsonEscape = (str) => {
    return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
  }
  
  


//URL=http://54.234.193.104/API/
//ImageURL=http://54.234.193.104/UserImages/
export const getLoginURL=()=>
{
  return "/Home/login-page";
}

var AES = require("crypto-js/aes");
export const encrypt = (tobeEncrypted) =>
{
    return AES.encrypt(tobeEncrypted,'myTotalySecretKey').toString();
}


export const decrypt = (tobeDecrypted) =>
{        
    return AES.decrypt(tobeDecrypted,'myTotalySecretKey').toString();
}

export const verifyPassword =(password,encryptedPassword) =>
{
    if (password == decrypt(encryptedPassword))
    {
        return true;
    }
    else{
        return false;
    }

}


export const getHomeDashboardURL=()=>
{
  return "/DashboardApp";
}

export const formatDate=(date)=> {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}


    
export const verifyEmail=(value)=> {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

export const verifyLength=(value, length)=> {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  // function that verifies if two strings are equal
  
export const compare=(string1, string2)=> {
    if (string1 === string2) {
      return true;
    }
    return false;
  }
  // function that verifies if value contains only numbers

  export const verifyNumber=(value)=> {
    //   ^[0-9]+$

    var numberRex = new RegExp("^[0-9](\.[0-9]+)?$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  }
  // verifies if value is a valid URL
  
export const verifyUrl=(value)=> {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  }

  
  export const hideAlert=(self)=> {
    self.setState({
      alert: null
    });
  }


  export const showAlert=(self, titleText, buttonText, descText)=>
  {
  
      self.setState({
        alert: (
          <SweetAlert
            warning
            style={{ display: "block", marginTop: "-100px" }}
            title={titleText}
            onConfirm={() =>   self.setState({alert: null})}
          
            confirmBtnCssClass={
              self.props.classes.button + " " + self.props.classes.success
            }
            confirmBtnText={buttonText}
          >
            {descText}
          </SweetAlert>
        )
      });
  }


  export const showModalAlert=(self, titleText, buttonText, descText)=>
  {
  
      self.setState({
        alert: (
          <SweetAlert
            input
            style={{ display: "block", marginTop: "-100px" }}
            title={titleText}
            onConfirm={() =>   self.setState({alert: null})}
          
            confirmBtnCssClass={
              self.props.classes.button + " " + self.props.classes.success
            }
            confirmBtnText={buttonText}
          >
            {descText}
          </SweetAlert>
        )
      });
  }


  
  export const showTimedAlert=(self, titleText, descText, time)=>
  {
  
      self.setState({
        alert: (
          <SweetAlert
            warning
            style={{ display: "block", marginTop: "-100px" }}
            title={titleText}
            onConfirm={() =>   self.setState({alert: null})}
          
          >
            {descText}
          </SweetAlert>
        )
      });

      setTimeout( self.setState({alert: null}), time);
  }

  export const getCookieInfo=(field)=>
  {
    const cookies = new Cookies();
    return cookies.get(field); 

  }

  export const getCookieInfoName=(field, cookieName)=>
  {
    const cookies = new Cookies(cookieName);
    return cookies.get(field); 

  }


  export const setCookieInfo=(fieldname,field, cookieName)=>
  {
    const cookies = new Cookies(cookieName)   
    cookies.set(fieldname, field, { path: '/' ,maxAge : '18000'});
    return 1;
  }

  

  export const checkEmailLogin=(self, redirect)=>
  {
    const cookies = new Cookies();
    var owneremail = cookies.get('email'); 

    if (owneremail === undefined)
    {
     if (redirect===true)
     {
      const path = getLoginURL();          
      self.props.history.push(path);
     }
    }

    return owneremail;
  }


  
  export const logout=(self)=>
  {
    const cookies = new Cookies();
    var coc = cookies.get('email');
    cookies.remove('email');
    return true;

  }


  
  export const redirect=(self, path)=>
  {
      self.props.history.push(path);
    

  }




  export const checkInputFields=(self, event, stateName, type, stateNameEqualTo, maxValue)=> {
    
   

    switch (type) {
      case "email":
        if (verifyEmail(event.target.value)) {
          self.setState({ [stateName + "State"]: "success" });
        } else {
          self.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "password":
        if (verifyLength(event.target.value, 1)) {
          self.setState({ [stateName + "State"]: "success" });
        } else {
          self.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "equalTo":
        if (compare(event.target.value, this.state[stateNameEqualTo])) {
          self.setState({ [stateName + "State"]: "success" });
        } else {
          self.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "checkbox":
        if (event.target.checked) {
          self.setState({ [stateName + "State"]: "" });
        } else {
          self.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "number":
   
        if (verifyNumber(event.target.value)) {
          
          self.setState({ [stateName + "State"]: "success" });
        } else {
          self.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (verifyLength(event.target.value, stateNameEqualTo)) {
     
          self.setState({ [stateName + "State"]: "success" });
        } else {
          self.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-length":
        if (!verifyLength(event.target.value, stateNameEqualTo + 1)) {
          self.setState({ [stateName + "State"]: "success" });
        } else {
          self.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "url":
        if (verifyUrl(event.target.value)) {
          self.setState({ [stateName + "State"]: "success" });
        } else {
          self.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "min-value":
        if (
          verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-value":
        if (
          verifyNumber(event.target.value) &&
          event.target.value <= stateNameEqualTo
        ) {
          self.setState({ [stateName + "State"]: "success" });
        } else {
          self.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "range":
        if (
          verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo &&
          event.target.value <= maxValue
        ) {
          self.setState({ [stateName + "State"]: "success" });
        } else {
          self.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    switch (type) {
      case "checkbox":

      self.setState({ [stateName]: event.target.checked });
        break;
      default:
      self.setState({ [stateName]: event.target.value });
        break;
    }

  }


  ////////////////////////////////////////////////////////////

 
