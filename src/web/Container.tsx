/**
* Container.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the cross-platform Container abstraction.
*/

import React = require('react');
import ReactDOM = require('react-dom');
import PropTypes = require('prop-types');

import AccessibilityUtil from './AccessibilityUtil';
import AnimateListEdits from './listAnimations/AnimateListEdits';
import restyleForInlineText = require('./utils/restyleForInlineText');
import Styles from './Styles';
import Types = require('../common/Types');
import ViewBase from './ViewBase';
import { FocusManager, applyFocusableComponentMixin } from './utils/FocusManager';

const _styles = {
    defaultStyle: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 0,
        flexShrink: 0,
        overflow: 'hidden',
        alignItems: 'stretch'
    }
};

export interface ContainerContext {
    isRxParentAText?: boolean;
}

export class Container extends React.Component<Types.ContainerProps, {}> {
    static contextTypes: React.ValidationMap<any> = {
        isRxParentAText: PropTypes.bool
    };
    context: ContainerContext;

    static childContextTypes: React.ValidationMap<any> = {
        isRxParentAText: PropTypes.bool.isRequired
    };

    constructor(props: Types.ContainerProps, context: ContainerContext) {
        super(props, context);
    }

    getChildContext() {
        // Let descendant Types components know that their nearest Types ancestor is not an Types.Text.
        // Because they're in an Types.View, they should use their normal styling rather than their
        // special styling for appearing inline with text.
        let childContext: ContainerContext = {
            isRxParentAText: false
        };

        return childContext;
    }

    render() {
        let combinedStyles = Styles.combine([_styles.defaultStyle, this.props.style]) as any;

        let props: Types.AccessibilityHtmlAttributes = {
            style: combinedStyles
        };

        let reactElement = (
            <div { ...props } >
                { this.props.children }
            </div>
        );

        return this.context.isRxParentAText ?
            restyleForInlineText(reactElement) :
            reactElement;
    }
}

export default Container;
