import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Card,
  CardContent,
  Button,
  MenuItem,
} from "@material-ui/core";
import docs from "../../constants/docs";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: 10,
    borderRadius: 20,
  },
  content: {
    [theme.breakpoints.down("sm")]: {
      padding: "5% 10%",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  textField: {
    margin: 5,
    minWidth: 200,
    [theme.breakpoints.up("md")]: {
      minWidth: 150,
    },
  },
  button: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "5%",
    },
  },
}));

export default function WorkingtimeInput({
  workingTime,
  setworkingTime,
  sections,
}) {
  const classes = useStyles();

  const [day, setday] = useState("");
  const [period, setperiod] = useState("");
  // const [room, setroom] = useState(sections.length);

  const [dayError, setdayError] = useState("");
  const [periodError, setperiodError] = useState("");

  const dayChange = (event) => {
    setday(event.target.value);
  };

  const periodChange = (event) => {
    setperiod(event.target.value);
  };
  // const roomChange = (event) => {
  //   setroom(event.target.value);
  // };

  const setRequiredError = () => {
    !day ? setdayError("Required") : setdayError("");
    !period ? setperiodError("Required") : setperiodError("");
  };

  const setEmptyTextfields = () => {
    setday("");
    setperiod("");

    setdayError("");
    setperiodError("");
  };

  const addButton = () => {
    if (day && period) {
      let temp = { ...workingTime };
      temp[day] = period;
      // temp = temp.filter((value) => value !== day);
      setworkingTime(temp, docs.workingTime);

      setEmptyTextfields();
    } else setRequiredError();
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <h3 style={{ textAlign: "left" }}>Working Days & Periods</h3>

        <div>
          <TextField
            type="number"
            className={classes.textField}
            id="day"
            label="Day"
            select
            required
            error={!!dayError}
            helperText={dayError}
            onChange={dayChange}
            value={day}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          >
            {Object.entries(workingTime)
              .filter((e) => e[1] === 0)
              .map((option) => (
                <MenuItem key={option[0]} value={option[0]}>
                  {option[0]}
                </MenuItem>
              ))}
          </TextField>
        </div>

        <div>
          <TextField
            type="number"
            className={classes.textField}
            id="periods"
            label="Periods(hr)"
            select
            required
            error={!!periodError}
            helperText={periodError}
            onChange={periodChange}
            value={period}
            onKeyDown={(e) => {
              if (e.keyCode === 13) addButton();
            }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            type="number"
            className={classes.textField}
            id="days"
            label="Rooms"
            select
            required
            // onChange={roomChange}
            value={sections.length}
            onKeyDown={(e) => {
              if (e.keyCode === 13) addButton();
            }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          >
            {
              <MenuItem key={"rooms"} value={sections.length}>
                {sections.length}
              </MenuItem>
            }
          </TextField>
        </div>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="medium"
          onClick={addButton}
        >
          +Add
        </Button>
      </CardContent>
    </Card>
  );
}
