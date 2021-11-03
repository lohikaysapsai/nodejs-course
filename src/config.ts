const ParamNames = {
  help: '--help',
  port: '--port',
  helloResponseMsg: '--helloresponsemsg'
};

interface IConfigValues {
  port: number
  helloResponseMsg: string
}

const ConfigValues: IConfigValues = {
  port: 3000,
  helloResponseMsg: 'Hello world [default]'
};

//-----------------------------------------------------------------------------
// Setters and getters

export const setConnectionPort = (portNumber: number): void => {
  ConfigValues.port = portNumber;
}
export const getConnectionPort = (): number => {
  return ConfigValues.port;
}

export const setHelloResponseMsg = (msg: string): void => {
  ConfigValues.helloResponseMsg = msg;
}
export const getHelloResponseMsg = (): string => {
  return ConfigValues.helloResponseMsg;
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
    case ParamNames.helloResponseMsg: {
      setHelloResponseMsg(paramValue)
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
        '\t--helloresponsemsg <message>\n'
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
