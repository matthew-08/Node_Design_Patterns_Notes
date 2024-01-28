abstract class ColorConsole {
  log(data: string) {}
}

class RedConsole implements ColorConsole {
  log(data: string) {
    console.log('\x1b[31m', data);
  }
}

class BlueConsole implements ColorConsole {
  log(data: string) {
    console.log('\x1b[34m', data);
  }
}

class GreenConsole implements ColorConsole {
  log(data: string) {
    console.log('\x1b[32m', data);
  }
}

function logger(color: 'red' | 'blue' | 'green') {
  switch (color) {
    case 'red':
      return new RedConsole();
    case 'blue':
      return new BlueConsole();
    case 'green':
      return new GreenConsole();
  }
}

logger('red').log('this is red');
logger('blue').log('this is blue');
logger('green').log('this is green');
