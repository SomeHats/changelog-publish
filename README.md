# changelog-publish

A tiny CLI tool for adding a version to unreleased changes in your changelog
when you bump the package version on your Node.js project.

## Usage

This tool assumes you're keeping a changelog with a 2nd-level header called
"Unreleased" for unreleased changes, as per the
[keep a changelog spec](https://keepachangelog.com/en/1.0.0/).

### 1: Install it

Install the tool in your project:

```sh
npm install changelog-publish
```

### 2: Add a `version` script

In your package.json add a `version` entry under `scripts`:

```json
{
  "scripts": {
    "version": "changelog-publish <your github URL> && git add CHANGELOG.md"
  }
}
```

Now, when you run `npm version <patch|minor|major|whatever>`, any changes in the
Unreleased section will be moved into a section for your new package version.

The `git add` part is to make sure the changes to your changelog get included in
the same commit as your version-bump.

That's it! That's all this tool does! Ta-da!
