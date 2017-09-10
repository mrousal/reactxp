/**
* Container.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the cross-platform Container abstraction.
*/
import React = require('react');
import Types = require('../common/Types');
export interface ContainerContext {
    isRxParentAText?: boolean;
}
export declare class Container extends React.Component<Types.ContainerProps, {}> {
    static contextTypes: React.ValidationMap<any>;
    context: ContainerContext;
    static childContextTypes: React.ValidationMap<any>;
    constructor(props: Types.ContainerProps, context: ContainerContext);
    getChildContext(): ContainerContext;
    render(): React.ReactElement<any>;
}
export default Container;
