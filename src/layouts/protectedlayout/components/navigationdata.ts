export interface NavLinkType {
    href: string;
    title: string;
    role: string[];
}

export const navLink: NavLinkType[] = [
    {
        href: '/',
        title: 'Dashboard',
        role: ['admin', 'user']
    },
    {
        href: '/products',
        title: 'Products',
        role: ['admin']
    },
    {
        href: '/purchase',
        title: 'Purchase',
        role: ['user']
    },
]