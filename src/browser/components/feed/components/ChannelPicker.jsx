import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../common/input/Input';

import './ChannelPicker.css';

const ChannelPicker = ({ channels, selectedChannel, pickChannel, addChannel, openModal }) => {
  let input;
  return (
    <div className="channelpicker">
      <div className="sw">
        <p>
          {
            channels.map(
              (channel, index) => {
                const ind = index;
                if (channel === selectedChannel) {
                  return (
                    <span key={`channel-picker-${ind}`}>{channel}</span>
                  );
                }
                return (
                  <a
                    key={`channel-picker-${ind}`}
                    href=""
                    title={channel}
                    onClick={(e) => { e.preventDefault(); pickChannel(channel); }}
                  >
                    {channel}
                  </a>
                );
              },
            )
          }
        </p>
        <div className="fakeform">
          <Input
            ref={(newchannel) => { input = newchannel; }}
            type={'text'}
            name={'newchannel'}
            placeholder={'Add a channel'}
            value={''}
            synch={() => {}}
          />
          <button
            onClick={
              (e) => {
                e.preventDefault();
                addChannel(input.el.value);
                input.setState({ value: '' });
              }
            }
          >
            add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelPicker;

ChannelPicker.propTypes = {
  channels: PropTypes.instanceOf(Array).isRequired,
  addChannel: PropTypes.func.isRequired,
  selectedChannel: PropTypes.string.isRequired,
  pickChannel: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
