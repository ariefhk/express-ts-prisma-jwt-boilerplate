/*want globalThis obj */
const getGlobal = () => {
    return globalThis;
};

// console.log(getGlobal());

/*Want to know hostName */
import os from "os";
const hostName = os.hostname();

// console.log(hostName);
