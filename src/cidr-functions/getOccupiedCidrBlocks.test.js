import sinon from 'sinon';
import * as aws from '../helpers/aws'
import getOccupiedCidrBlocks from './getOccupiedCidrBlocks';

describe('getOccupiedCidrBlocks', () => {

    let sandbox;

    beforeEach(() => sandbox = sinon.sandbox.create());

    afterEach(() => sandbox.restore());

    it('should return the occupied cidr blocks', async () => {
        // Setup.
        const routeTableTagName = 'Name';
        const routeTableTagValue = 'nu-cps-platform-tnl-uat-private*-rtb';
        const expectedBlocks = ['0.0.0.0/0', '10.180.0.0/16', '10.180.1.0/16'];

        const mockData = {
            RouteTables: [{
                Routes: [{
                    DestinationCidrBlock: '0.0.0.0/0'
                }, {
                    DestinationCidrBlock: '10.180.0.0/16'
                }]
            },
            {
                Routes: [{
                    DestinationCidrBlock: '10.180.1.0/16'
                }]
            }
            ]
        }

        sandbox.stub(aws, 'EC2').returns({
            describeRouteTables: () => ({
                promise: () => Promise.resolve(mockData)
            })
        });

        // Exercise.
        const occupiedBlocks = await getOccupiedCidrBlocks(routeTableTagName, routeTableTagValue);

        // Verify.
        occupiedBlocks.should.deep.equal(expectedBlocks);
    });

    it('should return an error when there are network issues', async () => {
        // Setup.
        const routeTableTagName = 'Name';
        const routeTableTagValue = 'nu-cps-platform-tnl-uat-private*-rtb';

        sandbox.stub(aws, 'EC2').returns({
            describeRouteTables: () => ({
                promise: () => Promise.rejects()
            })
        });

        // Exercise.
        let expectedError;
        try {
            await getOccupiedCidrBlocks(routeTableTagName, routeTableTagValue);
        } catch (error) {
            expectedError = error;
        }

        // Verify.
        expectedError.should.exist;
    });

});
