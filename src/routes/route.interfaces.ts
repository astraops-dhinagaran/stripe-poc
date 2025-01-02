import React from "react";

export interface RoutingPathType {
    path: string;
    component: React.FC;
    isProtected?: boolean;
}