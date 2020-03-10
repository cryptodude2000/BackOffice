import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import Cookies from 'universal-cookie';
import * as utility from "Class/MainClass.js";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import axios from "axios";
// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
// import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Language from "@material-ui/icons/Language";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Swal from 'sweetalert2'

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import ReactTable from "react-table";

import { dataTable } from "variables/general.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

import priceImage1 from "assets/img/card-2.jpeg";
import priceImage2 from "assets/img/card-3.jpeg";
import priceImage3 from "assets/img/card-1.jpeg";

const us_flag = require("assets/img/flags/US.png");
const de_flag = require("assets/img/flags/DE.png");
const au_flag = require("assets/img/flags/AU.png");
const gb_flag = require("assets/img/flags/GB.png");
const ro_flag = require("assets/img/flags/RO.png");
const br_flag = require("assets/img/flags/BR.png");

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920
};

const useStyles = makeStyles(styles);

var getFeebackDataBool = true;
var getDashBoardDataBool = true;


export default function Dashboard() {


  const [HubCount,setHubCount]= React.useState("0");
  const [UserCount,setUserCount]= React.useState("0");
  const [Feedback,setFeedback]= React.useState("0");
  const [ShoppingLists,setShoppingLists]= React.useState("0");
  const [tabledata, setData] = React.useState([]);    
  var FeebackTableData =[];    


  function sendFeedback(email, feedback)
  {
    var url = utility.apiURL() + 'user.php?type=sendFeedbackEmail&v1=' + email + "&v2=" + encodeURI(feedback);
    axios.get(url)
    .then(response => {    
    
    });
  
  }
  
  function getDashboardData () { 
    //first store the enteredta
    
    if(getDashBoardDataBool ==true)
    {
      getDashBoardDataBool=false;
    var url = utility.apiURL() + 'user.php?type=getDashboard';
  axios.get(url)
  .then(response => {    
 
    if(response.data)
    {
       
       setHubCount(response.data.HubCount);
       setUserCount(response.data.UserCount);
       setFeedback(response.data.Feedback);
       setShoppingLists(response.data.ShoppingLists);
       
    }
    
  })
  .catch(function (error) {
    console.log(error);
  });
  }
 }

  function getFeebackData () {
    var url = utility.apiURL() + 'user.php?type=getFeedbackDashboard';
    if(getFeebackDataBool==true)
    {
      getFeebackDataBool = false;
    //first store the entered data
    axios.get(url)
    .then(response => {    
      var jsonData =response.data;
      
      Object.keys(jsonData).map(e => {        
        var feedbackJson;
        var ftype = "Error In Data";
        var fdescription = "Error In Data";
        try {
          
        feedbackJson = JSON.parse(utility.jsonEscape(jsonData[e].Feedback));
        ftype = feedbackJson.type;
        fdescription = feedbackJson.description;
        }
        catch (e)
        {
          
          
        }
        
        FeebackTableData.push({
              id: jsonData[e].Id,
              dateCreated:jsonData[e].DateCreated,
              email: jsonData[e].email,
              feedbackType: ftype,
              feedback: fdescription,
              actions: (
                // we've added some custom button actions
                <div className="actions-right">
                  {/* use this button to add a like kind of action */}
                  <Button
                    justIcon
                    round
                    simple
                    onClick={() => {
                      let obj = tabledata.find(o => o.id === jsonData[e].Id);
                      const { value: ipAddress } = Swal.fire({
                        title: 'Enter the Feedback response',
                        input: 'textarea',
                        inputValue: "",
                        showCancelButton: true,
                        inputValidator: (value) => {
                          if (!value) {
                            return 'You need to enter something!'
                          }
                          else
                          {
                            Swal.fire(`An email was sent to user:` + jsonData[e].email)
                            sendFeedback(jsonData[e].email,value);
                          }
                        }
                      })

                    }}
                    color="info"
                    className="like"
                  >
                    <Edit />
                  </Button>{" "}
                  {/* use this button to add a edit kind of action 
                  <Button
                    justIcon
                    round
                    simple
                    onClick={() => {
                      let obj = tabledata.find(o => o.id === jsonData[e].Id);
                      alert(
                        "Future Functionality: " 
                          
                      );
                    }}
                    color="warning"
                    className="edit"
                  >
                    <Dvr />
                  </Button>{" "}
                  {/* use this button to remove the data row 
                  <Button
                    justIcon
                    round
                    simple
                    onClick={() => {
                      var newData = tabledata;
                      newData.find((o, i) => {
                        if (o.id === jsonData[e].Id) {
                          // here you should add some custom code so you can delete the data
                          // from this component and from your server as well
                          newData.splice(i, 1);
                          return true;
                        }
                        return false;
                      });
                      alert(
                        "Future Functionality" 
                      );
                      //setData([...newData]);
                    }}
                    color="danger"
                    className="remove"
                  >
                    <Close />
                  </Button>{" "}*/}
                </div>
              )
            
          }) //push
      }) //map
 
      setData(FeebackTableData);
    })//axios
  .catch(function (error) {
    console.log(error);
  });
  }//if
}




    
if(tabledata.length == 0)
{
   getFeebackDataBool = true;
   getDashBoardDataBool = true;
}

  getDashboardData();
  getFeebackData();
  //getFeebackData();
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}># of PantryOn Systems</p>
              <h3 className={classes.cardTitle}>
               {HubCount}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Store/>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}># Of Users</p>
              <h3 className={classes.cardTitle}>{UserCount}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <ArrowUpward />
                Manage Users
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}># of Feedback</p>
              <h3 className={classes.cardTitle}>{Feedback}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              <Danger>
                  <Warning />
                </Danger>
                Manage Feedback
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <i className="fab fa-twitter" />
              </CardIcon>
              <p className={classes.cardCategory}># of ShoppingLists</p>
              <h3 className={classes.cardTitle}>{ShoppingLists}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      
      
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Feedback</h4>
          </CardHeader>
          <CardBody>
            <ReactTable
              data={tabledata}
              filterable
              columns={[
                {
                  Header: "Date Created",
                  accessor: "dateCreated"
                },
                {
                  Header: "E-Mail",
                  accessor: "email"
                },
                {
                  Header: "Feedback Type",
                  accessor: "feedbackType"
                },
                {
                  Header: "Feeback",
                  accessor: "feedback"
                },
                {
                  Header: "Actions",
                  accessor: "actions",
                  sortable: false,
                  filterable: false
                }
              ]}
              defaultPageSize={10}
              showPaginationTop
              showPaginationBottom={false}
              className="-striped -highlight"
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
 
    </div>
  );
}
