import util from 'util';

const exec = util.promisify(require('child_process').exec);

describe('index e2e tests', () => {

    it('should generate a free CIDR block', async () => {
        const command = 'node ./lib/index.js -b 24 -s 10.180.0.0 -e 10.200.0.0 -t FAKE-TAG-NAME -z FAKE-TAG-VALUE';

        const { stdout } = await exec(command);

        stdout.should.equal('10.180.0.0/24\n');
    });

    it('should return an error when provided incorrect details', async () => {
        const command = 'node ./lib/index.js ';

        const { stderr } = await exec(command);

        stderr.should.equal('Please provide all arguments (blockSize,rangeStart,rangeEnd,routeTableTagName,routeTableTagValue)\n');
    });
});
