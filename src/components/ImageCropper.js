/* eslint-disable jsx-a11y/alt-text, func-names, no-unused-vars, no-shadow */
import React, { useCallback, useMemo, useRef, useState } from 'react'
import Dropzone from 'react-dropzone';
import Cropper from 'react-easy-crop';
import { useTranslation } from 'react-i18next';
import { CancelButton, ConfirmButton } from 'components/buttons';
import IconX from './IconX';
import CreateNotification from './NotificationX';
import getCroppedImg from './cropImage'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function ImageCropper({ setFinalImage, setIsPreviewOpen, closeImageLoader, aspectRatio }) {
  const { t } = useTranslation();
  const maxSize = 10000000;
  const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif, image/webp';
  const acceptedFileTypesArray = acceptedFileTypes.split(',').map((item) => item.trim());
  const [srcImage, setSrcImage] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [rotationValue, setRotationValue] = useState(0);
  const [zoomValue, setZoomValue] = useState(1);
  const canvasRef = useRef();
  const imageRef = useRef();
  const [crop, setCrop] = useState({ x: 0, y: 0 })

  const isDragAccept = true;
  const isDragReject = true;
  const isFocused = true;

  const changeZoomValue = (value) => {
    if ((zoomValue + value) >= 1 ) setZoomValue(zoomValue + value);
  }

  const changeRotationValue = (value) => {
    setRotationValue(rotationValue + value);
  }
  const verifyFile = (files) => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileSize = currentFile.size;
      const currentFileType = currentFile.type;
      if (currentFileSize > maxSize) {
        CreateNotification('error', t('Generic.FileTooLarge'), '')
        return false;
      }
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        CreateNotification('error', t('Generic.FileTypeInvalid'), '');
        return false
      }
      return true
    }
    return false
  }

  const onDrop = (files, rejectedFiles) => {
    if (files && files.length > 0) {
      const fileValid = verifyFile(files);
      if (fileValid) {
        const currentFile = files[0];
        const myFileReader = new FileReader();
        myFileReader.addEventListener('load', () => {
          setSrcImage(myFileReader.result);
        }, false)
        myFileReader.readAsDataURL(currentFile);
      }
    }
    if (rejectedFiles.length > 0) {
      CreateNotification('error', t('Generic.FileTooLarge'))
      console.log('Error on selected file : ', rejectedFiles[0].errors[0].code)
    }
  }

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        srcImage,
        croppedAreaPixels,
        rotationValue
      )
      console.log('donee', { croppedImage })
      setFinalImage(croppedImage);
      setIsPreviewOpen(true);
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotationValue])


  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  return (
    <div >
      <div className='d-flex justify-content-between font-md mb-3' style={{ fontSize: '20px' }}>
        <div><IconX name='iconsminds-remove' onClick={() => changeZoomValue(-0.1)} /> {t("generic.zoom")} <IconX name='iconsminds-add' onClick={() => changeZoomValue(0.1)} /></div>
        <div><IconX name='iconsminds-remove' onClick={() => changeRotationValue(-5)} /> {t("generic.rotation")} <IconX name='iconsminds-add' onClick={() => changeRotationValue(5)} /></div>
        <div>
          <CancelButton onClick={closeImageLoader} />
          <ConfirmButton onClick={showCroppedImage} />
        </div>
      </div>
      <Dropzone onDrop={onDrop} maxSize={maxSize} multiple={false} acceptedFileTypes={acceptedFileTypes}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps(style)}>
              <input {...getInputProps()} />
              <div style={style} >
                {t('generic.loadImageInstructions')}
              </div>
            </div>
          </section>
        )}
      </Dropzone>

      <div>
        {srcImage !== null
          ? <div style={{ width: '600px', height: '450px', position: 'relative' }} className='d-flex flex-row justify-content-center mt-3'  >
            <Cropper
              image={srcImage}
              crop={crop}
              rotation={rotationValue}
              zoom={zoomValue}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onRotationChange={setRotationValue}
              onCropComplete={onCropComplete}
              onZoomChange={setZoomValue}
            />

          </div>
          : ''

        }
      </div>

    </div>
  )
}

export default ImageCropper;