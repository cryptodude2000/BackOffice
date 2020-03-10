import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import axios from "axios";
import * as utility from "Class/MainClass.js";
// @material-ui/icons
import { dataTable } from "variables/general.js";
import Swal from 'sweetalert2'
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const useStyles = makeStyles(styles);

var getUserDataBool = true;
var getDashBoardDataBool = true;

function updatePassword(email, password)
{
  var url = utility.apiURL() + 'user.php?type=resetPasswordByAdmin&v1=' + email + "&v2=" + password;
  axios.get(url)
  .then(response => {    
  
  });

}

function inactivateUser(email)
{
  var url = utility.apiURL() + 'user.php?type=inactivateUserDashboard&v1=' + email;
  axios.get(url)
  .then(response => {    
  
  });

}

export default function ManageUsers() {
  
  const [tabledata, setData] = React.useState([]);    
  
  

  async function getUserData () {

    var url = utility.apiURL() + 'user.php?type=getUserListDashboard';
    if(getUserDataBool==true)    
    {
      var TableData =[];    
      getUserDataBool = false;
    //first store the entered data
    axios.get(url)
    .then(response => {    
      var jsonData =response.data;
      
      Object.keys(jsonData).map(e => {        
        var feedbackJson;
        var ftype = "Error In Data";
        var fdescription = "Error In Data";

        
        TableData.push({
              id: jsonData[e].Id,
              dateCreated:jsonData[e].DateCreated,
              email: jsonData[e].email,
              isAdmin: jsonData[e].email===1 ? "Admin" : "User",
              family: jsonData[e].familyName,
              active: jsonData[e].Active,
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
                      alert(
                        "Future Functionality: "                          
                      );
                    }}
                    color="info"
                    className="like"
                  >
                    <Favorite />
                  </Button>{" "}
                  {/* use this button to add a edit kind of action */}
                  <Button
                    justIcon
                    round
                    simple
                    onClick={() => {
                      let obj = tabledata.find(o => o.id === jsonData[e].Id);
                      
                      const ipAPI = '//api.ipify.org?format=json'

               
                      const { value: ipAddress } = Swal.fire({
                        title: 'Enter the New Password',
                        input: 'text',
                        inputValue: "",
                        showCancelButton: true,
                        inputValidator: (value) => {
                          if (!value) {
                            return 'You need to enter something!'
                          }
                          else
                          {
                            Swal.fire(`The New Password is ${value}`)
                            updatePassword(jsonData[e].email,value);
                          }
                        }
                      })

                    }}
                    color="warning"
                    className="edit"
                  >
                    <Dvr />
                  </Button>{" "}
                  {/* use this button to remove the data row */}
                  <Button
                    justIcon
                    round
                    simple
                    onClick={() => {
                      var newData = TableData;
                      newData.find((o, i) => {
                        if (o.id === jsonData[e].Id) {
                          // here you should add some custom code so you can delete the data
                          // from this component and from your server as well

                          Swal.fire({
                              title: 'Inactivate:' + jsonData[e].email,
                              text: "You won't be able to revert this!",
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#3085d6',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Yes, Inactivate User'
                            }).then((result) => {
                              if (result.value) {

                                inactivateUser(jsonData[e].email);
                                Swal.fire(
                                  'Inactivated!',
                                  'The User has been inactivated.',
                                  'success'
                                )
                              }
                            })
                          newData.splice(i, 1);
                          return true;
                        }
                        return false;
                      });
               
                      //setData([...newData]);
                    }}
                    color="danger"
                    className="remove"
                  >
                    <Close />
                  </Button>{" "}
                </div>
              )
            
          }) //push
      }) //map
 
      setData(TableData);
    })//axios
  .catch(function (error) {
    console.log(error);
  });
  }//if
}

  
if(tabledata.length == 0)
  {
    getUserDataBool = true;
  }

  getUserData();
  const classes = useStyles();
  return (
    <GridContainer>
     
           
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
                  Header: "Family Name",
                  accessor: "family"
                },
                {
                  Header: "User Type",
                  accessor: "isAdmin"
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
 
    
  );
}
