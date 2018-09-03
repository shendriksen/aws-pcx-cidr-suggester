import {
    ArgumentParser
} from 'argparse';

export default function cli({cliMeta, getAvailableBlock}) {
    const parser = new ArgumentParser(cliMeta);

    parser.addArgument(['-b', '--blockSize'], {
        help: 'anticipated CIDR block size'
    });
    parser.addArgument(['-s', '--rangeStart'], {
        help: 'range start'
    });
    parser.addArgument(['-e', '--rangeEnd'], {
        help: 'range end'
    });
    parser.addArgument(['-t', '--routeTableTagName'], {
        help: 'route table tag name'
    });
    parser.addArgument(['-z', '--routeTableTagValue'], {
        help: 'route table tag value'
    });

    const args = parser.parseArgs();

    validateArguments(args);

    getAvailableBlock(args.routeTableTagName, args.routeTableTagValue, args.blockSize, args.rangeStart, args.rangeEnd);
}

function validateArguments(args) {
    const errors = [];

    if (args.blockSize == null) errors.push('blockSize');
    if (args.rangeStart == null) errors.push('rangeStart');
    if (args.rangeEnd == null) errors.push('rangeEnd');
    if (args.routeTableTagName == null) errors.push('routeTableTagName');
    if (args.routeTableTagValue == null) errors.push('routeTableTagValue');

    if (errors.length > 0) throw new Error(`Please provide all arguments (${errors})`);
}
