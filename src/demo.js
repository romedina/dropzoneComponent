import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { ThumbComponent } from "./thumbComponent";

const wdPurpleSubtitle = "#1E0E6F";
const wdLightPurple = "#F9F7FC";
const wdDarkPurple = "#E0D7EE";

const useStyles = makeStyles(theme => ({
  subtitleText: {
    color: wdPurpleSubtitle,
    fontWeight: 700
  },
  //styles from demo dropzone
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16
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

export function DropZoneComp() {
  const classes = useStyles();

  const [files, setFiles] = useState({});
  const [open, setOpen] = React.useState(false);
  const [modalToRender, setModalToRender] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    onDrop: (acceptedFiles, rejectedFiles) => {
      keepFiles(acceptedFiles);
      rejectedFiles.map(file => {
        return <p>El archivo {file.path} no tiene formato .jpg o .png</p>;
      });
    }
  });

  function keepFiles(filesToCheck) {
    let keeppedFiles = {};
    filesToCheck.forEach(file => {
      keeppedFiles[`File_ ${file.path}`] = Object.assign(file, {
        preview: URL.createObjectURL(file)
      });
    });
    setFiles({ ...files, ...keeppedFiles });
  }

  function delFile(newFiles) {
    setFiles({ ...newFiles });
  }

  console.log(files);

  function renderFiles() {
    let imgSources = [];
    let fileKeys = [];

    for (let file in files) {
      imgSources.push(files[file].preview);
      fileKeys.push(file);
    }

    return imgSources.map((element, index) => {
      return (
        <React.Fragment key={element}>
          <ThumbComponent
            openModal={handleOpen}
            modalSetter={setModalToRender}
            fileKey={fileKeys[index]}
            files={files}
            setFiles={setFiles}
            delFile={delFile}
          >
            {element}
          </ThumbComponent>
        </React.Fragment>
      );
    });
  }

  const renderModal = () => {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <img
              className={classes.imgSize}
              src={modalToRender}
              alt={modalToRender}
            />
          </div>
        </Fade>
      </Modal>
    );
  };

  const dragActive = (
    <React.Fragment>
      <Box p={10} className={classes.dragContainer_hover}>
        <Typography className={classes.subtitleText} variant="h5">
          Suelta los archivos
        </Typography>
      </Box>
    </React.Fragment>
  );

  const dragInactive = (
    <React.Fragment>
      <Grid item xs={12}>
        <Box p={10} className={classes.dragContainer}>
          <Typography className={classes.subtitleText} variant="h5">
            Arrastra los archivos o presiona para seleccionar
          </Typography>
        </Box>
      </Grid>
    </React.Fragment>
  );

  console.log(files);

  return (
    <React.Fragment>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? dragActive : dragInactive}
      </div>
      <aside className={classes.thumbsContainer}>
        {renderFiles()}
        {renderModal()}
      </aside>
    </React.Fragment>
  );
}
