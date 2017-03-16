
import IRoute from './IRoute';

export default class RouteMap {
    private routeMap:{[id:string]:IRoute} = {};

    constructor() {
        this.routeMap = {
            'Home': {
                title: 'Home',
                id: 'Home'
            },
            'View1': {
                title: 'View1',
                id: 'View1'
            },
            'View2': {
                title: 'View2',
                id: 'View2'
            }
        }
    }

    public getRouteMap():{[id:string]:IRoute} {
        return this.routeMap;
    }

    public getMenuItems():string[] {
        var result:string[] = [];

        for (var key in this.routeMap) {
            var route:IRoute = this.routeMap[key];

            result.push(route.id);
        }
        return result;
    }
}