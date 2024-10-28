"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat  = () => {
    useEffect(() => {
        Crisp.configure("6bf9a55d-3855-4d86-938c-136e5174ca96");
    }, []);

    return null;
}

export default CrispChat;