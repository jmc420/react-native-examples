import IRoute from "./IRoute";

export default class RouteMapFactory {

    public static createRouteMap(): { [id: string]: IRoute } {
        return {
            'Home': {
                title: 'Home',
                id: 'Home',
                props: {
                    navigation: {
                        state: {
                            params: {
                                back: false,
                                title: 'Home'
                            }
                        }
                    }
                }
            },
            'View1': {
                title: 'View1',
                id: 'View1',
                props: {
                    navigation: {
                        state: {
                            params: {
                                back: false,
                                title: 'View1'
                            }
                        }
                    }
                }
            },
            'View2': {
                title: 'View2',
                id: 'View2',
                props: {
                    navigation: {
                        state: {
                            params: {
                                back: false,
                                title: 'View2'
                            }
                        }
                    }
                }
            },
            'Settings': {
                title: 'Settings',
                id: 'Settings',
                props: {
                    navigation: {
                        state: {
                            params: {
                                back: true,
                                title: 'Settings'
                            }
                        }
                    }
                }
            }
        }
    }

}