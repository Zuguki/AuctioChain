type TypeDevice = "mobile" | "desktop";

export const TYPE_DEVICE = ((): TypeDevice => {
    const userAgent: string = navigator.userAgent.toLowerCase();
    const isMobile: boolean =
        /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(
            userAgent,
        );

    return isMobile ? "mobile" : "desktop";
})();
