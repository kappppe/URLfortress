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
    return false;
  } else {
    console.log("Invalid input");
    return null;
  }
}

// function inputIpCheck(input) {
//   const ipAddress = /^(\d{1,3}\.){3}\d{1,3}$/;
//   const domainAddress = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//   if (ipAddress.test(input)) {
//     return true;
//   }
//   if (domainAddress.test(input)) {
//     return false;
//   }
//   return null;
// }

// function resolveDns(domain) {
//   dns.resolve(domain, (error, addresses) => {
//     if (error) {
//       console.log(`An error occurred: ${error.message}`);
//       return;
//     }

//     console.log(`IP addresses for ${domain}:`);
//     addresses.forEach((address) => {
//       console.log(address);
//     });
//   });
// }

// function checkToResolve(input) {
//   const inputResults = inputIpCheck(input);
//   if (inputResults == false) {
//     resolveDns(input);
//   } else if (inputResults == true) {
//     return input;
//   } else {
//     return null;
//   }
// }

// function checkToResolve(input) {
//   const inputResults = inputIpCheck(input);
//   if (inputResults === false) {
//     resolveDns(input);
//   } else if (inputResults === true) {
//     return input;
//   } else {
//     console.log("Invalid input");
//     return null;
//   }
//   return "Hello";
// }
// const myInput = "svt.se";
// const results = checkToResolve(myInput);

// console.log(results);

// if (result != true) {
//   dns.resolve(clientInput, (error, addresses) => {
//     if (error) {
//       console.log(`An error occurred: ${error.message}`);
//       return;
//     }

//     console.log(`IP addresses for ${clientInput}:`);
//     addresses.forEach((address) => {
//       console.log(address);
//     });
//   });
// }

// if (result === true) {
//   dns.reverse(clientInput, (err, hostnames) => {
//     if (err) {
//       console.error("Reverse DNS lookup failed:", err.message);
//       return;
//     }
//     console.log("Domain(s) for IP:", clientInput);
//     console.log(hostnames);
//   });
// }

module.exports = {
  checkToResolve,
};
