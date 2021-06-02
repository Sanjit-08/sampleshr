import React, { useState, useEffect, useContext } from "react";
import Navigation from "../components/Navigation";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import WorkIcon from "@material-ui/icons/Work";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { AuthContext } from "../auth";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";

const drawerWidth = 255;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "&:hover": {
      backgroundColor: "#4ad7d1",
    },
  },
  //   appBar: {
  //     width: `calc(100% - ${drawerWidth}px)`,
  //     marginLeft: drawerWidth,
  //   },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: "110px",
    paddingTop: "20px",
    paddingLeft: "5px",
    //
    border: "none",
    backgroundColor: "#4ad7d1",
  },
  primary: {
    fontSize: "20px",
    color: "#001730",

    "$&:visited": {
      color: "white !important",
    },
  },
  primaryselect: {
    color: "white",
    fontSize: "30px !important",
  },
  active: {
    backgroundColor: "#001730 !important",
    color: "white !important",
    fontSize: "20px !important",
    transition: "all .5s",

    "&:active": {
      color: "white !important",
    },
  },
  listitem: {
    marginLeft: "10px !important",
  },
  icon: {
    fontWeight: "bolder",
    color: "black",
  },
  iconselect: {
    fontWeight: "bolder",
    color: "white",
  },
  // necessary for content to be below app bar
  //   toolbar: theme.mixins.toolbar,
}));

const style = {
  list: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "20px",
  },
  listitem: {
    display: "flex",
    marginBottom: "12px",
    borderRadius: "10px",
    // border: "2px solid #4ad7d1",
    border: "none",
    width: "247px",
  },
  // listitemtext: {
  //   color: "#001730",
  //   fontSize: "35px",
  // },
  lisitemicon: {
    marginLeft: "10px !important",
    height: "30px",
  },
};

const Dashboard = (props) => {
  const { authuser } = useContext(AuthContext);
  const classes = useStyles();
  const { list } = props;
  console.log(list);
  const [select1, setSelected1] = useState(false);
  const [select2, setSelected2] = useState(false);
  const [select3, setSelected3] = useState(false);
  const [select4, setSelected4] = useState(false);
  const [reload, setReload] = useState(false);

  const clickListItem1 = (e) => {
    e.preventDefault();
    setSelected1(!select1);
    if (select2) {
      setSelected2(false);
    }
    if (select3) {
      setSelected3(false);
    }
    if (select4) {
      setSelected4(false);
    }
  };

  const clickListItem2 = (e) => {
    e.preventDefault();
    setSelected2(!select2);
    if (select1) {
      setSelected1(false);
    }
    if (select3) {
      setSelected3(false);
    }
    if (select4) {
      setSelected4(false);
    }
  };

  const clickListItem3 = (e) => {
    e.preventDefault();
    setSelected3(!select3);
    if (select1) {
      setSelected1(false);
    }
    if (select2) {
      setSelected2(false);
    }
    if (select4) {
      setSelected4(false);
    }
  };

  const clickListItem4 = (e) => {
    e.preventDefault();
    setSelected4(!select4);
    if (select1) {
      setSelected1(false);
    }
    if (select2) {
      setSelected2(false);
    }
    if (select3) {
      setSelected3(false);
    }
  };

  return (
    <>
      <Navigation />
      {!isMobile ? (
        <div className={classes.root}>
          <CssBaseline />
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <List style={style.list}>
              <ListItem
                button
                selected={select1}
                disableGutters={true}
                key={list[0]}
                style={style.listitem}
                className={classes.root}
                classes={{ selected: classes.active }}
                onClick={(e) => clickListItem1(e)}
              >
                <ListItemIcon classes={{ root: classes.listitem }}>
                  <DashboardIcon
                    fontSize="large"
                    className={select1 ? classes.iconselect : classes.icon}
                  />
                </ListItemIcon>
                <ListItemText>
                  {" "}
                  <span style={{ fontSize: "20px" }}>{list[0]}</span>{" "}
                </ListItemText>
              </ListItem>
            </List>

            <List style={style.list}>
              <ListItem
                button
                selected={select2}
                disableGutters={true}
                key={list[1]}
                style={style.listitem}
                className={classes.root}
                classes={{ selected: classes.active }}
                onClick={(e) => clickListItem2(e)}
              >
                <ListItemIcon classes={{ root: classes.listitem }}>
                  <AccountCircleIcon
                    fontSize="large"
                    className={select2 ? classes.iconselect : classes.icon}
                  />
                </ListItemIcon>
                <ListItemText>
                  {" "}
                  <span style={{ fontSize: "20px" }}>{list[1]}</span>
                </ListItemText>
              </ListItem>
            </List>

            <List style={style.list}>
              <ListItem
                button
                selected={select3}
                disableGutters={true}
                key={list[2]}
                style={style.listitem}
                className={classes.root}
                classes={{ selected: classes.active }}
                onClick={(e) => clickListItem3(e)}
              >
                <ListItemIcon classes={{ root: classes.listitem }}>
                  <EqualizerIcon
                    fontSize="large"
                    className={select3 ? classes.iconselect : classes.icon}
                  />
                </ListItemIcon>
                <ListItemText>
                  {" "}
                  <span style={{ fontSize: "20px" }}>{list[2]}</span>
                </ListItemText>
              </ListItem>
            </List>

            <List style={style.list}>
              <ListItem
                button
                selected={select4}
                disableGutters={true}
                key={list[3]}
                style={style.listitem}
                className={classes.root}
                classes={{ selected: classes.active }}
                onClick={(e) => clickListItem4(e)}
              >
                <ListItemIcon classes={{ root: classes.listitem }}>
                  <WorkIcon
                    fontSize="large"
                    className={select4 ? classes.iconselect : classes.icon}
                  />
                </ListItemIcon>
                <ListItemText>
                  {" "}
                  <span style={{ fontSize: "20px" }}>{list[3]}</span>
                </ListItemText>
              </ListItem>
            </List>
          </Drawer>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export async function getServerSideProps() {
  const list = ["Dashboard", "Candidates Profile", "Candidates Status", "Jobs"];

  return {
    props: {
      list: list,
    },
  };
}

export default Dashboard;
