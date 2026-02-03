export type BespokeStep = 1 | 2 | 3 | 4;

export interface VehicleData {
    make: string;
    model: string;
    year: string;
    fitment?: "VERIFIERAD" | "OKÄND";
}

export interface BespokeConfig {
    architecture: string | null;
    finish: string | null;
    size: string | null;
    contact: {
        name: string;
        email: string;
        phone: string;
    };
}

export interface BespokeState {
    step: BespokeStep;
    regNumber: string;
    vehicle: VehicleData | null;
    config: BespokeConfig;
}
