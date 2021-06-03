import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  iconfont: {
    fontSize: "3rem",
  },
}));

const SearchFilter = () => {
  const classes = useStyles();
  return (
    <div className="search u-margin-bottom-medium">
      <div className="search__iconbox">
        <SearchIcon
          fontSize="large"
          classes={{ fontSizeLarge: classes.iconfont }}
        />
      </div>
      <input
        type="text"
        className="search__textbox"
        placeholder="Search for jobs, candidates..."
        autoCorrect="off"
      ></input>
    </div>
  );
};

export default SearchFilter;
