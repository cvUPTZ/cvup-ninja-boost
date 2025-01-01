// src/components/Layout.tsx
import React from 'react';

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({title, children}) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-cvup-purple mb-8">
                {title}
            </h1>
            {children}
        </div>
    );
};

export default Layout;