// @flow
const fs = require("fs");
const changelogPublish = require("./changelogPublish");

const changelogContents = fs.readFileSync("CHANGELOG.md", "utf-8");
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const packageVersion = packageJson.version;

const publishResult = changelogPublish(
  changelogContents,
  packageVersion,
  new Date()
);

if (publishResult.isValid) {
  fs.writeFileSync("CHANGELOG.md", publishResult.changelog, "utf-8");
  console.log(`CHANGELOG.md: moved unreleased to ${packageVersion}`);
} else {
  console.log(`CHANGELOG.md error: ${publishResult.message}`);
}
