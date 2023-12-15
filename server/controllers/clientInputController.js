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

const clientInput = "svt.se";
const result = inputIpCheck(clientInput);
console.log(result);

if (result != true) {
  dns.resolve(clientInput, (error, addresses) => {
    if (error) {
      console.log(`An error occurred: ${error.message}`);
      return;
    }

    console.log(`IP addresses for ${clientInput}:`);
    addresses.forEach((address) => {
      console.log(address);
    });
  });
}

if (result === true) {
  dns.reverse(clientInput, (err, hostnames) => {
    if (err) {
      console.error("Reverse DNS lookup failed:", err.message);
      return;
    }
    console.log("Domain(s) for IP:", clientInput);
    console.log(hostnames);
  });
}

module.exports = {
  inputIpCheck,
};
