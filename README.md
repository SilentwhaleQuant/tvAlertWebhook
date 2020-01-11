# tvAlertWebhook
A simple tradingview alert listener for sending message to webhook
提供了一个基础的轮子。供学习，修改。

![](https://github.com/xiaoyual666/tvAlertWebhook/blob/master/src/icons/pic.png)

## Usage

首先build，然后dist文件夹拖到 chrome://extensions/ 下
build 方式如下：

### `npm run build`

Build the extension into `dist` folder for **production**.

### `npm run build:dev`

Build the extension into `dist` folder for **development**.

### `npm run watch`

Watch for modifications then run `npm run build`.

### `npm run watch:dev`

Watch for modifications then run npm run build:dev.

### `npm run build-zip`

Build a zip file following this format `<name>-v<version>.zip`, by reading `name` and `version` from `manifest.json` file.
Zip file is located in `dist-zip` folder.
