// @flow
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const changelogPublish = require("../lib/changelogPublish");

const readFileAsync = promisify(fs.readFile);

describe("changelogPublish", () => {
  const testFixture = async name => {
    it(`fixture: ${name}`, async () => {
      const fixturePath = path.join(__dirname, "fixtures", name);
      const fixture = await readFileAsync(fixturePath, "utf-8");

      expect(
        changelogPublish(fixture, "1.2.3", new Date("2019-06-20"))
      ).toMatchSnapshot();
    });
  };

  testFixture("empty.md");
  testFixture("no-title.md");
  testFixture("no-section-unreleased.md");
  testFixture("no-versions.md");
  testFixture("valid.md");
});
