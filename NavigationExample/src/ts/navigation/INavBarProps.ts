interface INavigationParameters {
    back:boolean;
    title:string;
}

interface INavigationParams {
   params:INavigationParameters;
}

interface INavigationState {
    state:INavigationParams;
}

export interface INavBarProps {
    navigation:INavigationState;
}

export default INavBarProps;