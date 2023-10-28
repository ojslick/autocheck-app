export interface CarMake {
    id: number;
    name: string;
    imageUrl: string;
}

export interface Car {
    bodyTypeId: string;
    ccMeasurement: number;
    city: string;
    depositReceived: boolean;
    fuelType: string;
    gradeScore: number;
    hasFinancing: boolean;
    hasThreeDImage: boolean;
    hasWarranty: boolean;
    id: string;
    imageUrl: string;
    installment: number;
    loanValue: number;
    marketplaceOldPrice: number;
    marketplacePrice: number;
    marketplaceVisibleDate: string;
    mileage: number;
    mileageUnit: string;
    sellingCondition: string;
    sold: boolean;
    state: string;
    stats: {
        webViewCount: number;
        webViewerCount: number;
        interestCount: number;
        testDriveCount: number;
        appViewCount: number;
    };
    title: string;
    transmission: string;
    websiteUrl: string;
    year: number;
}

export interface CarDetail {
    bodyType: {
        id: number;
        name: string;
        imageUrl: string;
    };
    year: number;
    carFeatures: any[];
    carName: string;
    ccMeasurement: number;
    city: string;
    country: string;
    createdAt: string;
    damageMedia: any[];
    depositReceived: boolean;
    engineType: string;
    exteriorColor: string;
    features: any[];
    financingSettings: {
        loanCalculator: any;
    };
    fuelType: string;
    gradeScore: number;
    hasFinancing: boolean;
    hasThreeDImage: boolean;
    hasWarranty: boolean;
    id: string;
    imageUrl: string;
    inspectorDetails: {
        inspectedMakes: any[];
        inspectorFullName: string;
        totalInspection: number;
        profileImageUrl: string;
    };
    installment: number;
    insured: boolean;
    interiorColor: string;
    isFeatured: boolean;
    loanValue: number;
    marketplaceOldPrice: number;
    marketplacePrice: number;
    marketplaceVisible: boolean;
    marketplaceVisibleDate: string;
    mileage: number;
    mileageUnit: string;
    model: {
        modelFeatures: any[];
        id: number;
        name: string;
        imageUrl: string;
        wheelType: string;
    };
    modelFeatures: any[];
    ownerType: string;
    sellingCondition: string;
    sold: boolean;
    state: string;
    transmission: string;
    updatedAt: string;
    vin: string;
    websiteUrl: string;
}
