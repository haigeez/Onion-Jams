import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

// Gunakan Chromium lokal bila ada (env tanpa akses download)
import {existsSync} from 'fs';
if (existsSync('/opt/pw-browsers/chromium')) {
  Config.setBrowserExecutable('/opt/pw-browsers/chromium');
  Config.setChromeMode('chrome-for-testing');
}
