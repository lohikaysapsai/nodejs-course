import { defaultTCPPort, apiKey } from './constants';

const ParamNames = {
  help: '--help',
  port: '--port',
  apiKey: '--apikey'
};

interface IConfigValues {
  port: number
  apiKey: string
}

const ConfigValues: IConfigValues = {
  port: defaultTCPPort,
  apiKey: apiKey
};

//-----------------------------------------------------------------------------
// Setters and getters

export const setConnectionPort = (portNumber: number): void => {
  ConfigValues.port = portNumber;
}
export const getConnectionPort = (): number => {
  return ConfigValues.port;
}

export const setApiKey = (value: string): void => {
  ConfigValues.apiKey = value;
}
export const getApiKey = (): string => {
  return ConfigValues.apiKey;
}

//-----------------------------------------------------------------------------

/**
 * Set param pairs by specify name
 * @param paramPair is array => [0] - param name; [1] - param value; 
 */
 export const setPairParamByName = (paramPair: string[]): void => {
  const paramName = paramPair[0].toLowerCase();
  const paramValue = paramPair[1];
  switch(paramName) {
    case ParamNames.port: {
      setConnectionPort(Number.parseInt(paramValue));
      break;
    }
    case ParamNames.apiKey: {
      setApiKey(paramValue);
      break;
    }
    default: return;
  }
}

/**
 * Call specify functionality if user passed only one parameter
 * @param paramName 
 */
 export const callFlagParam = (paramName: string): void => {
  switch(paramName) {
    case ParamNames.help: {
      console.log(
        '\t--port <port number>\n',
        '\t--apikey <string api key value>\n',
      );
      break;
    }
    default: return;
  }
}

/**
 * Parse and setup application parameters passed by console arguments
 * @param args - arguments from process.env
 * @returns true - success; false - error;
 */
 export const setConfig = (args: string[]): boolean => {
  if (args.length % 2 === 0) {
    for (let i = 0; args.length; i++) {
      const paramPair = args.splice(0, 2);
      setPairParamByName(paramPair);
    }
  } else {
    callFlagParam(args[0]);
  }
  return true;
}

export const getConfig = (): IConfigValues => {
  return ConfigValues;
}
