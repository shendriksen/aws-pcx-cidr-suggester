import AWS from 'aws-sdk';

process.env.AWS_SDK_LOAD_CONFIG = 1;
const ec2 = new AWS.EC2();

function getRouteTables(options) {
  const params = {
    Filters: [
      {
        Name: `tag:${options.tagName}`,
        Values: [options.tagValue]
      }
    ]
  };

  return ec2
    .describeRouteTables(params)
    .promise()
    .then(result => result.RouteTables);
}

function getRoutes(routeTables) {
  const uniqueRoutes = new Set();

  routeTables.forEach(routeTable => {
    routeTable.Routes.forEach(route => {
      uniqueRoutes.add(route.DestinationCidrBlock);
    });
  });

  return Array.from(uniqueRoutes);
}

export default function getOccupiedCidrBlocks(options) {
  return getRouteTables(options).then(getRoutes);
}
