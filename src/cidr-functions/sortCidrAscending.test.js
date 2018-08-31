import sortCidrAscending from './sortCidrAscending';

describe('sortCidrAscending', () => {
    it('should return an ascendingly sorted list of cidr addresses', () => {
        const cidrAddresses = ['10.210.0.0/16', '10.200.0.0/16', '0.0.0.0/0'];

        const sortedCidrAddresses = sortCidrAscending(cidrAddresses);

        sortedCidrAddresses.should.deep.equal(['0.0.0.0/0', '10.200.0.0/16', '10.210.0.0/16']);
    });
});
