/* eslint-disable   no-param-reassign */
import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function ImageCropper(props) {
  const { imageToCrop, onImageCropped, zoomValue, rotationValue } = props;
  const imageRef = React.createRef();

  const [cropConfig, setCropConfig] = useState(
    // default crop config
    {
      unit: 'px', // Can be 'px' or '%'
      x: 25,
      y: 25,
      width: 250,
      height:200,
      aspect: 5 /4
    }
  );



  function getCroppedImage(sourceImage, myCropConfig, fileName) {
    // creating the cropped image from the source image
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = myCropConfig.width;
    canvas.height = myCropConfig.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      sourceImage,
      myCropConfig.x * scaleX,
      myCropConfig.y * scaleY,
      myCropConfig.width * scaleX,
      myCropConfig.height * scaleY,
      0,
      0,
      myCropConfig.width,
      myCropConfig.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        // returning an error
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }

        blob.name = fileName;
        // creating a Object URL representing the Blob object given
        const croppedImageUrl = window.URL.createObjectURL(blob);

        resolve(croppedImageUrl);
      }, "image/jpeg");
    });
  }

  async function cropImage(crop) {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImage(
        imageRef.current,
        crop,
        "croppedImage.jpeg" // destination filename
      );

      // calling the props function to expose
      // croppedImage to the parent component
      onImageCropped(croppedImage);
    }
  }
  return (
    <div>
      {imageToCrop !== null ? (
        <ReactCrop
          crop={cropConfig}
          ruleOfThirds
          locked
          onComplete={(myCropConfig) => cropImage(myCropConfig)}
          onChange={(myCropConfig) => setCropConfig(myCropConfig)}
          crossorigin="anonymous" // to avoid CORS-related problems
        >
          <img src={imageToCrop} alt='to be cropped' ref={imageRef}
            style={{ transform: `scale(${zoomValue}) rotate(${rotationValue}deg)`, height: '75vh' }}
          />
        </ReactCrop>
      ) : ''}
    </div>
  );
}

ImageCropper.defaultProps = {
  onImageCropped: () => { }
};

export default ImageCropper;
