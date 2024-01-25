const { Buffer } = require('buffer');

var SERVER_PORT = 8124;
var TCP_DELIMITER = '|';
var packetHeaderLen = 4; // 32 bit integer --> 4

var server = net.createServer(function (socket) {
  var accumulatingBuffer = new Buffer(0);
  var totalPacketLen = -1;
  var accumulatingLen = 0;
  var recvdThisTimeLen = 0;
  var remoteAddress = socket.remoteAddress;
  var address = socket.address();
  var remotePort = socket.remotePort;
  var remoteIpPort = remoteAddress + ':' + remotePort;

  console.log('-------------------------------' + remoteAddress);
  console.log('remoteIpPort=' + remoteIpPort);

  socket.on('data', function (data) {
    console.log('received data length :' + data.length);
    console.log('data=' + data);

    recvedThisTimeLen = data.length;
    console.log('recvedThisTimeLen=' + recvedThisTimeLen);

    //accumulate incoming data
    var tmpBuffer = new Buffer(accumulatingLen + recvedThisTimeLen);
    // accLength = 2, recvLength = 2
    // tmpBuffer [00, 00, 00, 00]
    accumulatingBuffer.copy(tmpBuffer);
    // tmpBuffer [24, 24, 00, 00]
    data.copy(tmpBuffer, accumulatingLen); // offset for accumulating
    // tmpBuffer [24,24,24,24]
    accumulatingBuffer = tmpBuffer;
    // [24,24,24,24]
    tmpBuffer = null;
    accumulatingLen += recvedThisTimeLen;
    // 4
    console.log('accumulatingBuffer = ' + accumulatingBuffer);
    console.log('accumulatingLen    =' + accumulatingLen);

    if (recvedThisTimeLen < packetHeaderLen) {
      console.log(
        'need to get more data(less than header-length received) -> wait..'
      );
      return;
    } else if (recvedThisTimeLen == packetHeaderLen) {
      console.log(
        'need to get more data(only header-info is available) -> wait..'
      );
      return;
    } else {
      console.log('before-totalPacketLen=' + totalPacketLen);
      //a packet info is available..
      if (totalPacketLen < 0) {
        totalPacketLen = accumulatingBuffer.readUInt32BE(0);
        console.log('totalPacketLen=' + totalPacketLen);
      }
    }

    //while=>
    //in case of the accumulatingBuffer has multiple 'header and message'.
    while (accumulatingLen >= totalPacketLen + packetHeaderLen) {
      console.log('accumulatingBuffer= ' + accumulatingBuffer);

      var aPacketBufExceptHeader = new Buffer(totalPacketLen); // a whole packet is available...
      console.log(
        'aPacketBufExceptHeader len= ' + aPacketBufExceptHeader.length
      );
      accumulatingBuffer.copy(
        aPacketBufExceptHeader,
        0,
        packetHeaderLen,
        accumulatingBuffer.length
      ); //

      ////////////////////////////////////////////////////////////////////
      //process one packet data
      var stringData = aPacketBufExceptHeader.toString();
      var usage = stringData.substring(0, stringData.indexOf(TCP_DELIMITER));
      console.log('usage: ' + usage);
      //call handler
      serverFunctions[usage](
        socket,
        remoteIpPort,
        stringData.substring(1 + stringData.indexOf(TCP_DELIMITER))
      );
      ////////////////////////////////////////////////////////////////////

      //rebuild buffer
      var newBufRebuild = new Buffer(accumulatingBuffer.length);
      newBufRebuild.fill();
      accumulatingBuffer.copy(
        newBufRebuild,
        0,
        totalPacketLen + packetHeaderLen,
        accumulatingBuffer.length
      );

      //init
      accumulatingLen -= totalPacketLen + 4;
      accumulatingBuffer = newBufRebuild;
      newBufRebuild = null;
      totalPacketLen = -1;
      console.log('Init: accumulatingBuffer= ' + accumulatingBuffer);
      console.log('      accumulatingLen   = ' + accumulatingLen);

      if (accumulatingLen <= packetHeaderLen) {
        return;
      } else {
        totalPacketLen = accumulatingBuffer.readUInt32BE(0);
        console.log('totalPacketLen=' + totalPacketLen);
      }
    }
  });
});
