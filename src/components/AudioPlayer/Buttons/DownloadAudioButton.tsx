import React from 'react';

import { shallowEqual, useSelector } from 'react-redux';

import DownloadIcon from '../../../../public/icons/download.svg';

import PopoverMenu from 'src/components/dls/PopoverMenu/PopoverMenu';
import Spinner, { SpinnerSize } from 'src/components/dls/Spinner/Spinner';
import { selectAudioData } from 'src/redux/slices/AudioPlayer/state';

const download = (url: string, onDone: () => void) => {
  const splits = url.substring(url.lastIndexOf('/') + 1).split('?');
  const [filename] = splits;
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = () => {
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(xhr.response);
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    onDone();
  };
  xhr.open('GET', url);
  xhr.send();
};

const DownloadAudioButton = () => {
  const audioData = useSelector(selectAudioData, shallowEqual);
  const [loading, setLoading] = React.useState(false);

  const onClick = () => {
    setLoading(true);
    download(audioData.audioUrl, () => {
      setLoading(false);
    });
    setLoading(true);
  };

  return (
    <PopoverMenu.Item
      onClick={onClick}
      icon={loading ? <Spinner size={SpinnerSize.Large} /> : <DownloadIcon />}
    >
      Download
    </PopoverMenu.Item>
  );
};

export default DownloadAudioButton;