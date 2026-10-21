export declare const componentTestId = "test-lc-component";
export declare const chartTestId = "test-lc-chart";
import type { Component as ComponentType } from 'svelte';
import type { ChartState } from '../../states/chart.svelte.js';
type ChildComponent = {
    component: ComponentType;
    props?: Record<string, any> | ((snippetProps: any) => Record<string, any>);
};
type $$ComponentProps = {
    useChart?: boolean;
    chartProps?: Record<string, any>;
    layer?: 'svg' | 'html' | 'canvas';
    layerProps?: Record<string, any>;
    component: ComponentType;
    componentProps?: Record<string, any>;
    childComponents?: ChildComponent[];
    oncontext?: (ctx: ChartState<any, any, any>) => void;
};
declare const TestHarness: ComponentType<$$ComponentProps, {}, "">;
type TestHarness = ReturnType<typeof TestHarness>;
export default TestHarness;
