type TypeDevice = "mobile" | "desktop";

const getDeviceType = (): TypeDevice => {
    const userAgent: string = navigator.userAgent.toLowerCase();
    const isMobile: boolean =
        /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(
            userAgent,
        );

    return isMobile ? "mobile" : "desktop";
};

export const TYPE_DEVICE = getDeviceType();
