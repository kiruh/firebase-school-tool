const { ncp } = require("ncp");

ncp("build", "../functions/web-build", err => {
  if (err) console.error(err);
});
