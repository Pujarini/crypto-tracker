import { makeStyles } from '@material-ui/core';
import React from 'react'

const SelectButton = ({children, selected,onClick}) => {
    const useStyles= makeStyles(()=>({
        selectButton:{
                border:"1px solid gold",
                borderRadius:5,
                padding:10,
                backgroundColor:selected? "gold":"",
                color:selected?"black":"",
                fontWeight:selected ? "700" :"500",
                cursor:"pointer",
                "&:hover":{
                    backgroundColor:"gold",
                    color:"black"
                },
                width:"22%"
                    }
    }));
    const classes= useStyles();
    return (
           <span onClick={onClick} className={classes.selectButton}>{children}</span>
    )
}

export default SelectButton;
