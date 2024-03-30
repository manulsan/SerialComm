export interface ElectronFileFilter {
  name: string;
  extensions: string[];
}
export interface PortInfo {
  //friendlyName: string;
  locationId: string;
  manufacturer: string;
  path: string;
  pnpId: string;
  productId: string;
  serialNumber: string;
  vendorId: string;
}

export interface ElectronApi {
  openFileDialog: (
    title: string,
    folder: string,
    filters: ElectronFileFilter
  ) => Promise<string[]>;
  toggleMaximize: () => void;
  close: () => void;
  minimize: () => void;
  getPortList: () => Promise<string[]>;
  writeString: (data: string) => void;
  readString: () => Promise<string>;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const electronApi: ElectronApi = (window as { electronApi: ElectronApi })
  .electronApi;
