import { type CurveFactory } from 'd3-shape';
export type LinkCoords = {
    x: number;
    y: number;
};
export type PresetLinkType = 'straight' | 'square' | 'beveled' | 'rounded' | 'swoop';
export type LinkType = PresetLinkType | 'd3';
export type LinkSweep = 'horizontal-vertical' | 'vertical-horizontal' | 'none';
type GetLinkPresetPathProps = {
    source: LinkCoords;
    target: LinkCoords;
    radius: number;
    type: PresetLinkType;
    sweep: LinkSweep;
    /** Bend angle in degrees, used by 'swoop' type. Default 22.5. */
    bend?: number;
};
export declare function getLinkPresetPath(opts: GetLinkPresetPathProps): string;
type GetLinkD3PathProps = Omit<GetLinkPresetPathProps, 'radius' | 'type'> & {
    curve: CurveFactory;
    /**
     * Cartesian orientation hint for axis-dependent curves (d3 step variants step
     * along x by default; for 'vertical' we step along y to match the natural flow).
     */
    orientation?: 'horizontal' | 'vertical';
};
export declare function getLinkD3Path({ source, target, sweep, curve, orientation, }: GetLinkD3PathProps): string;
type GetLinkRadialPresetPathProps = {
    source: LinkCoords;
    target: LinkCoords;
    type: PresetLinkType;
    radius: number;
    bend?: number;
};
export declare function getLinkRadialPresetPath({ source, target, type, radius, bend, }: GetLinkRadialPresetPathProps): string;
type GetLinkRadialD3PathProps = {
    source: LinkCoords;
    target: LinkCoords;
    curve?: CurveFactory;
};
export declare function getLinkRadialD3Path({ source, target, curve }: GetLinkRadialD3PathProps): string;
export {};
