// @flow
const remark = require("remark");
const mdastToString = require("mdast-util-to-string");

const formatDate = date =>
  [
    date
      .getFullYear()
      .toString(10)
      .padStart(4, "0"),
    (date.getMonth() + 1).toString(10).padStart(2, "0"),
    date
      .getDate()
      .toString(10)
      .padStart(2, "0")
  ].join("-");

function changelogPublish(
  changelogMarkdown /*: string */,
  version /*: string */,
  date /*: Date */
) /*:
  | {| isValid: true, changelog: string |}
  | {| isValid: false, message: string |} */ {
  const ast = remark.parse(changelogMarkdown);

  const unreleasedHeading = ast.children.find(
    child => child.type === "heading" && child.depth === 2
  );
  if (!unreleasedHeading || mdastToString(unreleasedHeading) !== "Unreleased") {
    return {
      isValid: false,
      message: "Changelog must have an 'Unreleased' section"
    };
  }

  // change the current unreleased heading to match the new version
  unreleasedHeading.children = [
    {
      type: "linkReference",
      identifier: version,
      label: version,
      referenceType: "shortcut",
      children: [
        {
          type: "text",
          value: version
        }
      ]
    },
    {
      type: "text",
      value: ` - ${formatDate(date)}`
    }
  ];

  ast.children.splice(ast.children.indexOf(unreleasedHeading), 0, {
    type: "heading",
    depth: 2,
    children: [
      {
        type: "linkReference",
        identifier: "unreleased",
        label: "Unreleased",
        referenceType: "shortcut",
        children: [
          {
            type: "text",
            value: "Unreleased"
          }
        ]
      }
    ]
  });

  return { isValid: true, changelog: remark.stringify(ast) };
}

module.exports = changelogPublish;
