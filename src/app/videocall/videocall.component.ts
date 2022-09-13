import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as OT from '@opentok/client';

@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.css'],
})
export class VideocallComponent implements OnInit, AfterViewInit {
  // apiKey = process.env['API_KEY'];
  apiKey = '47570491';
  sessionId =
    '1_MX40NzU3MDQ5MX5-MTY2Mjk5MjEyNjkwMH56a2pkUFI0MlpSUStVK2lhdDVXN0w0aW5-UH4';
  token =
    'T1==cGFydG5lcl9pZD00NzU3MDQ5MSZzaWc9ZmY4ZmQxYjU3NzZkYzRmMjgzOGQxZjBjMjgxMjAxMjU0MWJhMzE2NTpzZXNzaW9uX2lkPTFfTVg0ME56VTNNRFE1TVg1LU1UWTJNams1TWpFeU5qa3dNSDU2YTJwa1VGSTBNbHBTVVN0VksybGhkRFZYTjB3MGFXNS1VSDQmY3JlYXRlX3RpbWU9MTY2Mjk5MjEyNiZub25jZT0wLjI0MzAxNjc3OTYxOTM5MDI4JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE2NjMwNzg1MjYmY29ubmVjdGlvbl9kYXRhPXJvb21uYW1lJTNEc3VwJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
  streams: Array<OT.Stream> = [];
  session = OT.initSession(String(this.apiKey), this.sessionId);
  share = false;
  @ViewChild('publisherDiv') publisherDiv!: ElementRef;
  @ViewChild('subscriberDiv') subscriberDiv!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    this.initializeSession();
  }

  ngOnInit(): void {
    this.checkForCamera();
    this.session.on('streamDestroyed', (event) => {
      alert('bye');
    });
    this.session.on('mediaStopped', (event) => {
      alert('bye');
    });

    this.session.on('sessionDisconnected', (event) => {
      alert('sessionDisconnected');
    });
    this.session.on('streamPropertyChanged', (event) => {
      alert('streamPropertyChanged');
    });
  }

  checkForCamera() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {})
      .catch(function (err) {
        alert('no camera found');
      });
  }

  handleError(error: any) {
    if (error) {
      alert(error.message);
    }
  }

  initializeSession() {
    this.session.on('streamCreated', (event) => {
      this.streams.push(event.stream);
      console.log(this.streams, event);
    });

    this.session.on('streamDestroyed', (event) => {
      alert(event.stream);
      const idx = this.streams.indexOf(event.stream);
      if (idx > -1) {
        this.streams.splice(idx, 1);
      }
    });

    // Subscribe to a newly created stream

    // Create a publisher
    const poptions: any = {
      insertMode: 'replace',
      width: '640px',
      height: '480px',
    };

    var publisher = OT.initPublisher(
      this.publisherDiv.nativeElement,
      poptions,
      this.handleError
    );

    // Connect to the session
    this.session.connect(this.token, (error) => {
      // If the connection is successful, publish to the session
      if (error) {
        this.handleError(error);
      } else {
        this.session.publish(publisher, this.handleError);
      }
    });

    this.session.on('streamCreated', (event) => {
      this.session.subscribe(
        event.stream,
        this.subscriberDiv.nativeElement,
        {
          insertMode: 'replace',
          width: '640px',
          height: '480px',
        },
        this.handleError
      );
    });
  }

  onShare() {
    this.share = !this.share;
    if (this.share) {
      const poptions: any = {
        videoSource: 'screen',
        insertMode: 'replace',
        width: '640px',
        height: '480px',
      };

      console.log(OT.getUserMedia());

      var publisher = OT.initPublisher(
        this.publisherDiv.nativeElement,
        poptions,
        this.handleError
      );
      this.session.publish(publisher, this.handleError);
    } else {
      const poptions: any = {
        insertMode: 'replace',
        width: '640px',
        height: '480px',
      };

      var publisher = OT.initPublisher(
        this.publisherDiv.nativeElement,
        poptions,
        this.handleError
      );
      this.session.publish(publisher, this.handleError);
      this.onSessionDestroyed(publisher);
    }
  }
  onSessionDestroyed(publisher: OT.Publisher) {
    publisher.on('destroyed', () => {
      alert('destroyed');
    });
  }
}
