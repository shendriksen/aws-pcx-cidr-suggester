import getOccupiedCidrBlocks from './getOccupiedCidrBlocks';

describe('getOccupiedCidrBlocks', () => {
  xit('should return occupied cidr blocks', () => {
    return getOccupiedCidrBlocks({
      tagName: 'Name',
      tagValue: 'nu-cps-platform-tnl-dev-private*-rtb'
    })
      .then(routes => routes.should.not.be.empty)
      .catch(error => error.should.not.exist);
  });
});
