const dns = require("dns");

function inputIpCheck(input) {
  const ipAddress = /^(\d{1,3}\.){3}\d{1,3}$/;
  const domainAddress = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (ipAddress.test(input)) {
    return false;
  }
  if (domainAddress.test(input)) {
    return true;
  }
  return null;
}

async function resolveDns(domain) {
  return new Promise((resolve, reject) => {
    dns.resolve(domain, (error, addresses) => {
      if (error) {
        reject(`DNS resolution failed for ${domain}: ${error.message}`);
      } else {
        resolve(addresses[0]);
      }
    });
  });
}

async function checkToResolve(input) {
  try {
    const inputResults = inputIpCheck(input);
    if (inputResults === false) {
      return false;
    } else if (inputResults === true) {
      return await resolveDns(input);
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error in checkToResolve: ${error.message}`);
    throw error;
  }
}

module.exports = {
  checkToResolve,
};
