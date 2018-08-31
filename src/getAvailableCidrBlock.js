/* eslint-disable */
import isCidrInRange from './cidr-functions/isCidrInRange';

export default function getAvailableCidrBlock(newCidrBlockSize, reservedIpRange, occupiedCidrBlocks) {

    const availableAddress = reservedIpRange.startAddress;

    // Sort the list.

    occupiedCidrBlocks.forEach(block => {
        //check if block is within range. isCidrInRange();
        //if true then see if it clashes with our available address. (cidr-overlap)
        //if true then move our available address to the end of the current block.
        //if our new available range is within the reserved range then continue
        //if the new available range is not then throw an error that there is no space.
    });

}
