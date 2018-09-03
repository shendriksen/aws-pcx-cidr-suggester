import {
    EC2
} from '../helpers/aws';

process.env.AWS_SDK_LOAD_CONFIG = 1;

function getRouteTables(routeTableTagName, routeTableTagValue) {
    const params = {
        Filters: [{
            Name: `tag:${routeTableTagName}`,
            Values: [routeTableTagValue]
        }]
    };

    return EC2()
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

export default function getOccupiedCidrBlocks(routeTableTagName, routeTableTagValue) {
    return getRouteTables(routeTableTagName, routeTableTagValue).then(getRoutes);
}
