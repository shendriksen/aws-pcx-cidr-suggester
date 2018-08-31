import getAvailableCidrBlock from './getAvailableCidrBlock';
import IpRange from './cidr-functions/IpRange';

describe('getAvailableCidrBlock', () => {
    it('should return an available cidr block when the reserved range is free', () => {
        const newCidrBlockSize = 24;
        const reservedIpRange = new IpRange('10.180.0.0', '10.200.0.0');
        const occupiedCidrBlocks = [
            '10.210.0.0/16',
            '10.180.0.0/16',
            '0.0.0.0/0'
        ];

        const availableCidrBlock = getAvailableCidrBlock(
            newCidrBlockSize,
            reservedIpRange,
            occupiedCidrBlocks
        );

        availableCidrBlock.should.equal('10.181.0.0/24');
    });

    it('should return an error when there are no free CIDR blocks left', () => {
        const newCidrBlockSize = 24;
        const reservedIpRange = new IpRange('10.180.0.0', '10.181.0.0');
        const occupiedCidrBlocks = ['10.180.0.0/16'];
        let expectedError;

        try {
            getAvailableCidrBlock(
                newCidrBlockSize,
                reservedIpRange,
                occupiedCidrBlocks
            );
        } catch (error) {
            expectedError = error;
        }

        expectedError.should.exist;
    });
});
