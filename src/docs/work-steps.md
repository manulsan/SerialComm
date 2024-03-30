# adding serial port

## refs

- https://www.npmjs.com/package/serialport
- https://serialport.io/docs/guide-installation
- https://github.com/serialport/electron-serialport.git

## Issues

### https://github.com/SimulatedGREG/electron-vue/issues/872

- If you are using Eletron with Vue.js you need to rebuild the serialport module doing something like this:

```
npm install electron-rebuild --save-dev
```

- after this, you can add in your package.json > section "scripts", another line saying:

```
"rebuild": "electron-rebuild -f -w serialport"
```

- You can rebuild the module with terminal command

```
npm run rebuild
```

## Functions

### getPortList()

- list of ports

```ts
export interface PortInfo {
  friendlyName: string;
  locationId: string;
  manufacturer: string;
  path: string;
  pnpId: string;
  productId: string;
  serialNumber: string;
  vendorId: string;
}
```

```
friendlyName: "표준 Bluetooth에서 직렬 링크(COM6)"
locationId: undefined
manufacturer: "Microsoft"
path: "COM6"
pnpId: "BTHENUM\\{00001101-0000-1000-8000-00805F9B34FB}_LOCALMFG&0000\\7&24F8983F&0&000000000000_00000010"
productId: undefined
serialNumber: undefined
vendorId: und
```

### writeString(char \*str)

### readString(int timeOut)
