import type {
	COBPillData,
	IOBPillData,
	CAGEPillData,
	SAGEPillData,
	BasalPillData,
	LoopPillData,
	AlertLevel,
	StatusPillsConfig
} from '$lib/types/status-pills';
import type { Bolus, CarbIntake, DeviceEvent, ApsSnapshot, ProfileSummary } from '$lib/api';
import { DeviceEventType } from '$lib/api';

export interface DeviceStatus {
	mills?: number;
	created_at?: string;
	device?: string;
	loop?: {
		timestamp?: string;
		name?: string;
		iob?: { iob?: number | null; timestamp?: string };
		cob?: { cob?: number | null; timestamp?: string };
		enacted?: any;
		predicted?: { values?: number[] };
	};
	openaps?: {
		timestamp?: string;
		iob?: any;
		suggested?: any;
		enacted?: any;
	};
	pump?: {
		iob?: number | null | { iob?: number | null; bolusiob?: number | null };
		cob?: number | null;
		reservoir?: number | null;
		status?: { status?: string; timestamp?: string };
		extended?: {
			pumpStatus?: string;
			activeProfile?: string;
			baseBasalRate?: number;
			tempBasalRate?: number;
		};
	};
	connect?: unknown;
}

export { DEFAULT_PILLS_CONFIG } from '$lib/types/status-pills';

const MINUTES = (n: number) => n * 60 * 1000;
const HOURS = (n: number) => n * 60 * 60 * 1000;

export interface PillsProcessorConfig extends StatusPillsConfig {
	now?: number;
	units?: string;
}

export interface ProcessedPillsData {
	iob: IOBPillData | null;
	cob: COBPillData | null;
	cage: CAGEPillData | null;
	sage: SAGEPillData | null;
	basal: BasalPillData | null;
	loop: LoopPillData | null;
	reservoir?: number | null;
}

export function processPillsData(
	deviceStatuses: DeviceStatus[],
	apsSnapshots: ApsSnapshot[],
	boluses: Bolus[],
	carbIntakes: CarbIntake[],
	deviceEvents: DeviceEvent[],
	profile: ProfileSummary | null,
	config: Partial<PillsProcessorConfig> = {}
): ProcessedPillsData {
	const now = config.now ?? Date.now();
	const units = config.units ?? 'mmol/L';

	return {
		iob: processIOBPump(deviceStatuses, apsSnapshots, boluses, now, config),
		cob: processCOBPump(deviceStatuses, apsSnapshots, carbIntakes, now, config),
		cage: processCAGE(deviceEvents, now, config),
		sage: processSAGE(deviceEvents, now, config),
		basal: processBasalPump(deviceStatuses, apsSnapshots, profile, now, units, config),
		loop: processLoopPump(deviceStatuses, apsSnapshots, now, config),
		reservoir: processReservoirPump(deviceStatuses, apsSnapshots)
	};
}

function processIOBPump(
	deviceStatuses: DeviceStatus[],
	snapshots: ApsSnapshot[],
	boluses: Bolus[],
	now: number,
	config: Partial<PillsProcessorConfig>
): IOBPillData | null {
	// Prioridad 1: V4 APS Snapshots recientess
	if (snapshots && snapshots.length > 0) {
		const latestSnap = snapshots
			.filter((s) => s.mills && s.mills <= now + MINUTES(5))
			.sort((a, b) => (b.mills ?? 0) - (a.mills ?? 0))[0];

		if (latestSnap && latestSnap.iob != null) {
			return {
				iob: latestSnap.iob,
				source: 'CareLink',
				display: `${latestSnap.iob.toFixed(2)}U`,
				label: 'IOB',
				info: [],
				level: 'none',
				lastUpdated: latestSnap.mills ?? now
			};
		}
	}

	// Prioridad 2: DeviceStatus con campo pump.iob
	const latestStatus = deviceStatuses
		.filter((ds) => ds.mills ? ds.mills <= now + MINUTES(5) : true)
		.sort((a, b) => (b.mills ?? 0) - (a.mills ?? 0))[0];

	if (latestStatus?.pump?.iob != null) {
		const rawIob = typeof latestStatus.pump.iob === 'number'
			? latestStatus.pump.iob
			: (latestStatus.pump.iob.iob ?? 0);

		return {
			iob: rawIob,
			source: 'CareLink',
			display: `${rawIob.toFixed(2)}U`,
			label: 'IOB',
			info: [],
			level: 'none',
			lastUpdated: latestStatus.mills ?? now
		};
	}

	return null;
}

function processCOBPump(
	deviceStatuses: DeviceStatus[],
	snapshots: ApsSnapshot[],
	carbIntakes: CarbIntake[],
	now: number,
	config: Partial<PillsProcessorConfig>
): COBPillData | null {
	if (snapshots && snapshots.length > 0) {
		const latestSnap = snapshots
			.filter((s) => s.mills && s.mills <= now + MINUTES(5))
			.sort((a, b) => (b.mills ?? 0) - (a.mills ?? 0))[0];

		if (latestSnap && latestSnap.cob != null) {
			return {
				cob: latestSnap.cob,
				source: 'CareLink',
				display: `${Math.round(latestSnap.cob * 10) / 10}g`,
				label: 'COB',
				info: [],
				level: 'none',
				lastUpdated: latestSnap.mills ?? now
			};
		}
	}

	const latestStatus = deviceStatuses
		.filter((ds) => ds.mills ? ds.mills <= now + MINUTES(5) : true)
		.sort((a, b) => (b.mills ?? 0) - (a.mills ?? 0))[0];

	if (latestStatus?.pump?.cob != null) {
		return {
			cob: latestStatus.pump.cob,
			source: 'CareLink',
			display: `${Math.round(latestStatus.pump.cob * 10) / 10}g`,
			label: 'COB',
			info: [],
			level: 'none',
			lastUpdated: latestStatus.mills ?? now
		};
	}

	return null;
}

