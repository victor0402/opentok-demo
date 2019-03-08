import React, {Component} from 'react';
import {View} from 'react-native';
import {OT, OTPublisher, OTSession, OTSubscriber} from "opentok-react-native";

export default class App extends Component {

  //Publisher token
  token = 'TOKEN HERE';

  //Routed session ID
  session = 'SESSION ID HERE';

  apiKey = 'API KEY';

  constructor(props) {
    super(props);

    this.state = {
      streamProperties: {},
    };

    this.publisherProperties = {
      publishVideo: true,
      publishAudio: true,
      cameraPosition: 'front'
    };

    this.publisherEventHandlers = {
      streamCreated: event => {
        console.log('publisherEventHandlers: streamCreated.... updating state');
        const streamProperties = {
          ...this.state.streamProperties, [event.streamId]: {
            subscribeToAudio: true,
            subscribeToVideo: true,
            style: {
              width: 400,
              height: 300,
            },
          }
        };
        this.setState({streamProperties});
      },
      streamDestroyed: event => {
        console.log('Publisher stream destroyed!', event);
      }
    };

    this.subscriberProperties = {
      subscribeToAudio: true,
      subscribeToVideo: true,
    };

    this.sessionEventHandlers = {
      streamCreated: event => {
        console.log('sessionEventHandlers : streamCreated');
      },

      streamDestroyed: event => {
        console.log('Stream destroyed!!!!!!', event);
      },
    };

    this.subscriberEventHandlers = {
      error: (error) => {
        console.log(`There was an error with the subscriber: ${error}`);
      },
    };
  }

  render() {
    OT.enableLogs(true);

    return (
      <View>
        <OTSession apiKey={this.apiKey} sessionId={this.session} token={this.token}
                   eventHandlers={this.sessionEventHandlers}>

          <OTPublisher
            properties={this.publisherProperties}
            eventHandlers={this.publisherEventHandlers}
            style={{ height: 100, width: 100 }}
          />

          <OTSubscriber
            properties={this.subscriberProperties}
            eventHandlers={this.subscriberEventHandlers}
            style={{height: 100, width: 100}}
            streamProperties={this.state.streamProperties}
          />
        </OTSession>
      </View>

    );
  }
}