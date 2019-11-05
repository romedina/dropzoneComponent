import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const wdPurpleSubtitle = "#1E0E6F";
const wdLightPurple = "#F9F7FC";
const wdDarkPurple = "#E0D7EE";

const useStyles = makeStyles(theme => ({
  thumb: {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
    transition: "0.3s",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "2px 2px 3px rgba(0,0,0,0.4)"
    }
  },
  thumbInner: {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  imgSize: {
    width: "50vw"
  },
  img: {
    display: "block",
    width: "auto",
    height: "100%",
    transition: "5s"
  },
  dragContainer: {
    backgroundColor: wdLightPurple,
    borderRadius: 10,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: wdPurpleSubtitle,
    transition: "0.3s",
    "&:hover": {
      backgroundColor: wdDarkPurple,
      borderStyle: "solid",
      boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
      cursor: "pointer"
    }
  },
  dragContainer_hover: {
    backgroundColor: wdDarkPurple,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
    borderColor: wdPurpleSubtitle
  }
}));

export const ThumbComponent = props => {
  const classes = useStyles();

  const [isCompVisible, setIsCompVisible] = React.useState(true);
  //const [auxObj,setAuxObj] = React.useState({});

  const handleModal = () => {
    props.modalSetter(props.children);
    props.openModal();
  };

  const handleDel = () => {
    let auxObj = props.files;
    delete auxObj[props.fileKey];

    props.delFile(auxObj);

    setIsCompVisible(false);
  };

  // useEffect(()=>{

  // })

  return (
    <React.Fragment>
      {isCompVisible ? (
        <React.Fragment>
          <div className={classes.thumb}>
            <div className={classes.thumbInner}>
              <img
                onClick={handleModal}
                src={props.children}
                className={classes.img}
                alt="miniatura de la imagen que se acaba de subir"
              />
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleDel}
          >
            Eliminar imagen
          </Button>
        </React.Fragment>
      ) : (
        <span />
      )}
    </React.Fragment>
  );
};
