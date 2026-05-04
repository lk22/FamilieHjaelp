import React from "react";

import Meta from "@/components/WebLayout/Meta";
import Header from "@/components/WebLayout/Header";
import Footer from "@/components/WebLayout/Footer";

interface WebLayoutProps {
    pageTitle: string;
    children: React.ReactNode[] | React.ReactNode;
}

export default function WebLayout({ pageTitle, children }: WebLayoutProps) {
    return (
        <>
            <Meta title={pageTitle} />
            <Header />
            {children}
            <Footer />
        </>
    );
}