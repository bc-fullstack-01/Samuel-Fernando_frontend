import React, { useState, useCallback } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import {useDropzone} from 'react-dropzone';

import './index.css';

interface Props {
  onFileUploaded: (file: File) => void;
}

function Dropzone({ onFileUploaded }: Props) {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);
      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps} = useDropzone({
    onDrop,
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input { ...getInputProps() } />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt='Point thumbnail' className='img'/>
      ) : (
        <p>
          <ImageIcon />
        </p>
      )}
    </div>
  );
}

export default Dropzone;
