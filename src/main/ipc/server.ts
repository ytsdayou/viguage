const http = require('http');
const fs = require('fs');

let videoServer: any;

export function serveVideo(serverPort: number, videoFilePath: string): void {
  const server = http.createServer((req: any, res: any) => {
    // Check if the requested URL is for the video file
    if (req.url.indexOf('/video') > -1 && req.method === 'GET') {
      const stat = fs.statSync(videoFilePath);
      const fileSize = stat.size;
      const { range } = req.headers;

      if (range) {
        let [start, end] = range.replace(/bytes=/, '').split('-');

        start = parseInt(start, 10);
        end = end ? parseInt(end, 10) : fileSize - 1;

        // eslint-disable-next-line no-restricted-globals
        if (isNaN(start)) {
          end = fileSize - 1;
        }
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(start) && !isNaN(end)) {
          start = fileSize - end;
          end = fileSize - 1;
        }

        // Handle unavailable range request
        if (start >= fileSize || end >= fileSize) {
          // Return the 416 Range Not Satisfiable.
          res.writeHead(416, {
            'Content-Range': `bytes */${fileSize}`,
          });
          return res.end();
        }

        const chunksize = end - start + 1;
        const file = fs.createReadStream(videoFilePath, { start, end });

        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoFilePath).pipe(res);
      }
    } else {
      // Handle other requests
      res.end('404 Not Found');
    }

    return undefined;
  });

  server.listen(serverPort, () => {
    // console.log(`Server running at http://localhost:${serverPort}/video`);
  });

  server.on('close', () => {
    // console.log('server close 3000');
  });

  videoServer = server;
}

export function startVideoServer(port: number, videoPath: string): void {
  if (videoServer) {
    videoServer.close();
  }

  try {
    serveVideo(port, videoPath);
  } catch (error) {
    // console.log('server start error:', error);
  }
}

export function stopVideoServer(): void {
  if (videoServer) {
    videoServer.close();
    videoServer = null;
  }
}

export function streamVideo(newVideoPath: string): void {
  const port = 3000;
  stopVideoServer(); // Stop the current server
  startVideoServer(port, newVideoPath); // Start the server with the new video path
}
