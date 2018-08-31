import sortCidrAscending from './sortCidrAscending';

describe('sortCidrAscending', () => {
    it.only('should return an ascendingly sorted list of cidr addresses', () => {
        const cidrAddresses = ['10.210.0.0/16', '10.200.0.0/16', '0.0.0.0/0'];

        const sortedCidrAddresses = sortCidrAscending(cidrAddresses);

        console.log(sortedCidrAddresses);
        //loop through aserting the sorting worked
        sortedCidrAddresses.should.deep.equal(['0.0.0.0/0', '10.200.0.0/16', '10.210.0.0/16']);
    });
});
