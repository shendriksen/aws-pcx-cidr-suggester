/* eslint-disable */
import cidrOverlap from 'cidr-overlap';
import isCidrInRange from './cidr-functions/isCidrInRange';
import sortCidrAscending from './cidr-functions/sortCidrAscending';
import getNextAddress from './cidr-functions/getNextAddress';
import getEndAddress from './cidr-functions/getEndAddress';

export default function getAvailableCidrBlock(
    newCidrBlockSize,
    reservedIpRange,
    occupiedCidrBlocks
) {
    let newCidrStartAddress = reservedIpRange.startAddress;
    const sortedOccupiedCidrBlocks = sortCidrAscending(occupiedCidrBlocks);

    sortedOccupiedCidrBlocks.forEach(block => {
        const isInRange = isCidrInRange(reservedIpRange, block);

        if (isInRange) {
            const overlaps =
                cidrOverlap([block, newCidrStartAddress]).length > 0;

            if (overlaps) newCidrStartAddress = getNextAddress(block);

            if (
                !isCidrInRange(
                    reservedIpRange,
                    getEndAddress(`${newCidrStartAddress}/${newCidrBlockSize}`)
                )
            )
                throw new Error('No availability in the range provided');
        }
    });
    return `${newCidrStartAddress}/${newCidrBlockSize}`;
}
