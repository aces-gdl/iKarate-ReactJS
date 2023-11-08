/* eslint-disable react-hooks/exhaustive-deps, react/display-name, no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import Axios from "axios";
import React, { useEffect, useState, forwardRef } from "react";
import PropTypes from "prop-types";
import ImageCropper from './ImageCropper';
import { Button, Dialog, DialogActions, DialogContent, Modal, ModalBody, Stack } from "@mui/material";
import { IconPictureInPictureOn } from "@tabler/icons";
import { Buffer } from 'buffer'
import { ImagesearchRollerOutlined } from "@mui/icons-material";
import './styles.css'
import notFound from './karate60.png'


const MyLoadImageFromURL = forwardRef((props, ref) => {
  const [picBase64, setPicBase64] = useState("");
  const [isCropperOpen, setIsCropperOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [finalImage, setFinalImage] = useState('');
  const [imageFound, setImageFound] = useState(true);
  const [loadedImage, setLoadedImage] = useState('');

  const { imageid, id, handleupdate, imagename, loadimage, name, thumbnail, avatar } = props

  const loadpicture = () => {
    if (!ImagesearchRollerOutlined) return;

    const preview = document.getElementById(id);

    if (!preview) return;
    let myURL = '/v1/utility/image?ID=' + imageid
    myURL = myURL + (thumbnail ? '&thumbnail=true' : '')
    setImageFound(true);
    Axios.get(myURL)
      .then((response) => {
        let base64ToString = Buffer.from(response.data, "base64").toString();
        preview.setAttribute("src", `data:image/jpeg;base64,${base64ToString}`);
      })
      .catch((error) => {
        console.log(error)
      }
      )

  };

  useEffect(() => {

    //   loadpicture();

  }, []);


  const GetPicture = () => {
    if (loadimage) {
      setIsCropperOpen(true);
    }
  }

  const onClose = () => {
    setIsCropperOpen(false);
  }


  function dataURLtoBlob(dataURL) {
    let array, binary, i, len;
    binary = atob(dataURL.split(',')[1]);
    array = [];
    i = 0;
    len = binary.length;
    while (i < len) {
      array.push(binary.charCodeAt(i));
      i++;
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/png'
    });
  };

  const handlecropperaccept = () => {
    console.log('Cropper Accept');
    const preview = document.getElementById(id);
    preview.setAttribute("src", finalImage);
    setImageFound(true);

    setIsCropperOpen(false);
    setIsPreviewOpen(false);
    const canvas = document.createElement('canvas');
    canvas.setAttribute('src', finalImage)

    fetch(preview.src)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          let file = dataURLtoBlob(reader.result);
          if (handleupdate) {
            const myEvent = {
              target: {
                name: name,
                value: file,
              }
            };
            handleupdate(myEvent)
          }
        };
        reader.readAsDataURL(blob);
      });
  }



  const closeImageLoader = () => {
    setIsCropperOpen(false);
  }
  const getInitials = (username) => {
    let initials = '';
    username.split(' ').forEach((word) => { initials += word[0].toString().toUpperCase() })
    return initials;
  }
  let myURL = thumbnail ? `/v1/utility/image?ID=${imageid}&thumb=true` : `/v1/utility/image?ID=${imageid}`
  let myClassName = avatar ? 'circle': '';
  return (
    <>
      <div hidden={!imageFound} style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <object data={myURL} type="image/png">
          <img alt={getInitials} src={notFound} />

        </object>
        <img
          {...props}
          hidden={!imageFound}
          loading='lazy'
          alt={getInitials}
          onClick={GetPicture}
          src={myURL}
          className={myClassName}
         
        />
      </div>

      {!imageFound && (
        <>
          {imagename && imagename.length > 0 && (
            <div className='circle' onClick={GetPicture} >{getInitials(imagename)}</div>
          )}
          {!imagename && (
            <div
              className='d-flex align-self-center justify-center h2 justify-content-center'
              style={{ height: props.height, border: "1px", borderColor: "gray", borderStyle: "dashed", borderRadius: "5px" }} >
              <div style={{ height: 43 }} className='align-self-center'>
                Not Found image
                <IconPictureInPictureOn onClick={GetPicture} />
              </div>
            </div>
          )}
        </>
      )}


      <Dialog open={isCropperOpen} onClose={onClose} fullWidth>
        <DialogContent>
          <ImageCropper setFinalImage={(i) => setFinalImage(i)} setIsPreviewOpen={setIsPreviewOpen} closeImageLoader={closeImageLoader} aspectRatio={props.aspectRatio} />
        </DialogContent>
      </Dialog>

      <Dialog open={isPreviewOpen} onClick={() => setIsPreviewOpen(false)} size="lg" >
        <DialogContent>
          <img src={finalImage} alt='final' height='300px' />
        </DialogContent>
        <DialogActions>
          <Stack spacing={2} direction='row' justifyContent='end' paddingTop={3}>
            <Button onClick={() => setIsPreviewOpen(false)} variant='contained'>Cancelar</Button>
            <Button onClick={handlecropperaccept} variant='contained'>Aceptar</Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
});

const LoadImageFromURL = React.memo(MyLoadImageFromURL);

LoadImageFromURL.propTypes = {
  id: PropTypes.string,
  imagename: PropTypes.string,
  imageid:PropTypes.string,
  thumbnail:PropTypes.bool
}

export default LoadImageFromURL;