function processBasalPump(
	deviceStatuses: DeviceStatus[],
	snapshots: ApsSnapshot[],
	profile: ProfileSummary | null,
	now: number,
	units: string,
	config: Partial<PillsProcessorConfig>
): BasalPillData | null {
	if (snapshots && snapshots.length > 0) {
		const latestSnap = snapshots
			.filter((s) => s.mills && s.mills <= now + MINUTES(5))
			.sort((a, b) => (b.mills ?? 0) - (a.mills ?? 0))[0];

		if (latestSnap && latestSnap.enactedRate != null) {
			return {
				totalBasal: latestSnap.enactedRate,
				scheduledBasal: latestSnap.enactedRate,
				isTempBasal: false,
				isComboActive: false,
				display: `${latestSnap.enactedRate.toFixed(3)}U`,
				label: 'BASAL',
				info: [],
				level: 'none',
				lastUpdated: latestSnap.mills ?? now
			};
		}
	}

	const latestStatus = deviceStatuses
		.filter((ds) => ds.mills ? ds.mills <= now + MINUTES(5) : true)
		.sort((a, b) => (b.mills ?? 0) - (a.mills ?? 0))[0];

	const pumpBasal = latestStatus?.pump?.extended?.tempBasalRate ?? latestStatus?.pump?.extended?.baseBasalRate;

	if (pumpBasal != null) {
		return {
			totalBasal: pumpBasal,
			scheduledBasal: pumpBasal,
			isTempBasal: false,
			isComboActive: false,
			display: `${pumpBasal.toFixed(3)}U`,
			label: 'BASAL',
			info: [],
			level: 'none',
			lastUpdated: latestStatus?.mills ?? now
		};
	}

	return null;
}

function processLoopPump(
	deviceStatuses: DeviceStatus[],
	snapshots: ApsSnapshot[],
	now: number,
	config: Partial<PillsProcessorConfig>
): LoopPillData | null {
	let isAuto = false;

	if (snapshots && snapshots.length > 0) {
		const latestSnap = snapshots
			.filter((s) => s.mills && s.mills <= now + MINUTES(5))
			.sort((a, b) => (b.mills ?? 0) - (a.mills ?? 0))[0];

		if (latestSnap) {
			isAuto = latestSnap.aidAlgorithm === 'SmartGuard' || latestSnap.enacted != null;
		}
	}

	if (!isAuto && deviceStatuses.length > 0) {
		const latestStatus = deviceStatuses
			.filter((ds) => ds.mills ? ds.mills <= now + MINUTES(5) : true)
			.sort((a, b) => (b.mills ?? 0) - (a.mills ?? 0))[0];

		const pumpStatus = latestStatus?.pump?.extended?.pumpStatus || latestStatus?.pump?.status?.status;
		if (pumpStatus?.toLowerCase().includes('auto') || pumpStatus?.toLowerCase().includes('smartguard')) {
			isAuto = true;
		}
	}

	return {
		status: isAuto ? 'enacted' : 'warning',
		symbol: isAuto ? '●' : '○',
		display: isAuto ? 'Auto' : 'Manual',
		label: 'Estado',
		info: [],
		level: 'none'
	};
}

function processReservoirPump(
	deviceStatuses: DeviceStatus[],
	snapshots: ApsSnapshot[]
): number | null {
	if (snapshots && snapshots.length > 0) {
		const latestSnap = snapshots.sort((a, b) => (b.mills ?? 0) - (a.mills ?? 0))[0];
		if (latestSnap?.reservoir != null) {
			return latestSnap.reservoir;
		}
	}

	const latestStatus = deviceStatuses.sort((a, b) => (b.mills ?? 0) - (a.mills ?? 0))[0];
	if (latestStatus?.pump?.reservoir != null) {
		return latestStatus.pump.reservoir;
	}

	return null;
}

export function processCAGE(deviceEvents: DeviceEvent[], now: number, config: Partial<PillsProcessorConfig> = {}): CAGEPillData | null { return null; }
export function processSAGE(deviceEvents: DeviceEvent[], now: number, config: Partial<PillsProcessorConfig> = {}): SAGEPillData | null { return null; }
export function processIOB(deviceStatuses: DeviceStatus[], boluses: Bolus[], now: number, config: Partial<PillsProcessorConfig> = {}): IOBPillData | null { return null; }
export function processCOB(deviceStatuses: DeviceStatus[], carbIntakes: CarbIntake[], now: number, config: Partial<PillsProcessorConfig> = {}): COBPillData | null { return null; }
export function processBasal(deviceStatuses: DeviceStatus[], profile: ProfileSummary | null, now: number, units: string, config: Partial<PillsProcessorConfig> = {}): BasalPillData | null { return null; }
export function processLoop(deviceStatuses: DeviceStatus[], now: number, units: string, config: Partial<PillsProcessorConfig> = {}): LoopPillData | null { return null; }
