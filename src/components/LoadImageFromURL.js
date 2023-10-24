/* eslint-disable react-hooks/exhaustive-deps, react/display-name, no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import Axios from "axios";
import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { CancelButton, ConfirmButton } from 'components/buttons';
import authHeader from "../../services/auth-header";
import ImageCropper from './ImageCropper';
import './controls.css'
import IconX from "./IconX";


const MyLoadImageFromURL = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const [picBase64, setPicBase64] = useState("");
  const [isCropperOpen, setIsCropperOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [finalImage, setFinalImage] = useState('');
  const [imageFound, setImageFound] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      getImageBase64: () => {
        return picBase64;
      },
      clearImage: () => {
        setImageFound(false);
        setFinalImage('');
        const myEvent = {
          target: {
            name: props.name,
            value: '',
          }
        };
        props.handleUpdate(myEvent);
      }
    }),
    [picBase64]
  )

  const loadpicture = () => {
    if (!props.picurl) return;

    const preview = document.getElementById(props.id);

    if (!preview) return;

    const myHeader = {
      headers: authHeader(),
      responseType: "arraybuffer",
    };
    Axios.get(props.picurl, myHeader)
      .then((response) => {
        if (response.data.byteLength > 200) {
          if (props.fromtable) {
            let base64ToString = Buffer.from(response.data, "base64").toString();
            base64ToString = JSON.parse(base64ToString);
            preview.setAttribute("src", `data:image/jpeg;base64,${base64ToString.elements[0].Picture}`);
          } else {

            const myBlob = new Blob([response.data])
            const srcBlob = URL.createObjectURL(myBlob);
            preview.setAttribute("src", srcBlob);
            setImageFound(true)
          }
        }
      })
      .catch((error) => {
        console.log(error)
      }
      )

  };

  useEffect(() => {

    loadpicture();

  }, []);

  useEffect(() => {
    loadpicture();

  }, [props.picurl]);

  const GetPicture = () => {
    if (props.loadimage) {
      setIsCropperOpen(true);
    }
  }

  const onClose = () => {
    setIsCropperOpen(false);
  }

  const handleCropperAccept = () => {
    console.log('Cropper Accept');
    const preview = document.getElementById(props.id);
    preview.setAttribute("src", finalImage);
    setImageFound(true);

    setIsCropperOpen(false);
    setIsPreviewOpen(false);
    const canvas = document.createElement('canvas');
    canvas.setAttribute('src', finalImage)

    const getBase64StringFromDataURL = (dataURL) =>
      dataURL.replace('data:', '').replace(/^.+,/, '');

    fetch(preview.src)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = getBase64StringFromDataURL(reader.result);
          if (props.handleUpdate) {
            const myEvent = {
              target: {
                name: props.name,
                value: base64,
              }
            };
            props.handleUpdate(myEvent)
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

  return (
    <>
      <div hidden={!imageFound} style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          {...props}
          disabled={props.disabled}
          hidden={!imageFound}
          loading='lazy'
          alt="preview"
          onClick={GetPicture}
        />
      </div>

      {!imageFound && (
        <>
          {props.username && props.username.length > 0 && (
            <div className='circle' >{getInitials(props.username)}</div>
          )}
          {!props.username && (
            <div
              className='d-flex align-self-center justify-center h2 justify-content-center'
              style={{ height: props.height, border: "1px", borderColor: "gray", borderStyle: "dashed", borderRadius: "5px" }} >
              <div style={{ height: 43 }} className='align-self-center'>
                <IconX name='iconsminds-photo' onClick={GetPicture} />
              </div>
            </div>
          )}
        </>
      )}
      <Modal isOpen={isCropperOpen} onClose={onClose} size="lg">
        <ModalHeader>
          <h1>{t('generic.imageLoader')}</h1>
        </ModalHeader>
        <ModalBody>
          <ImageCropper setFinalImage={(i) => setFinalImage(i)} setIsPreviewOpen={setIsPreviewOpen} closeImageLoader={closeImageLoader} aspectRatio={props.aspectRatio} />
        </ModalBody>
      </Modal>

      <Modal isOpen={isPreviewOpen} onClick={() => setIsPreviewOpen(false)} size="lg" >
        <ModalHeader>
          <h1>{t('generic.imageLoader')}</h1>
        </ModalHeader>
        <ModalBody>
          <img src={finalImage} alt='final' height='300px' />
        </ModalBody>
        <ModalFooter>
          <CancelButton onClick={() => setIsPreviewOpen(false)} />
          <ConfirmButton onClick={handleCropperAccept} />
        </ModalFooter>
      </Modal>
    </>
  );
});

const LoadImageFromURL = React.memo(MyLoadImageFromURL);

LoadImageFromURL.propTypes = {
  id: PropTypes.string.isRequired,
  picurl: PropTypes.string.isRequired
}

export default LoadImageFromURL;