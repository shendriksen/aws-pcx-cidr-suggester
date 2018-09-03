#!/usr/bin/env node

import cli from './cli/cli';
import getAvilableCidrBlock from './cidr-functions/getAvailableCidrBlock';
import IpRange from './cidr-functions/IpRange';
import getOccupiedCidrBlocks from './cidr-functions/getOccupiedCidrBlocks';

cli({
    cliMeta: {
        version: '0.0.1',
        addHelp: true,
        description: 'DeCidr an available CIDR block for a peering connection.'
    },
    getAvailableBlock: (tagName, tagValue, blockSize, rangeStart, rangeEnd) => {
        getOccupiedCidrBlocks({
            tagName,
            tagValue
        })
            .then(blocks => getAvilableCidrBlock(blockSize, new IpRange(rangeStart, rangeEnd), blocks))
            .then(console.log);
    }
});
