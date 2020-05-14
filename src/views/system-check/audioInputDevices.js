import React, { Component } from "react";
import * as loggedInUser from "../../helpers/auth-service";
import { Table, CardTitle, CardBody, Card, Container } from "reactstrap";
var DetectRTC = require('detectrtc');

export class AudioInputDevices extends Component {
  constructor(props) {
    super();
    this.state = {
      ...props,
      deviceConfig: {}
    };
  }
  componentWillMount() {
    let self = this
    DetectRTC.load(function () {
      self.setState({
        deviceConfig: DetectRTC
      })
    });
    let token = loggedInUser.getToken();
    // window.location = "https://www.leverageedu.com/app?token=" + token;
  }
  render() {
    const { deviceConfig } = this.state;
    return (
      <Container>
        <Card>
          <CardBody>
            <CardTitle>
            Audio Input Devices
        </CardTitle>
            {
              deviceConfig ?
                (
                  <Table striped className="table-responsive">

                    <thead>
                      <tr>
                        <th>label</th>
                        <th>deviceId</th>
                        <th>groupId</th>
                        <th>id</th>
                        <th>kind</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DetectRTC.audioInputDevices.length ? DetectRTC.audioInputDevices.map((data, indx) => {
                        return (
                          <tr key={indx}>
                            <td> {data.label}</td>
                            <td> {data.deviceId}</td>
                            <td> {data.groupId}</td>
                            <td> {data.id}</td>
                            <td> {data.kind}</td>
                          </tr>
                        );
                      }) : null}
                    </tbody>
                  </Table>) : null}
          </CardBody>
        </Card>
      </Container>);
  }
}

export default AudioInputDevices;