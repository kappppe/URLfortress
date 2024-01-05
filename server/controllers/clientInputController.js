const dns = require("dns");

function inputIpCheck(input) {
  const ipAddress = /^(\d{1,3}\.){3}\d{1,3}$/;
  const domainAddress = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (ipAddress.test(input)) {
    return true;
  }
  if (domainAddress.test(input)) {
    return false;
  }
  return null;
}

async function resolveDns(domain) {
  return new Promise((resolve, reject) => {
    dns.resolve(domain, (error, addresses) => {
      if (error) {
        reject(`An error occurred: ${error.message}`);
      } else {
        resolve(addresses[0]);
      }
    });
  });
}

async function checkToResolve(input) {
  const inputResults = inputIpCheck(input);
  if (inputResults === false) {
    return await resolveDns(input);
  } else if (inputResults === true) {
    return input; 
  } else {
    console.log("Invalid input");
    return null;
  }
}

module.exports = {
  checkToResolve,
};
