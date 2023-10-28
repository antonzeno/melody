import React from 'react';
import { PlayButton, Timer } from 'react-soundplayer/components';
import { withCustomAudio } from 'react-soundplayer/addons';
import { Link } from 'react-router-dom';

const AudioPlayer = withCustomAudio(props => {
  const { trackTitle, trackId } = props;

  return (
    <div className='d-flex'>
      <PlayButton {...props} className="custom-player-btn" />
      <div className='d-flex justify-content-between w-100'>
        <Link to={`/soundtrack/${trackId}`} >{trackTitle}</Link>
        <Timer {...props} />
      </div>
    </div>
  );
});

export default AudioPlayer;