import React from "react";

const getResponsiveItemCount = () => {
    const width = window.innerWidth;
    if (width < 768) {
        return 4;
    } else if (width >= 768 && width < 1024) {
        return 8;
    } else if (width >= 1024 && width < 1440) {
        return 10;
    } else {
        return 12;
    }
};

export { getResponsiveItemCount };
