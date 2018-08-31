#!/usr/bin/env node
import { ArgumentParser } from 'argparse';
import getAvilableCidrBlock from './cidr-functions/getAvailableCidrBlock';
import IpRange from './cidr-functions/IpRange';
import getOccupiedCidrBlocks from './cidr-functions/getOccupiedCidrBlocks';

var parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'Argparse example'
});
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

var args = parser.parseArgs();
console.dir(args);

// argValidator(args);

getOccupiedCidrBlocks({
    tagName: args.routeTableTagName,
    tagValue: args.routeTableTagValue
})
    .then(blocks =>
        getAvilableCidrBlock(
            args.blockSize,
            new IpRange(args.rangeStart, args.rangeEnd),
            blocks
        )
    )
    .then(console.log);
