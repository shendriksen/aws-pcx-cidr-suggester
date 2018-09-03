#!/usr/bin/env node

import cli from './cli/cli';
import getAvailableCidrBlock from './cidr-functions/getAvailableCidrBlock';
import getOccupiedCidrBlocks from './cidr-functions/getOccupiedCidrBlocks';

cli({
    version: '0.0.1',
    addHelp: true,
    description: 'DeCidr an available CIDR block for a peering connection.'
})
    .then(args =>
        getOccupiedCidrBlocks(args.routeTableTagName, args.routeTableTagValue)
            .then(occupiedBlocks => getAvailableCidrBlock(args.blockSize, args.rangeStart, args.rangeEnd, occupiedBlocks)))
    .then(console.log)
    .catch(error => console.error(error.message));
