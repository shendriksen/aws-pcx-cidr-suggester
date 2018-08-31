/* eslint-disable */
import cidrOverlap from 'cidr-overlap';
import isCidrInRange from './cidr-functions/isCidrInRange';
import sortCidrAscending from './cidr-functions/sortCidrAscending';
import {cidr} from 'node-cidr';

export default function getAvailableCidrBlock(newCidrBlockSize, reservedIpRange, occupiedCidrBlocks) {

    let newCidrStartAddress = reservedIpRange.startAddress;
    const sortedOccupiedCidrBlocks = sortCidrAscending(occupiedCidrBlocks);

    sortedOccupiedCidrBlocks.forEach(block => {
        const isInRange = isCidrInRange(reservedIpRange, block);

        if (isInRange) {
            const overlaps = cidrOverlap([block, newCidrStartAddress]).length > 0;

            if(overlaps) newCidrStartAddress = cidr.next(block).split('/')[0];

            if(!isCidrInRange(reservedIpRange, newCidrStartAddress)) throw new Error('No availability in the range provided');
        }
    });

    return `${newCidrStartAddress}/${newCidrBlockSize}`;
}