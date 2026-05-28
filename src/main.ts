import { ZigbeeAdapter, type ZCLCommandFrame } from './zigbee-adapter.ts';

const logEl = document.createElement('pre');
logEl.style.cssText = 'white-space:pre-wrap;font-family:monospace;padding:1em;background:#111;color:#0f0;min-height:200px;';
document.body.appendChild(logEl);

function log(...args: unknown[]) {
  const line = args.map((a) => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ');
  logEl.textContent += `${line}\n`;
  console.log(...args);
}

async function pickPort(): Promise<SerialPort> {
  log('Requesting serial port...');
  const port = await navigator.serial.requestPort({
    filters: [{ usbVendorId: 0x10c4, usbProductId: 0xea60 }], // CP2102N
  });
  log('Port selected');
  return port;
}

async function runPingTest() {
  let adapter: ZigbeeAdapter | null = null;
  try {
    const port = await pickPort();
    adapter = new ZigbeeAdapter(port);

    log('Opening adapter...');
    await adapter.start();
    log('Adapter started');

    log('Sending SYS_PING...');
    const caps = await adapter.ping();
    log('PONG! Capabilities = 0x' + caps.toString(16).padStart(4, '0'));

    log('All tests passed!');
  } catch (err) {
    log('ERROR:', err instanceof Error ? err.message : String(err));
    console.error(err);
  } finally {
    if (adapter) {
      log('Closing adapter...');
      await adapter.stop().catch((e) => log('Stop error:', e));
      log('Adapter stopped');
    }
  }
}

async function runSendTest() {
  let adapter: ZigbeeAdapter | null = null;
  try {
    const port = await pickPort();
    adapter = new ZigbeeAdapter(port);

    log('Opening adapter...');
    await adapter.start();
    log('Adapter started (AF endpoint registered)');

    // Example: send an OnOff toggle to device at network address 0x1234, endpoint 1, cluster 0x0006
    const frame: ZCLCommandFrame = {
      device: 0x1234,
      endpoint: 1,
      cluster: 0x0006,
      clusterSpecific: true,
      direction: 'client-to-server',
      command: 0x02, // Toggle
      payload: new Uint8Array(0),
    };

    log('Sending ZCL frame...', frame);
    await adapter.send(frame);
    log('ZCL frame accepted by NP');
  } catch (err) {
    log('ERROR:', err instanceof Error ? err.message : String(err));
    console.error(err);
  } finally {
    if (adapter) {
      log('Closing adapter...');
      await adapter.stop().catch((e) => log('Stop error:', e));
      log('Adapter stopped');
    }
  }
}

const btnPing = document.createElement('button');
btnPing.textContent = 'Ping test';
btnPing.style.cssText = 'font-size:1.1em;padding:0.5em 1em;margin:0 0.5em 1em 0;cursor:pointer;';
btnPing.onclick = () => {
  logEl.textContent = '';
  runPingTest();
};

const btnSend = document.createElement('button');
btnSend.textContent = 'Send ZCL frame test';
btnSend.style.cssText = 'font-size:1.1em;padding:0.5em 1em;margin:0 0.5em 1em 0;cursor:pointer;';
btnSend.onclick = () => {
  logEl.textContent = '';
  runSendTest();
};

document.body.insertBefore(btnSend, logEl);
document.body.insertBefore(btnPing, btnSend);

log('Page loaded. Click a button to start.');
