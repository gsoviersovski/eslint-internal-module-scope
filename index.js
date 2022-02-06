module.exports = {
    rules: {
        "internal-modules-scope": {
            create: function (context) {
                return {
                    ImportDeclaration(node) {
                        const {value} = node.source;
                        const report = {
                            node,
                            message: "Import statement is attempting to reach an internal node",
                        };
                        const internalWordCount = getInternalWordCountInString(value);
                        if (internalWordCount > 1) {
                            context.report(report);
                        } else if (internalWordCount) {
                            const prefix = getPrefixFromInternalWordInString(value);
                            if (prefix !== './') {
                                context.report(report);
                            }
                        }
                    }
                }
            }
        }
    }
};

function getInternalWordCountInString(value) {
    return (value.match(/internal/g) ?? []).length;
}

function getPrefixFromInternalWordInString(value) {
    return value.split('internal')[0];
}