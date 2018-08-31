import isCidrInRange from './cidr-functions/isCidrInRange';
import sortCidrAscending from './cidr-functions/sortCidrAscending';
import getNextAddress from './cidr-functions/getNextAddress';
import getEndAddress from './cidr-functions/getEndAddress';
import cidrsAreOverlapping from './cidr-functions/cidrsAreOverlapping';

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
            if (cidrsAreOverlapping([block, newCidrStartAddress]))
                newCidrStartAddress = getNextAddress(block);

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
